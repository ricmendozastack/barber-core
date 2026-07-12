import axios, { AxiosError } from 'axios';

import { ENV } from '@config/env';
import { eventBus } from '@lib/eventBus';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@storage/secure';

import { normalizeApiError } from './errors/ApiError';

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15_000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (typeof error)['config'] & { _retry?: boolean };

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        refreshPromise ??= refreshAccessToken();
        const newToken = await refreshPromise;
        refreshPromise = null;
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      } catch (refreshError) {
        await clearTokens();
        eventBus.emit('session:expired', undefined);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(normalizeApiError(error));
  },
);

async function refreshAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken();
  const { data } = await axios.post(`${ENV.API_URL}/auth/refresh`, { refreshToken });
  await setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

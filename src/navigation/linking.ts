import type { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from './types';

export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ['barbercore://', 'https://barbercore.app'],
  config: {
    screens: {
      App: {
        screens: {
          Appointments: 'appointments/:id?',
        },
      },
      Auth: { screens: { Login: 'login' } },
    },
  },
};

import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@api/queryClient';
import { eventBus } from '@lib/eventBus';
import { RootNavigator } from '@navigation/RootNavigator';
import { useSessionStore } from '@store/useSessionStore';
import { ThemeProvider } from '@theme/ThemeProvider';

import '../theme/global.css';

export default function App() {
  useEffect(() => {
    return eventBus.on('session:expired', () => {
      useSessionStore.getState().logout();
      queryClient.clear();
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <RootNavigator />
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Placeholder } from './Placeholder';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">{() => <Placeholder label="Login" />}</Stack.Screen>
      <Stack.Screen name="Register">{() => <Placeholder label="Register" />}</Stack.Screen>
      <Stack.Screen name="ForgotPassword">
        {() => <Placeholder label="Forgot Password" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

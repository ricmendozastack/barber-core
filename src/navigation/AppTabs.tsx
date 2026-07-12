import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Placeholder } from './Placeholder';
import type { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home">{() => <Placeholder label="Home" />}</Tab.Screen>
      <Tab.Screen name="Explore">{() => <Placeholder label="Explore" />}</Tab.Screen>
      <Tab.Screen name="Appointments">{() => <Placeholder label="Appointments" />}</Tab.Screen>
      <Tab.Screen name="Profile">{() => <Placeholder label="Profile" />}</Tab.Screen>
    </Tab.Navigator>
  );
}

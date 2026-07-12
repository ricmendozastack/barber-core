import { Text, View } from 'react-native';

export function Placeholder({ label }: { label: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <Text className="text-text">{label}</Text>
    </View>
  );
}

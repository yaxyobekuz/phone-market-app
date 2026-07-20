import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ActivityIndicator color="#2563eb" size="large" />
    </View>
  );
}

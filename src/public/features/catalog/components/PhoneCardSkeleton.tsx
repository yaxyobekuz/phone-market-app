import { View } from "react-native";

import { cardShadow } from "@/shared/lib/shadows";

export default function PhoneCardSkeleton() {
  return (
    <View
      style={cardShadow}
      className="flex-1 overflow-hidden rounded-2xl border border-border bg-white"
    >
      <View className="aspect-square bg-muted" />
      <View className="gap-2 p-2.5">
        <View className="h-3 w-4/5 rounded bg-muted" />
        <View className="h-4 w-1/2 rounded bg-muted" />
        <View className="h-3 w-2/3 rounded bg-muted" />
      </View>
    </View>
  );
}

export function PhoneGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <View className="flex-row flex-wrap justify-between gap-y-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} className="w-[48%]">
          <PhoneCardSkeleton />
        </View>
      ))}
    </View>
  );
}

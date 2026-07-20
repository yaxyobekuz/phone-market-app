import { type ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function EmptyState({ title, subtitle, icon }: Props) {
  return (
    <View className="items-center justify-center gap-2 py-16">
      {icon}
      <Text className="text-base font-semibold text-foreground">{title}</Text>
      {subtitle ? (
        <Text className="text-center text-sm text-muted-foreground">{subtitle}</Text>
      ) : null}
    </View>
  );
}

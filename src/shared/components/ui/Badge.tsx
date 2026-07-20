import { Text, View } from "react-native";

import { cn } from "@/shared/utils/cn";

interface Props {
  label: string;
  className?: string;
  textClassName?: string;
}

export default function Badge({ label, className, textClassName }: Props) {
  return (
    <View className={cn("self-start rounded-full bg-muted px-2.5 py-1", className)}>
      <Text className={cn("text-xs font-semibold text-muted-foreground", textClassName)}>
        {label}
      </Text>
    </View>
  );
}

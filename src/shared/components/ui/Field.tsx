import { type ReactNode } from "react";
import { Text, View } from "react-native";

import { cn } from "@/shared/utils/cn";

interface Props {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function Field({ label, error, children, className }: Props) {
  return (
    <View className={cn("gap-1.5", className)}>
      {label ? <Text className="text-sm font-medium text-foreground">{label}</Text> : null}
      {children}
      {error ? <Text className="text-xs text-destructive">{error}</Text> : null}
    </View>
  );
}

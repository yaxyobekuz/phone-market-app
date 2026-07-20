import { type ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/shared/utils/cn";

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  topInset?: boolean;
  className?: string;
  contentClassName?: string;
}

export default function Screen({
  children,
  scroll,
  padded = true,
  topInset = true,
  className,
  contentClassName,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const style = { paddingTop: topInset ? insets.top : 0 };

  if (scroll) {
    return (
      <View style={style} className={cn("flex-1 bg-background", className)}>
        <ScrollView
          className="flex-1"
          contentContainerClassName={cn(padded && "p-4", contentClassName)}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={style}
      className={cn("flex-1 bg-background", padded && "p-4", className, contentClassName)}
    >
      {children}
    </View>
  );
}

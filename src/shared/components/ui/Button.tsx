import { ActivityIndicator, Pressable, type PressableProps, Text } from "react-native";

import { cn } from "@/shared/utils/cn";

type Variant = "primary" | "outline" | "ghost" | "destructive";

interface Props extends PressableProps {
  title: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

const VARIANT: Record<Variant, { box: string; text: string; spinner: string }> = {
  primary: { box: "bg-primary", text: "text-primary-foreground", spinner: "#ffffff" },
  outline: { box: "bg-transparent border border-border", text: "text-foreground", spinner: "#2563eb" },
  ghost: { box: "bg-transparent", text: "text-primary", spinner: "#2563eb" },
  destructive: { box: "bg-destructive", text: "text-destructive-foreground", spinner: "#ffffff" },
};

export default function Button({
  title,
  variant = "primary",
  loading,
  disabled,
  className,
  textClassName,
  ...rest
}: Props) {
  const v = VARIANT[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      className={cn(
        "h-12 flex-row items-center justify-center rounded-xl px-5",
        v.box,
        isDisabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={v.spinner} />
      ) : (
        <Text className={cn("text-base font-semibold", v.text, textClassName)}>{title}</Text>
      )}
    </Pressable>
  );
}

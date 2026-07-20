import { TextInput, type TextInputProps } from "react-native";

import { cn } from "@/shared/utils/cn";

interface Props extends TextInputProps {
  className?: string;
}

export default function Input({ className, ...rest }: Props) {
  return (
    <TextInput
      placeholderTextColor="#94a3b8"
      className={cn(
        "h-12 rounded-xl border border-border bg-white px-4 text-base text-foreground",
        className,
      )}
      {...rest}
    />
  );
}

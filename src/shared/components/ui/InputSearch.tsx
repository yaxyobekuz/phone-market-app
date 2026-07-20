import { TextInput, type TextInputProps, View } from "react-native";
import { Search } from "lucide-react-native";

import { cn } from "@/shared/utils/cn";

interface Props extends TextInputProps {
  className?: string;
}

export default function InputSearch({ className, ...rest }: Props) {
  return (
    <View
      className={cn(
        "h-12 flex-row items-center gap-2 rounded-xl border border-border bg-white px-3.5",
        className,
      )}
    >
      <Search size={18} color="#94a3b8" />
      <TextInput
        placeholderTextColor="#94a3b8"
        className="flex-1 text-base text-foreground"
        {...rest}
      />
    </View>
  );
}

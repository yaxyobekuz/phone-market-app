import { Pressable, ScrollView, Text } from "react-native";

import { cn } from "@/shared/utils/cn";
import type { Brand } from "@/shared/types";

interface Props {
  brands: Brand[];
  value: string;
  onChange: (v: string) => void;
}

export default function BrandPills({ brands, value, onChange }: Props) {
  const all = [{ _id: "", name: "Barchasi" }, ...brands];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 pr-4"
    >
      {all.map((b) => {
        const active = value === b._id;
        return (
          <Pressable
            key={b._id || "all"}
            onPress={() => onChange(b._id)}
            className={cn(
              "rounded-full border px-4 py-2",
              active ? "border-primary bg-primary" : "border-border bg-white",
            )}
          >
            <Text className={cn("text-sm font-medium", active ? "text-white" : "text-foreground")}>
              {b.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

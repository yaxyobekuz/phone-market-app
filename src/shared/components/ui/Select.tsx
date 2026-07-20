import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Check, ChevronDown } from "lucide-react-native";

import { cn } from "@/shared/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  value?: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Tanlang",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className={cn(
          "h-12 flex-row items-center justify-between rounded-xl border border-border bg-white px-4",
          className,
        )}
      >
        <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </Text>
        <ChevronDown size={18} color="#64748b" />
      </Pressable>

      <Modal
        visible={open}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable onPress={() => setOpen(false)} className="flex-1 justify-end bg-black/40">
          <Pressable
            className="max-h-[70%] rounded-t-2xl bg-white pb-8 pt-2"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="mx-auto mb-2 h-1 w-10 rounded-full bg-border" />
            <FlatList
              data={options}
              keyExtractor={(o) => o.value}
              renderItem={({ item }) => {
                const active = item.value === value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className="flex-row items-center justify-between px-5 py-3.5"
                  >
                    <Text
                      className={cn(
                        "text-base",
                        active ? "font-semibold text-primary" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Text>
                    {active ? <Check size={18} color="#2563eb" /> : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

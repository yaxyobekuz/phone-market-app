import { useCallback, useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";

import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import { CONDITIONS, CURRENCIES, REGIONS } from "@/shared/data/phones.data";
import type { CatalogFilterState } from "./CatalogFilters";

interface ChipOption {
  value: string;
  label: string;
}

function Chips({
  options,
  value,
  onChange,
}: {
  options: ChipOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <Pressable
            key={o.value || "all"}
            onPress={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-3.5 py-2",
              active ? "border-primary bg-primary" : "border-border bg-white",
            )}
          >
            <Text
              className={cn(
                "text-sm font-medium",
                active ? "text-white" : "text-foreground",
              )}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

interface Props {
  visible: boolean;
  onClose: () => void;
  value: CatalogFilterState;
  onChange: (field: keyof CatalogFilterState, val: string) => void;
  onReset: () => void;
}

const SNAP_POINTS = ["75%"];

const conditionOptions: ChipOption[] = [
  { value: "", label: "Barchasi" },
  ...CONDITIONS,
];
const regionOptions: ChipOption[] = [
  { value: "", label: "Barchasi" },
  ...REGIONS.map((r) => ({ value: r, label: r })),
];

export default function CatalogFiltersModal({
  visible,
  onClose,
  value,
  onChange,
  onReset,
}: Props) {
  const ref = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const onlyDigits = (t: string) => t.replace(/[^0-9]/g, "");

  useEffect(() => {
    if (visible) ref.current?.present();
    else ref.current?.dismiss();
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={SNAP_POINTS}
      enablePanDownToClose
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: "#cbd5e1", width: 40 }}
    >
      <View className="flex-row items-center justify-between px-5 pb-2 pt-1">
        <Text className="text-lg font-bold text-foreground">Filtrlar</Text>
        <Pressable onPress={onClose} hitSlop={8}>
          <X size={22} color="#0f172a" />
        </Pressable>
      </View>

      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 20,
          paddingBottom: 16,
        }}
      >
        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Holati</Text>
          <Chips
            options={conditionOptions}
            value={value.condition}
            onChange={(v) => onChange("condition", v)}
          />
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Valyuta</Text>
          <Chips
            options={CURRENCIES}
            value={value.currency}
            onChange={(v) => onChange("currency", v)}
          />
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Narx</Text>
          <View className="flex-row gap-3">
            <Input
              value={value.priceMin}
              onChangeText={(t) => onChange("priceMin", onlyDigits(t))}
              keyboardType="numeric"
              placeholder="dan"
              className="flex-1"
            />
            <Input
              value={value.priceMax}
              onChangeText={(t) => onChange("priceMax", onlyDigits(t))}
              keyboardType="numeric"
              placeholder="gacha"
              className="flex-1"
            />
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Hudud</Text>
          <Chips
            options={regionOptions}
            value={value.region}
            onChange={(v) => onChange("region", v)}
          />
        </View>
      </BottomSheetScrollView>

      <View
        style={{ paddingBottom: insets.bottom + 12 }}
        className="flex-row gap-3 border-t border-border bg-white px-5 pt-3"
      >
        <Button
          title="Tozalash"
          variant="outline"
          className="flex-1"
          onPress={onReset}
        />
        <Button title="Qo'llash" className="flex-1" onPress={onClose} />
      </View>
    </BottomSheetModal>
  );
}

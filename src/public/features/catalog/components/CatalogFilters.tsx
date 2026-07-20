import { View } from "react-native";

import Field from "@/shared/components/ui/Field";
import Input from "@/shared/components/ui/Input";
import Select from "@/shared/components/ui/Select";
import Button from "@/shared/components/ui/Button";
import { CONDITIONS, CURRENCIES, REGIONS } from "@/shared/data/phones.data";

export interface CatalogFilterState {
  search: string;
  brand: string;
  condition: string;
  region: string;
  currency: string;
  priceMin: string;
  priceMax: string;
  sort: string;
}

export const EMPTY_FILTERS: CatalogFilterState = {
  search: "",
  brand: "",
  condition: "",
  region: "",
  currency: "UZS",
  priceMin: "",
  priceMax: "",
  sort: "newest",
};

const DEFAULT_CURRENCY = "UZS";
const FILTER_FIELDS = ["condition", "region", "currency", "priceMin", "priceMax"] as const;

export const countActiveFilters = (v: Partial<CatalogFilterState> = {}) =>
  FILTER_FIELDS.filter((k) =>
    k === "currency" ? Boolean(v[k]) && v[k] !== DEFAULT_CURRENCY : Boolean(v[k]),
  ).length;

const conditionOptions = [{ value: "", label: "Barchasi" }, ...CONDITIONS];
const regionOptions = [
  { value: "", label: "Barchasi" },
  ...REGIONS.map((r) => ({ value: r, label: r })),
];

interface Props {
  value: CatalogFilterState;
  onChange: (field: keyof CatalogFilterState, val: string) => void;
  onReset: () => void;
  close?: () => void;
}

export default function CatalogFilters({ value, onChange, onReset, close }: Props) {
  const onlyDigits = (t: string) => t.replace(/[^0-9]/g, "");

  return (
    <View className="gap-4">
      <Field label="Holati">
        <Select
          value={value.condition}
          onChange={(v) => onChange("condition", v)}
          options={conditionOptions}
          placeholder="Barchasi"
        />
      </Field>

      <Field label="Hudud">
        <Select
          value={value.region}
          onChange={(v) => onChange("region", v)}
          options={regionOptions}
          placeholder="Barchasi"
        />
      </Field>

      <Field label="Valyuta">
        <Select value={value.currency} onChange={(v) => onChange("currency", v)} options={CURRENCIES} />
      </Field>

      <View className="flex-row gap-3">
        <Field label="Narx (dan)" className="flex-1">
          <Input
            value={value.priceMin}
            onChangeText={(t) => onChange("priceMin", onlyDigits(t))}
            keyboardType="numeric"
            placeholder="0"
          />
        </Field>
        <Field label="Narx (gacha)" className="flex-1">
          <Input
            value={value.priceMax}
            onChangeText={(t) => onChange("priceMax", onlyDigits(t))}
            keyboardType="numeric"
            placeholder="—"
          />
        </Field>
      </View>

      <View className="flex-row gap-3 pt-1">
        <Button title="Tozalash" variant="outline" className="flex-1" onPress={onReset} />
        <Button title="Qo'llash" className="flex-1" onPress={() => close?.()} />
      </View>
    </View>
  );
}

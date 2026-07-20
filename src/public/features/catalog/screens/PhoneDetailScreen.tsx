import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, Eye, Heart, MapPin } from "lucide-react-native";

import useSaved from "@/shared/hooks/useSaved";
import Loading from "@/shared/components/ui/Loading";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import { barShadow } from "@/shared/lib/shadows";
import { cn } from "@/shared/utils/cn";
import { formatPrice } from "@/shared/utils/formatPrice";
import { formatPhone } from "@/shared/utils/formatPhone";
import { formatDateUz } from "@/shared/utils/formatDate";
import { CONDITION_LABEL } from "@/shared/data/phones.data";
import type { Brand, Seller } from "@/shared/types";
import { usePhoneQuery } from "../hooks/useCatalogQueries";
import PhoneImageGallery from "../components/PhoneImageGallery";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-dashed border-border py-2">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <Text className="text-sm font-medium text-foreground">{value}</Text>
    </View>
  );
}

export default function PhoneDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const phoneId = String(id || "");
  const { data: phone, isLoading, isError } = usePhoneQuery(phoneId);
  const { isSaved, toggleSave } = useSaved();
  const [showPhone, setShowPhone] = useState(false);

  if (isLoading) return <Loading />;
  if (isError || !phone) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-muted-foreground">
          E'lon topilmadi yoki o'chirilgan.
        </Text>
      </View>
    );
  }

  const saved = isSaved(phone._id);
  const seller = (
    typeof phone.seller === "object" ? phone.seller : null
  ) as Seller | null;
  const brandName =
    typeof phone.brand === "object" ? (phone.brand as Brand)?.name : undefined;

  const specs: [string, string | undefined][] = [
    ["Brend", brandName],
    ["Holati", CONDITION_LABEL[phone.condition]],
    ["Xotira", phone.storage ? `${phone.storage} GB` : undefined],
    ["Operativ xotira", phone.ram ? `${phone.ram} GB` : undefined],
    ["Rangi", phone.color || undefined],
    ["Batareya", phone.batteryHealth ? `${phone.batteryHealth}%` : undefined],
    ["Hudud", phone.region || undefined],
  ];
  const filledSpecs = specs.filter((s): s is [string, string] => Boolean(s[1]));

  const handleCall = () => {
    if (!showPhone) {
      setShowPhone(true);
      return;
    }
    if (phone.contactPhone) Linking.openURL(`tel:${phone.contactPhone}`);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <PhoneImageGallery images={phone.images} />

        <View className="gap-4 p-4">
          <View className="flex-row flex-wrap gap-2">
            <Badge
              label={CONDITION_LABEL[phone.condition]}
              className="bg-primary/10"
              textClassName="text-primary"
            />
            {phone.isFeatured ? (
              <Badge
                label="TOP"
                className="bg-amber-500"
                textClassName="text-white"
              />
            ) : null}
            {phone.status === "sold" ? (
              <Badge
                label="Sotilgan"
                className="bg-destructive"
                textClassName="text-white"
              />
            ) : null}
          </View>

          <Text className="text-xl font-bold text-foreground">
            {phone.title}
          </Text>

          <Text className="text-2xl font-extrabold text-primary">
            {formatPrice(phone.price, phone.currency)}
            {phone.isNegotiable ? (
              <Text className="text-sm font-normal text-muted-foreground">
                {" "}
                · Kelishiladi
              </Text>
            ) : null}
          </Text>

          <View className="flex-row flex-wrap items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Eye size={15} color="#94a3b8" />
              <Text className="text-sm text-muted-foreground">
                {phone.views || 0} marta ko'rilgan
              </Text>
            </View>
            {phone.region ? (
              <View className="flex-row items-center gap-1">
                <MapPin size={15} color="#94a3b8" />
                <Text className="text-sm text-muted-foreground">
                  {phone.region}
                </Text>
              </View>
            ) : null}
            <View className="flex-row items-center gap-1">
              <Calendar size={15} color="#94a3b8" />
              <Text className="text-sm text-muted-foreground">
                {formatDateUz(phone.createdAt)}
              </Text>
            </View>
          </View>

          <View className="border border-gray-200 flex-row items-center gap-3 rounded-2xl bg-white p-4">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <Text className="text-base font-semibold text-primary">
                {(seller?.firstName?.[0] || "?").toUpperCase()}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="text-sm font-medium text-foreground">
                {[seller?.firstName, seller?.lastName]
                  .filter(Boolean)
                  .join(" ") || "Sotuvchi"}
              </Text>
              <Text className="text-xs text-muted-foreground">Sotuvchi</Text>
            </View>
          </View>

          <View className="flex-1">
            <Button
              title={
                showPhone && phone.contactPhone
                  ? formatPhone(phone.contactPhone)
                  : "Qo'ng'iroq"
              }
              onPress={handleCall}
            />
          </View>

          <View className="border border-gray-200 rounded-2xl bg-white p-4">
            <Text className="mb-1 text-sm font-semibold text-foreground">
              Xususiyatlari
            </Text>
            {filledSpecs.map(([label, value]) => (
              <Spec key={label} label={label} value={value} />
            ))}
          </View>

          {phone.description ? (
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">
                Tavsif
              </Text>
              <View className="border border-gray-200 rounded-2xl bg-white p-4">
                <Text className="text-sm leading-relaxed text-foreground/90">
                  {phone.description}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={[barShadow, { paddingBottom: insets.bottom + 10 }]}
        className="absolute bottom-0 w-full flex-row items-center gap-3 border-t border-border bg-white px-4 pt-3"
      >
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">Narx</Text>
          <Text className="text-lg font-extrabold text-primary">
            {formatPrice(phone.price, phone.currency)}
          </Text>
        </View>

        <Pressable
          onPress={() => toggleSave(phone)}
          className={cn(
            "h-12 w-12 items-center justify-center rounded-xl border",
            saved ? "border-red-200 bg-red-50" : "border-border bg-white",
          )}
        >
          <Heart
            size={20}
            color={saved ? "#ef4444" : "#64748b"}
            fill={saved ? "#ef4444" : "transparent"}
          />
        </Pressable>
      </View>
    </View>
  );
}

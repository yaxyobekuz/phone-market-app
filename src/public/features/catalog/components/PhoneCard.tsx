import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Eye, Heart, ImageOff, MapPin, Star } from "lucide-react-native";

import { cn } from "@/shared/utils/cn";
import { cardShadow } from "@/shared/lib/shadows";
import { formatPrice } from "@/shared/utils/formatPrice";
import { CONDITION_LABEL } from "@/shared/data/phones.data";
import type { Phone } from "@/shared/types";

const CONDITION_BG: Record<string, string> = {
  new: "bg-emerald-500",
  like_new: "bg-sky-500",
  used: "bg-gray-700",
};

interface Props {
  phone: Phone;
  saved?: boolean;
  onToggleSave?: (phone: Phone) => void;
  className?: string;
}

export default function PhoneCard({ phone, saved, onToggleSave, className }: Props) {
  const img = phone.images?.[0];

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/phones/[id]", params: { id: phone._id } })}
      style={cardShadow}
      className={cn("overflow-hidden rounded-2xl border border-border bg-white", className)}
    >
      <View className="aspect-square bg-muted">
        {img ? (
          <Image source={{ uri: img }} className="h-full w-full" contentFit="cover" transition={150} />
        ) : (
          <View className="h-full w-full items-center justify-center">
            <ImageOff size={22} color="#94a3b8" />
          </View>
        )}

        <View className="absolute left-2 top-2 flex-row gap-1.5">
          <View
            className={cn("rounded-full px-2 py-0.5", CONDITION_BG[phone.condition] || CONDITION_BG.used)}
          >
            <Text className="text-[11px] font-semibold text-white">
              {CONDITION_LABEL[phone.condition]}
            </Text>
          </View>
          {phone.isFeatured ? (
            <View className="rounded-full bg-amber-500 px-2 py-0.5">
              <Text className="text-[11px] font-semibold text-white">TOP</Text>
            </View>
          ) : null}
        </View>

        {onToggleSave ? (
          <Pressable
            onPress={() => onToggleSave(phone)}
            hitSlop={8}
            className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white/90"
          >
            <Heart
              size={16}
              color={saved ? "#ef4444" : "#64748b"}
              fill={saved ? "#ef4444" : "transparent"}
            />
          </Pressable>
        ) : null}
      </View>

      <View className="gap-1 p-2.5">
        <Text numberOfLines={2} className="text-sm font-medium leading-snug text-foreground">
          {phone.title}
        </Text>
        <Text className="text-base font-bold text-primary">
          {formatPrice(phone.price, phone.currency)}
        </Text>
        <View className="flex-row flex-wrap items-center gap-x-3 gap-y-0.5">
          {phone.region ? (
            <View className="flex-row items-center gap-1">
              <MapPin size={12} color="#94a3b8" />
              <Text className="text-xs text-muted-foreground">{phone.region}</Text>
            </View>
          ) : null}
          <View className="flex-row items-center gap-1">
            <Eye size={12} color="#94a3b8" />
            <Text className="text-xs text-muted-foreground">{phone.views || 0}</Text>
          </View>
          {phone.ratingCount ? (
            <View className="flex-row items-center gap-1">
              <Star size={12} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-xs text-muted-foreground">{phone.ratingAvg}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

import { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { ImageOff } from "lucide-react-native";

import { cn } from "@/shared/utils/cn";

const { width } = Dimensions.get("window");

interface Props {
  images?: string[];
}

export default function PhoneImageGallery({ images }: Props) {
  const [idx, setIdx] = useState(0);
  const imgs = images && images.length ? images : [];

  if (!imgs.length) {
    return (
      <View style={{ width, height: width }} className="items-center justify-center bg-muted">
        <ImageOff size={40} color="#94a3b8" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setIdx(Math.round(e.nativeEvent.contentOffset.x / width))
        }
      >
        {imgs.map((uri, i) => (
          <Image key={i} source={{ uri }} style={{ width, height: width }} contentFit="cover" />
        ))}
      </ScrollView>

      {imgs.length > 1 ? (
        <View className="absolute bottom-3 w-full flex-row justify-center gap-1.5">
          {imgs.map((_, i) => (
            <View
              key={i}
              className={cn("h-1.5 rounded-full", i === idx ? "w-4 bg-white" : "w-1.5 bg-white/60")}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

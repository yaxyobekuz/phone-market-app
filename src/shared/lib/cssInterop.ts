import { cssInterop } from "nativewind";
import { Image } from "expo-image";

// Enable NativeWind className on expo-image (third-party component)
cssInterop(Image, { className: "style" });

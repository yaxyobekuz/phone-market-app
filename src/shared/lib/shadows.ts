import { Platform, type ViewStyle } from "react-native";

// Soft card elevation (iOS shadow / Android elevation)
export const cardShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  android: { elevation: 2 },
  default: {},
}) as ViewStyle;

// Stronger elevation for floating / sticky bars
export const barShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: "#0f172a",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
  },
  android: { elevation: 12 },
  default: {},
}) as ViewStyle;

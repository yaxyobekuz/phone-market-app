// Expo config. Google Sign-In plugin only loads when its iOS URL scheme env is set,
// so dev builds don't break before Google credentials are configured.
const googleIosUrlScheme = process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME;

const plugins = [
  "expo-router",
  "expo-secure-store",
  [
    "expo-splash-screen",
    {
      backgroundColor: "#2563eb",
      image: "./assets/images/splash-icon.png",
      imageWidth: 96,
    },
  ],
];

if (googleIosUrlScheme) {
  plugins.push([
    "@react-native-google-signin/google-signin",
    { iosUrlScheme: googleIosUrlScheme },
  ]);
}

module.exports = {
  name: "Telefon Bozor",
  slug: "telefon-bozor",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "telefonbozor",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "uz.telefonbozor.app",
  },
  android: {
    package: "uz.telefonbozor.app",
    adaptiveIcon: {
      backgroundColor: "#2563eb",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins,
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      // `eas init` bosgach chiqadigan project ID'ni shu yerga qo'ying
      projectId: "",
    },
  },
};

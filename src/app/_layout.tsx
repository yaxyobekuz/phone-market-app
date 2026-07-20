import "../global.css";
import "@/shared/lib/cssInterop";

import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import AppProviders from "@/shared/providers/AppProviders";
import { loadSaved, startSavedPersistence } from "@/shared/store/saved.persist";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startSavedPersistence();
    loadSaved().finally(() => {
      setReady(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="phones/[id]" options={{ headerShown: true, title: "E'lon" }} />
        </Stack>
      </AppProviders>
    </GestureHandlerRootView>
  );
}

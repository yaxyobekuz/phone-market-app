import axios from "axios";
import Constants from "expo-constants";

// On a real device / Expo Go, "localhost" points to the device itself.
// Swap in the Metro dev host's LAN IP so the app can reach the dev server.
const configuredUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:6933/api";
const hostUri =
  Constants.expoConfig?.hostUri || (Constants as any).expoGoConfig?.debuggerHost || "";
const devHost = hostUri.split(":")[0];
const API_URL =
  devHost && /localhost|127\.0\.0\.1/.test(configuredUrl)
    ? configuredUrl.replace(/localhost|127\.0\.0\.1/, devHost)
    : configuredUrl;

// Public, read-only API — no auth in the minimalist app
const http = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default http;

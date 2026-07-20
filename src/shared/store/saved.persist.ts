import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Phone } from "@/shared/types";
import { store } from "./store";
import { hydrate } from "./saved.slice";

const KEY = "saved:v1";

// Load persisted saved listings into the store on startup
export async function loadSaved() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    store.dispatch(hydrate(raw ? (JSON.parse(raw) as Record<string, Phone>) : {}));
  } catch {
    store.dispatch(hydrate({}));
  }
}

let started = false;
let timer: ReturnType<typeof setTimeout> | null = null;

// Persist saved listings to AsyncStorage whenever they change (debounced)
export function startSavedPersistence() {
  if (started) return;
  started = true;
  store.subscribe(() => {
    const state = store.getState().saved;
    if (!state.hydrated) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      AsyncStorage.setItem(KEY, JSON.stringify(state.items)).catch(() => {});
    }, 300);
  });
}

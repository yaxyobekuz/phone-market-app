import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Phone } from "@/shared/types";

interface SavedState {
  items: Record<string, Phone>;
  hydrated: boolean;
}

const initialState: SavedState = { items: {}, hydrated: false };

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<Record<string, Phone>>) => {
      state.items = action.payload || {};
      state.hydrated = true;
    },
    toggle: (state, action: PayloadAction<Phone>) => {
      const phone = action.payload;
      if (state.items[phone._id]) delete state.items[phone._id];
      else state.items[phone._id] = phone;
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    clear: (state) => {
      state.items = {};
    },
  },
});

export const { hydrate, toggle, remove, clear } = savedSlice.actions;

export default savedSlice.reducer;

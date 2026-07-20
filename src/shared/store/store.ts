import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./modal.slice";
import savedReducer from "./saved.slice";

export const store = configureStore({
  reducer: { modal: modalReducer, saved: savedReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

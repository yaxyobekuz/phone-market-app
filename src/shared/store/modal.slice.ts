import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalData = Record<string, any>;

interface ModalEntry {
  isOpen: boolean;
  data: ModalData;
  isLoading: boolean;
}

type ModalState = Record<string, ModalEntry>;

const createInitialModalData = (): ModalEntry => ({
  isOpen: false,
  data: {},
  isLoading: false,
});

const initialState: ModalState = {};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<{ modal: string; data?: ModalData }>) => {
      const { modal, data } = action.payload;
      if (!state[modal]) state[modal] = createInitialModalData();
      state[modal].isOpen = true;
      state[modal].data = { ...(data || {}) };
    },

    close: (state, action: PayloadAction<{ modal: string; data?: ModalData }>) => {
      const { modal, data } = action.payload;
      if (!state[modal]) state[modal] = createInitialModalData();
      state[modal].isOpen = false;
      state[modal].isLoading = false;
      state[modal].data = { ...(data || {}) };
    },

    updateData: (state, action: PayloadAction<{ modal: string; data?: ModalData }>) => {
      const { modal, data } = action.payload;
      if (!state[modal]) state[modal] = createInitialModalData();
      state[modal].data = { ...state[modal].data, ...(data || {}) };
    },

    updateLoading: (state, action: PayloadAction<{ modal: string; value: boolean }>) => {
      const { modal, value } = action.payload;
      if (!state[modal]) state[modal] = createInitialModalData();
      state[modal].isLoading = value;
    },
  },
});

export const { open, close, updateLoading, updateData } = modalSlice.actions;

export default modalSlice.reducer;

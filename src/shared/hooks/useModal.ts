import { useDispatch, useSelector } from "react-redux";

import { open, close, updateData, updateLoading } from "@/shared/store/modal.slice";
import type { RootState } from "@/shared/store/store";

const useModal = (defaultModal?: string) => {
  const dispatch = useDispatch();

  const modal = useSelector((state: RootState) =>
    defaultModal ? state.modal[defaultModal] : undefined,
  ) || { data: null, isOpen: false, isLoading: false };

  const openModal = (name: string, data: any = null) => {
    dispatch(open({ modal: name, data }));
  };

  const closeModal = (name: string, data: any = null) => {
    dispatch(close({ modal: name, data }));
  };

  const updateModalLoading = (name: string, value: boolean) => {
    dispatch(updateLoading({ modal: name, value }));
  };

  const updateModalData = (name: string, data: any) => {
    dispatch(updateData({ modal: name, data }));
  };

  return {
    ...modal,
    dispatch,
    openModal,
    closeModal,
    updateModalData,
    updateModalLoading,
  };
};

export default useModal;

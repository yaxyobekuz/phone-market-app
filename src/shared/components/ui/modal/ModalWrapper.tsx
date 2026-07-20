import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import useModal from "@/shared/hooks/useModal";

interface Props {
  name: string;
  title?: string;
  children: ReactElement;
}

// RN analog of the web ModalWrapper: driven by the Redux modal slice via
// useModal(name); injects { close, isLoading, setIsLoading, ...data } into the child.
export default function ModalWrapper({ name, title, children }: Props) {
  const ref = useRef<BottomSheetModal>(null);
  const { isOpen, data, closeModal } = useModal(name);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) ref.current?.present();
    else ref.current?.dismiss();
  }, [isOpen]);

  const close = useCallback(() => closeModal(name), [closeModal, name]);

  const handleDismiss = useCallback(() => {
    if (isOpen) closeModal(name);
  }, [closeModal, isOpen, name]);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={isLoading ? "none" : "close"}
      />
    ),
    [isLoading],
  );

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<any>, {
        close,
        isLoading,
        setIsLoading,
        ...(data || {}),
      })
    : children;

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose={!isLoading}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <View className="px-5 pb-10 pt-1">
          {title ? (
            <Text className="mb-4 text-lg font-bold text-foreground">{title}</Text>
          ) : null}
          {child}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

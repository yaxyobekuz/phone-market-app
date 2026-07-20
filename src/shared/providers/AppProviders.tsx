import { type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { store } from "@/shared/store/store";
import { queryClient } from "@/shared/lib/query-client";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          {children}
          <Toast />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}

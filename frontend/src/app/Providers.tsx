"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ModalProvider } from "@/modules/shared/component/ModalProvider/modalProvider";
import { ThemeProvider } from "@/app/theme";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </Provider>
  );
}

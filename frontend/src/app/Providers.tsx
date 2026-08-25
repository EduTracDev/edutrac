"use client";
import { ModalProvider } from "@/modules/shared/component/ModalProvider/modalProvider";
import {ThemeProvider} from "@/app/theme";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  );
}

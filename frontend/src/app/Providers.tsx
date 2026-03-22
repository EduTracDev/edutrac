// "use client";
// import { ThemeProvider } from "@mui/material/styles";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { Provider as ReduxProvider } from "react-redux";
// import { store } from "@/redux/store";
// import { ModalProvider } from "@/modules/shared/component/ModalProvider/modalProvider";
// import { Suspense } from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import createEmotionCache from "./createEmotionCache";
// import theme from "@/theme/muiTheme";
// import AuthProvider from "@/modules/shared/component/AuthProvider/authProvider";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const clientSideEmotionCache = createEmotionCache();
// const queryClient = new QueryClient();

// export function Providers({
//   children,
//   emotionCache = clientSideEmotionCache,
// }: {
//   children: React.ReactNode;
//   emotionCache?: ReturnType<typeof createEmotionCache>;
// }) {
//   return (
//     <ReduxProvider store={store}>
//       <ThemeProvider theme={theme}>
//         <QueryClientProvider client={queryClient}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Suspense fallback={<div></div>}>
//               <CssBaseline />
//               <ModalProvider />
//               <AuthProvider>{children}</AuthProvider>
//             </Suspense>
//           </LocalizationProvider>
//         </QueryClientProvider>
//       </ThemeProvider>
//     </ReduxProvider>
//   );
// }
import { ModalProvider } from "@/modules/shared/component/ModalProvider/modalProvider";
export function Providers({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

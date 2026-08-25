import type { Metadata } from "next";
import { Inter, Source_Sans_3, Poppins, Open_Sans, Epilogue } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"] as const,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] as const,
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] as const,
});

export const metadata: Metadata = {
  title: "Edutrac – School Learning Management System",
  description:
    "Manage your school, classes, teachers, students and parents in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSans.variable} ${poppins.variable} ${openSans.variable} ${epilogue.variable} font-sans antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                border: "1px solid #4ade80",
              },
            },
            error: {
              style: {
                border: "1px solid #f87171",
              },
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

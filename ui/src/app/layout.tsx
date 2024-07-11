import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";
import { Providers } from './providers';
import { ThemeProvider } from "@/components/theme-provider"

import { Toaster } from "@/components/ui/toaster"
import { NavBar } from "@/components/main-nav";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Commit",
  description: "Commit to your run.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Providers>
          <div className="flex min-h-screen w-full flex-col">
          <NavBar />
          {children}
          </div>
        </Providers>
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

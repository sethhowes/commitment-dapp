import { Inter } from "next/font/google";
import SideNav from "./ui/sidenav";
import { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dopa",
  description: "Commit to a run, and if you fail, pay up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className=" flex flex-col flex-grow p-4 md:overflow-y-auto md:p-10">
              <div className="flex justify-end items-center">
                <ConnectButton />
              </div>
              <hr className="mt-10"></hr>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/src/components/StoreProvider";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ThemeProvider from "@/src/components/ThemeProvider";
import Breadcrumb from "@/src/components/Breadcrumb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CivicDataSpace — Open Public Data",
  description: "Discover, explore, and download open civic datasets from around the world.",
  openGraph: {
    title: "CivicDataSpace",
    description: "Open public data platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <StoreProvider>
          <ThemeProvider>
            <Header />
            <Breadcrumb />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WalletProvider } from "@/lib/blockchain/wallets/WalletProvider";
import { Toaster } from "@/components/ui/sonner";
import { FAIRDROP } from "@/constants/fairdrop";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: FAIRDROP.title,
    template: `%s | ${FAIRDROP.name}`,
  },
  description: FAIRDROP.description,
  keywords: [...FAIRDROP.keywords],
  authors: [
    {
      name: FAIRDROP.name,
      url: `https://${FAIRDROP.contact.website}`,
    },
  ],
  creator: FAIRDROP.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${FAIRDROP.contact.website}`,
    title: FAIRDROP.title,
    description: FAIRDROP.description,
    siteName: FAIRDROP.name,
  },
  twitter: {
    card: "summary_large_image",
    title: FAIRDROP.title,
    description: FAIRDROP.description,
    creator: "@fairdrop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

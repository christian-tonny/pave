import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import "../styles/tiptap.css";
import Navigation from "@/components/navigation";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { UserSyncProvider } from "./UserSyncProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Pave — find the career path that fits you",
  description:
    "Pave asks you what you are actually drawn to, what you can commit to, and where you can be — then shows you a career path in Rwanda you can start, with the opportunities, schools and next steps to get there.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pave",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#B4471F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${inter.className} ${display.variable}`}>
        <ConvexClientProvider>
          <UserSyncProvider>
            <NotificationProvider>
              <Navigation />
              {children}
              <Toaster />
            </NotificationProvider>
          </UserSyncProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

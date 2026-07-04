import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Agentation } from "agentation";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vucko™ — Creative Agency",
  description: "Partnering with brands to define, structure, and scale motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <SplashScreen />
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}

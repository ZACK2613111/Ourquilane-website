import { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Ourquilane Website",
  description: "We drive sector transformation with tailor-made solutions and a commitment to excellence, bringing your most ambitious projects to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body>{children}</body>
      </LanguageProvider>
    </html>
  );
}

// import { Neue_graphica } from "@/utils/font";
import { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

// const neueGraphica = Neue_graphica.variable;

export const metadata: Metadata = {
  title: "OURQUILANE Website",
  description: "Website showcasing different fonts",
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

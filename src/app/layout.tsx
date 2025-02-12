import { Neue_graphica } from "@/utils/font";
import { Metadata } from "next";
import "./globals.css";

const neueGraphica = Neue_graphica.variable;
// const satochiFont = Satochi.variable;

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
      <body className={`${neueGraphica} antialiased`}>
        {children}
      </body>
    </html>
  );
}

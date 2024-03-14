import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// Define application-wide metadata using the imported Metadata type for TypeScript validation.
export const metadata: Metadata = {
  title: "Lern Tool",
  description: "Lern tool für die Schule",
};
// Define the RootLayout component that wraps around the entire application or specific parts of it.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // Return the layout structure, setting the HTML language attribute and applying the Inter font.
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}

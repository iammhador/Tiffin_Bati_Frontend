import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiffin Bati - Homemade Flavors at Your Doorstep",
  description: "Tiffin Bati is online base lunch and dinner providing service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

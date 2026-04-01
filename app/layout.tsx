import type { Metadata } from "next";
import "./globals.css"; // Your Tailwind styles

export const metadata: Metadata = {
  title: "NowForNext",
  description: "Now For Next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Nav or Header goes here if it appears on every page */}
        <main suppressHydrationWarning>{children}</main>
        {/* Footer goes here */}
      </body>
    </html>
  );
}

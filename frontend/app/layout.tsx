import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krypt 2025",
  description: "Send ETH with a message (Sepolia)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="mx-auto max-w-3xl p-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

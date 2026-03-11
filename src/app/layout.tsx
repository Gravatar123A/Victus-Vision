import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victus Vision — Premium Freelance & Digital Marketplace",
  description:
    "Hire top freelancers, buy premium digital products, and grow your business on Victus Vision — the modern marketplace for services and digital assets.",
  keywords: ["freelance", "marketplace", "digital products", "plugins", "scripts", "templates", "web development", "design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`} style={{ fontFamily: "var(--font-sans)" }}>
        <ThemeProvider>
          <AuthProvider>
            <div className="mesh-gradient" aria-hidden="true" />
            <Navbar />
            <main className="relative z-10 pt-16 min-h-screen">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

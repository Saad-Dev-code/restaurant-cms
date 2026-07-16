import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { anton, inter } from "@/lib/fonts";
import { CartProvider } from "@/components/public/CartProvider";
import { DEFAULT_RESTAURANT_NAME, DEFAULT_DESCRIPTION } from "@/lib/constants";
import { getRestaurantSettings } from "@/features/settings/queries";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: DEFAULT_RESTAURANT_NAME,
    template: `%s | ${DEFAULT_RESTAURANT_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: DEFAULT_RESTAURANT_NAME,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getRestaurantSettings();

  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            {children}
            <CartProvider whatsappNumber={settings?.whatsapp} />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

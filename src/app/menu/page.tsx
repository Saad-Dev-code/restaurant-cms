import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { MenuPageClient } from "@/components/public/MenuPageClient";
import { getMenuCategories } from "@/features/menu/queries";
import { getRestaurantSettings } from "@/features/settings/queries";
import { DEFAULT_RESTAURANT_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getRestaurantSettings();
  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;
  return {
    title: "Menu",
    description: `Explore our menu of premium craft burgers, sides, and drinks at ${name}.`,
    openGraph: { title: `Menu | ${name}`, description: `Explore our menu of premium craft burgers at ${name}.` },
  };
}

export default async function MenuPage() {
  const [categories, settings] = await Promise.all([
    getMenuCategories(),
    getRestaurantSettings(),
  ]);

  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;

  return (
    <>
      <Header restaurantName={name} logo={settings?.logo} />
      <main>
        <Box sx={{ py: { xs: 3, md: 4 }, backgroundColor: "#0D0D0D" }}>
          <Container maxWidth="lg">
            <Typography variant="caption" sx={{ color: "#A9CD3A", mb: 1, display: "block" }}>
              Our Menu
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Anton, sans-serif",
                fontSize: { xs: 28, md: 36 },
                color: "#FAF8F2",
                mb: 3,
              }}
            >
              What We Serve
            </Typography>
            <MenuPageClient categories={categories} />
          </Container>
        </Box>
      </main>
      <Footer
        restaurantName={name}
        address={settings?.address}
        phone={settings?.phone}
        whatsapp={settings?.whatsapp}
        facebook={settings?.facebook}
        instagram={settings?.instagram}
        openingHours={settings?.openingHours}
      />
    </>
  );
}

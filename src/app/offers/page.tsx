import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { OfferCard } from "@/components/public/OfferCard";
import { getActiveOffers } from "@/features/offers/queries";
import { getRestaurantSettings } from "@/features/settings/queries";
import { DEFAULT_RESTAURANT_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getRestaurantSettings();
  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;
  return {
    title: "Offers",
    description: `Current offers and promotions at ${name}.`,
    openGraph: { title: `Offers | ${name}`, description: `Current offers and promotions at ${name}.` },
  };
}

export default async function OffersPage() {
  const [offers, settings] = await Promise.all([
    getActiveOffers(),
    getRestaurantSettings(),
  ]);

  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;

  return (
    <>
      <Header restaurantName={name} logo={settings?.logo} />
      <main>
        <Box sx={{ py: { xs: 3, md: 4 }, backgroundColor: "#0D0D0D", minHeight: "60vh" }}>
          <Container maxWidth="lg">
            <Typography
              variant="caption"
              sx={{ color: "#D85A30", mb: 1, display: "block" }}
            >
              Promotions
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
              Current Offers
            </Typography>

            {offers.length > 0 ? (
              <Grid container spacing={3}>
                {offers.map((offer) => (
                  <Grid key={offer.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <OfferCard offer={offer} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  backgroundColor: "#1A1A18",
                  border: "1px solid #33342C",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h3" sx={{ color: "#B8B6A9", mb: 1 }}>
                  No Offers
                </Typography>
                <Typography variant="body2" sx={{ color: "#5C5D51" }}>
                  Check back soon for new promotions and deals.
                </Typography>
              </Box>
            )}
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

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HeroSection } from "@/components/public/HeroSection";
import { MenuCard } from "@/components/public/MenuCard";
import { OfferCard } from "@/components/public/OfferCard";
import { MapEmbed } from "@/components/public/MapEmbed";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { getFeaturedItems } from "@/features/menu/queries";
import { getActiveOffers } from "@/features/offers/queries";
import { getRestaurantSettings } from "@/features/settings/queries";
import { DEFAULT_RESTAURANT_NAME, DEFAULT_DESCRIPTION } from "@/lib/constants";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getRestaurantSettings();
  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;
  return {
    title: name,
    description: DEFAULT_DESCRIPTION,
    openGraph: { title: name, description: DEFAULT_DESCRIPTION },
  };
}

function jsonLd(settings: Awaited<ReturnType<typeof getRestaurantSettings>>) {
  if (!settings) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.restaurantName,
    address: { "@type": "PostalAddress", streetAddress: settings.address },
    telephone: settings.phone,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theburg.com",
    logo: settings.logo || undefined,
    openingHours: settings.openingHours
      .filter((h: { closed: boolean }) => !h.closed)
      .map((h: { day: string; open: string; close: string }) => `Mo-Su ${h.open}-${h.close}`),
  };
}

export default async function HomePage() {
  const [featuredItems, activeOffers, settings] = await Promise.all([
    getFeaturedItems(),
    getActiveOffers(),
    getRestaurantSettings(),
  ]);

  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(settings)),
        }}
      />
      <Header restaurantName={name} logo={settings?.logo} />
      <main>
        <HeroSection restaurantName={name} address={settings?.address} featuredItems={featuredItems} />

        {featuredItems.length > 0 && (
          <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#0D0D0D" }}>
            <Container maxWidth="lg">
              <Typography
                variant="caption"
                sx={{ color: "#A9CD3A", mb: 1, display: "block" }}
              >
                Featured
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
                Signature Bites
              </Typography>
              <Grid container spacing={3}>
                {featuredItems.map((item) => (
                  <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <MenuCard item={item} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        )}

        {activeOffers.length > 0 && (
          <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#060605" }}>
            <Container maxWidth="lg">
              <Typography
                variant="caption"
                sx={{ color: "#D85A30", mb: 1, display: "block" }}
              >
                Limited Time
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
              <Grid container spacing={3}>
                {activeOffers.map((offer) => (
                  <Grid key={offer.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <OfferCard offer={offer} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        )}

        {settings && (
          <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#0D0D0D" }}>
            <Container maxWidth="lg">
              <Typography
                variant="caption"
                sx={{ color: "#A9CD3A", mb: 1, display: "block" }}
              >
                Visit Us
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
                Find {name}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      backgroundColor: "#1A1A18",
                      border: "1px solid #33342C",
                      borderRadius: 2,
                      p: 3,
                      height: "100%",
                    }}
                  >
                    <Typography variant="body1" sx={{ color: "#FAF8F2", mb: 2 }}>
                      {settings.address}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#B8B6A9" }}>
                      Phone: {settings.phone}
                    </Typography>
                    {settings.openingHours.map((h: { day: string; open: string; close: string; closed: boolean }) => (
                      <Box key={h.day} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
                        <Typography variant="body2" sx={{ color: "#B8B6A9" }}>{h.day}</Typography>
                        <Typography variant="body2" sx={{ color: h.closed ? "#E24B4A" : "#B8B6A9" }}>
                          {h.closed ? "Closed" : `${h.open} - ${h.close}`}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <MapEmbed googleMapsUrl={settings.googleMaps} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
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

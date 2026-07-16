import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { MapEmbed } from "@/components/public/MapEmbed";
import { getRestaurantSettings } from "@/features/settings/queries";
import { DEFAULT_RESTAURANT_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getRestaurantSettings();
  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;
  return {
    title: "Contact",
    description: `Get in touch with ${name}. Find our location, hours, and contact information.`,
    openGraph: { title: `Contact | ${name}`, description: `Get in touch with ${name}.` },
  };
}

export default async function ContactPage() {
  const settings = await getRestaurantSettings();
  const name = settings?.restaurantName ?? DEFAULT_RESTAURANT_NAME;

  return (
    <>
      <Header restaurantName={name} logo={settings?.logo} />
      <main>
        <Box sx={{ py: { xs: 3, md: 4 }, backgroundColor: "#0D0D0D", minHeight: "60vh" }}>
          <Container maxWidth="lg">
            <Typography variant="caption" sx={{ color: "#A9CD3A", mb: 1, display: "block" }}>
              Get in Touch
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Anton, sans-serif",
                fontSize: { xs: 28, md: 36 },
                color: "#FAF8F2",
                mb: 4,
              }}
            >
              Contact Us
            </Typography>

            {settings && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box
                      sx={{
                        backgroundColor: "#1A1A18",
                        border: "1px solid #33342C",
                        borderRadius: 2,
                        p: 3,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <LocationOnIcon sx={{ color: "#A9CD3A" }} />
                        <Typography variant="caption" sx={{ color: "#A9CD3A" }}>
                          Address
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: "#FAF8F2" }}>
                        {settings.address}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "#1A1A18",
                        border: "1px solid #33342C",
                        borderRadius: 2,
                        p: 3,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <AccessTimeIcon sx={{ color: "#A9CD3A" }} />
                        <Typography variant="caption" sx={{ color: "#A9CD3A" }}>
                          Opening Hours
                        </Typography>
                      </Box>
                      {settings.openingHours.map((h: { day: string; open: string; close: string; closed: boolean }) => (
                        <Box key={h.day} sx={{ display: "flex", justifyContent: "space-between", gap: 1, py: 0.5 }}>
                          <Typography variant="body2" sx={{ color: "#B8B6A9", fontSize: { xs: 13, md: 14 }, flexShrink: 0 }}>
                            {h.day}
                          </Typography>
                          <Typography variant="body2" sx={{ color: h.closed ? "#E24B4A" : "#B8B6A9", fontSize: { xs: 13, md: 14 }, textAlign: "right" }}>
                            {h.closed ? "Closed" : `${h.open} - ${h.close}`}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "#1A1A18",
                        border: "1px solid #33342C",
                        borderRadius: 2,
                        p: 3,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#A9CD3A", mb: 2, display: "block" }}>
                        Contact & Social
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {settings.phone && (
                          <Link
                            href={`tel:${settings.phone}`}
                            sx={{ display: "flex", alignItems: "center", gap: 1, color: "#FAF8F2", "&:hover": { color: "#A9CD3A" } }}
                          >
                            <PhoneIcon sx={{ fontSize: 20 }} />
                            <Typography variant="body2">{settings.phone}</Typography>
                          </Link>
                        )}
                        {settings.whatsapp && (
                          <Link
                            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            sx={{ display: "flex", alignItems: "center", gap: 1, color: "#FAF8F2", "&:hover": { color: "#A9CD3A" } }}
                          >
                            <WhatsAppIcon sx={{ fontSize: 20 }} />
                            <Typography variant="body2">WhatsApp</Typography>
                          </Link>
                        )}
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          {settings.facebook && (
                            <IconButton
                              component="a"
                              href={settings.facebook}
                              target="_blank"
                              sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}
                            >
                              <FacebookIcon />
                            </IconButton>
                          )}
                          {settings.instagram && (
                            <IconButton
                              component="a"
                              href={settings.instagram}
                              target="_blank"
                              sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}
                            >
                              <InstagramIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                  <MapEmbed googleMapsUrl={settings.googleMaps} />
                </Grid>
              </Grid>
            )}

            {!settings && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="body2" sx={{ color: "#5C5D51" }}>
                  Contact information not available.
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

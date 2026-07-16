import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type { OpeningHour } from "@/types";
import { DEFAULT_RESTAURANT_NAME } from "@/lib/constants";

interface FooterProps {
  restaurantName?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  openingHours?: OpeningHour[];
}

export function Footer({
  restaurantName,
  address,
  phone,
  whatsapp,
  facebook,
  instagram,
  openingHours,
}: FooterProps) {
  const name = restaurantName || DEFAULT_RESTAURANT_NAME;
  const hours = openingHours || [];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = hours.find((h) => h.day === today);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#060605",
        borderTop: "1px solid #33342C",
        py: { xs: 4, md: 6 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Anton, sans-serif",
                fontSize: 24,
                color: "#A9CD3A",
                mb: 2,
              }}
            >
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#B8B6A9", mb: 2 }}>
              Premium craft burgers made with passion.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {facebook && (
                <IconButton
                  component="a"
                  href={facebook}
                  target="_blank"
                  size="small"
                  sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}
                >
                  <FacebookIcon />
                </IconButton>
              )}
              {instagram && (
                <IconButton
                  component="a"
                  href={instagram}
                  target="_blank"
                  size="small"
                  sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}
                >
                  <InstagramIcon />
                </IconButton>
              )}
              {phone && (
                <IconButton
                  component="a"
                  href={`tel:${phone}`}
                  size="small"
                  sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}
                >
                  <PhoneIcon />
                </IconButton>
              )}
              {whatsapp && (
                <IconButton
                  component="a"
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  size="small"
                  sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}
                >
                  <WhatsAppIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="caption" sx={{ color: "#A9CD3A", mb: 2, display: "block" }}>
              Location
            </Typography>
            <Typography variant="body2" sx={{ color: "#B8B6A9" }}>
              {address || "Location coming soon."}
            </Typography>
            {phone && (
              <Typography variant="body2" sx={{ color: "#B8B6A9", mt: 1 }}>
                <Link href={`tel:${phone}`} sx={{ color: "#B8B6A9", "&:hover": { color: "#A9CD3A" } }}>
                  {phone}
                </Link>
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="caption" sx={{ color: "#A9CD3A", mb: 2, display: "block" }}>
              Opening Hours
            </Typography>
            {hours.length > 0 ? (
              hours.map((h) => (
                <Box
                  key={h.day}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: h.day === today ? "#A9CD3A" : "#B8B6A9",
                      fontWeight: h.day === today ? 600 : 400,
                    }}
                  >
                    {h.day}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: h.closed ? "#E24B4A" : "#B8B6A9" }}
                  >
                    {h.closed ? "Closed" : `${h.open} - ${h.close}`}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#5C5D51" }}>
                Hours not set yet.
              </Typography>
            )}
            {todayHours && !todayHours.closed && (
              <Typography
                variant="caption"
                sx={{ color: "#A9CD3A", mt: 1, display: "block" }}
              >
                Open now until {todayHours.close}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          sx={{ color: "#5C5D51", display: "block", textAlign: "center", mt: 4, pt: 3, borderTop: "1px solid #33342C" }}
        >
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

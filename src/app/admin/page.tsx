import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import UpdateIcon from "@mui/icons-material/Update";
import { prisma } from "@/lib/db";
import { formatDate } from "@/utils/format";

export default async function AdminDashboard() {
  const [totalMenuItems, totalOffers, latestSettings, latestMenuItem, latestOffer] = await Promise.all([
    prisma.menuItem.count(),
    prisma.offer.count({ where: { active: true } }),
    prisma.restaurantSetting.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.menuItem.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.offer.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);

  const dates = [
    latestSettings?.updatedAt,
    latestMenuItem?.updatedAt,
    latestOffer?.updatedAt,
  ].filter(Boolean) as Date[];

  const latestDate = dates.length > 0
    ? new Date(Math.max(...dates.map((d) => d.getTime())))
    : null;

  const stats = [
    {
      label: "Menu Items",
      value: totalMenuItems,
      icon: <RestaurantMenuIcon sx={{ fontSize: 32, color: "#A9CD3A" }} />,
    },
    {
      label: "Active Offers",
      value: totalOffers,
      icon: <LocalOfferIcon sx={{ fontSize: 32, color: "#D9A441" }} />,
    },
    {
      label: "Last Update",
      value: latestDate ? formatDate(latestDate) : "N/A",
      icon: <UpdateIcon sx={{ fontSize: 32, color: "#B8B6A9" }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Anton, sans-serif",
          fontSize: { xs: 24, md: 32 },
          color: "#FAF8F2",
          mb: 3,
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}>
                {stat.icon}
                <Box>
                  <Typography variant="caption" sx={{ color: "#B8B6A9" }}>
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: "Anton, sans-serif",
                      fontSize: 28,
                      color: "#FAF8F2",
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

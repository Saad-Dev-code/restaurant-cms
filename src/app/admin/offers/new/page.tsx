import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { prisma } from "@/lib/db";
import { OfferForm } from "@/components/admin/OfferForm";

export default async function NewOfferPage() {
  const menuItems = await prisma.menuItem.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, price: true },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2", mb: 3 }}
      >
        New Offer
      </Typography>
      <OfferForm menuItems={menuItems} />
    </Container>
  );
}

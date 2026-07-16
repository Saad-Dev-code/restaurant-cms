import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { prisma } from "@/lib/db";
import { AdminOffersClient } from "@/components/admin/AdminOffersClient";

export default async function AdminOffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminOffersClient offers={offers} />
    </Container>
  );
}

import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { prisma } from "@/lib/db";
import { OfferForm } from "@/components/admin/OfferForm";

export default async function EditOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [offer, menuItems] = await Promise.all([
    prisma.offer.findUnique({
      where: { id },
      include: { offerItems: true },
    }),
    prisma.menuItem.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, price: true } }),
  ]);

  if (!offer) notFound();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2", mb: 3 }}
      >
        Edit Offer
      </Typography>
      <OfferForm
        menuItems={menuItems}
        offer={{
          id: offer.id,
          title: offer.title,
          description: offer.description,
          active: offer.active,
          startDate: offer.startDate,
          endDate: offer.endDate,
          image: offer.image,
          offerItems: offer.offerItems.map((oi) => ({
            itemId: oi.itemId,
            offerPrice: oi.offerPrice,
          })),
        }}
      />
    </Container>
  );
}

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { prisma } from "@/lib/db";
import { AdminMenuClient } from "@/components/admin/AdminMenuClient";

export default async function AdminMenuPage() {
  const [categories, items] = await Promise.all([
    prisma.menuCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: { _count: { select: { items: true } } },
    }),
    prisma.menuItem.findMany({
      orderBy: { name: "asc" },
      include: { category: true },
    }),
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminMenuClient categories={categories} items={items} />
    </Container>
  );
}

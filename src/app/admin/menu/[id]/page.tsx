import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { prisma } from "@/lib/db";
import { MenuItemForm } from "@/components/admin/MenuItemForm";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    prisma.menuItem.findUnique({ where: { id } }),
    prisma.menuCategory.findMany({ orderBy: { displayOrder: "asc" } }),
  ]);

  if (!item) notFound();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2", mb: 3 }}
      >
        Edit Menu Item
      </Typography>
      <MenuItemForm categories={categories} item={item} />
    </Container>
  );
}

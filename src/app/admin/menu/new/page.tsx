import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { prisma } from "@/lib/db";
import { MenuItemForm } from "@/components/admin/MenuItemForm";

export default async function NewMenuItemPage() {
  const categories = await prisma.menuCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2", mb: 3 }}
      >
        New Menu Item
      </Typography>
      <MenuItemForm categories={categories} />
    </Container>
  );
}

import { prisma } from "@/lib/db";
import type { MenuCategoryWithItems, MenuItemWithCategory } from "@/types";

export async function getMenuCategories(): Promise<MenuCategoryWithItems[]> {
  const categories = await prisma.menuCategory.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      items: {
        orderBy: { name: "asc" },
      },
    },
  });
  return categories;
}

export async function getFeaturedItems(): Promise<MenuItemWithCategory[]> {
  const items = await prisma.menuItem.findMany({
    where: { featured: true, available: true },
    include: { category: true },
    take: 6,
  });
  return items;
}

export async function getMenuItem(
  id: string
): Promise<MenuItemWithCategory | null> {
  const item = await prisma.menuItem.findUnique({
    where: { id },
    include: { category: true },
  });
  return item;
}

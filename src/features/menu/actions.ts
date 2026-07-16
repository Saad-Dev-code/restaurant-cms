"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { storage } from "@/lib/storage";
import { validateImageFile, validateString } from "@/lib/validation";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const nameError = validateString(name, "Name", { required: true, maxLength: 100 });
  if (nameError) return { error: nameError };

  const trimmed = name.trim();
  const existing = await prisma.menuCategory.findFirst({
    where: { name: { equals: trimmed } },
  });
  if (existing) return { error: `Category "${trimmed}" already exists.` };

  const maxOrder = await prisma.menuCategory.aggregate({ _max: { displayOrder: true } });
  await prisma.menuCategory.create({
    data: { name: trimmed, displayOrder: (maxOrder._max.displayOrder ?? 0) + 1 },
  });

  revalidatePath("/admin/menu");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const nameError = validateString(name, "Name", { required: true, maxLength: 100 });
  if (nameError) return { error: nameError };

  await prisma.menuCategory.update({
    where: { id },
    data: { name: name.trim() },
  });

  revalidatePath("/admin/menu");
}

export async function deleteCategory(id: string) {
  await prisma.menuCategory.delete({ where: { id } });
  revalidatePath("/admin/menu");
}

export async function reorderCategories(items: { id: string; displayOrder: number }[]) {
  for (const item of items) {
    await prisma.menuCategory.update({
      where: { id: item.id },
      data: { displayOrder: item.displayOrder },
    });
  }
  revalidatePath("/admin/menu");
}

export async function createMenuItem(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceStr = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const available = formData.get("available") === "on";
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  const nameError = validateString(name, "Name", { required: true, maxLength: 100 });
  if (nameError) return { error: nameError };

  const descError = validateString(description, "Description", { required: false, maxLength: 500 });
  if (descError) return { error: descError };

  if (!categoryId) return { error: "Category is required." };

  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) return { error: "Price must be greater than 0." };

  const imgError = validateImageFile(imageFile, 5 * 1024 * 1024);
  if (imgError) return { error: imgError };

  let image = "";
  if (imageFile?.size > 0) {
    image = await storage.upload(imageFile, "menu");
  }

  await prisma.menuItem.create({
    data: { name, description, price, image, categoryId, available, featured },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateMenuItem(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceStr = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const available = formData.get("available") === "on";
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  const nameError = validateString(name, "Name", { required: true, maxLength: 100 });
  if (nameError) return { error: nameError };

  const descError = validateString(description, "Description", { required: false, maxLength: 500 });
  if (descError) return { error: descError };

  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) return { error: "Price must be greater than 0." };

  const imgError = validateImageFile(imageFile, 5 * 1024 * 1024);
  if (imgError) return { error: imgError };

  const data: Record<string, unknown> = { name, description, price, categoryId, available, featured };

  if (imageFile?.size > 0) {
    data.image = await storage.upload(imageFile, "menu");
  }

  await prisma.menuItem.update({ where: { id }, data });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteMenuItem(id: string) {
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (item?.image) {
    await storage.delete(item.image);
  }
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

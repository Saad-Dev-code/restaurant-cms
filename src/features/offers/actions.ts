"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { storage } from "@/lib/storage";
import { validateImageFile, validateString } from "@/lib/validation";

export async function createOffer(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const active = formData.get("active") === "on";
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const imageFile = formData.get("image") as File;
  const itemIds = formData.getAll("itemIds") as string[];
  const offerPrices = formData.getAll("offerPrices") as string[];

  const titleError = validateString(title, "Title", { required: true, maxLength: 100 });
  if (titleError) return { error: titleError };

  const descError = validateString(description, "Description", { required: false, maxLength: 500 });
  if (descError) return { error: descError };

  if (!startDateStr || !endDateStr) return { error: "Start and end dates are required." };

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (endDate <= startDate) return { error: "End date must be after start date." };

  if (itemIds.length === 0) return { error: "Select at least one menu item." };

  const imgError = validateImageFile(imageFile, 5 * 1024 * 1024);
  if (imgError) return { error: imgError };

  let image = "";
  if (imageFile?.size > 0) {
    image = await storage.upload(imageFile, "offers");
  }

  await prisma.offer.create({
    data: {
      title,
      description,
      image,
      active,
      startDate,
      endDate,
      offerItems: {
        create: itemIds.map((itemId, i) => ({
          itemId,
          offerPrice: parseFloat(offerPrices[i] ?? "0"),
        })),
      },
    },
  });

  revalidatePath("/admin/offers");
  revalidatePath("/offers");
}

export async function updateOffer(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const active = formData.get("active") === "on";
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const imageFile = formData.get("image") as File;
  const itemIds = formData.getAll("itemIds") as string[];
  const offerPrices = formData.getAll("offerPrices") as string[];

  const titleError = validateString(title, "Title", { required: true, maxLength: 100 });
  if (titleError) return { error: titleError };

  const descError = validateString(description, "Description", { required: false, maxLength: 500 });
  if (descError) return { error: descError };

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (endDate <= startDate) return { error: "End date must be after start date." };

  if (itemIds.length === 0) return { error: "Select at least one menu item." };

  const imgError = validateImageFile(imageFile, 5 * 1024 * 1024);
  if (imgError) return { error: imgError };

  await prisma.offerItem.deleteMany({ where: { offerId: id } });

  const data: Record<string, unknown> = {
    title,
    description,
    active,
    startDate,
    endDate,
    offerItems: {
      create: itemIds.map((itemId, i) => ({
        itemId,
        offerPrice: parseFloat(offerPrices[i] ?? "0"),
      })),
    },
  };

  if (imageFile?.size > 0) {
    data.image = await storage.upload(imageFile, "offers");
  }

  await prisma.offer.update({ where: { id }, data });

  revalidatePath("/admin/offers");
  revalidatePath("/offers");
}

export async function deleteOffer(id: string) {
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (offer?.image) {
    await storage.delete(offer.image);
  }
  await prisma.offer.delete({ where: { id } });
  revalidatePath("/admin/offers");
  revalidatePath("/offers");
}

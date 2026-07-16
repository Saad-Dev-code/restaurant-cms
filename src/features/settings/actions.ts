"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { storage } from "@/lib/storage";
import type { OpeningHour } from "@/types";
import { validateImageFile, validateString } from "@/lib/validation";

export async function updateSettings(formData: FormData) {
  const restaurantName = formData.get("restaurantName") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const facebook = formData.get("facebook") as string;
  const instagram = formData.get("instagram") as string;
  const googleMaps = formData.get("googleMaps") as string;
  const logoFile = formData.get("logo") as File;

  const nameError = validateString(restaurantName, "Restaurant name", { required: true, maxLength: 100 });
  if (nameError) return { error: nameError };

  const phoneError = validateString(phone, "Phone", { required: false, maxLength: 30 });
  if (phoneError) return { error: phoneError };

  const whatsappError = validateString(whatsapp, "WhatsApp", { required: false, maxLength: 30 });
  if (whatsappError) return { error: whatsappError };

  const imgError = validateImageFile(logoFile, 2 * 1024 * 1024);
  if (imgError) return { error: imgError };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const openingHours: OpeningHour[] = days.map((day) => ({
    day,
    open: (formData.get(`${day}_open`) as string) || "09:00",
    close: (formData.get(`${day}_close`) as string) || "22:00",
    closed: formData.get(`${day}_closed`) === "on",
  }));

  const data: Record<string, unknown> = {
    restaurantName,
    address,
    phone,
    whatsapp,
    facebook,
    instagram,
    googleMaps,
    openingHours: JSON.stringify(openingHours),
  };

  if (logoFile?.size > 0) {
    data.logo = await storage.upload(logoFile, "logo");
  }

  const existing = await prisma.restaurantSetting.findFirst();
  if (existing) {
    await prisma.restaurantSetting.update({ where: { id: existing.id }, data });
  } else {
    await prisma.restaurantSetting.create({ data: data as Parameters<typeof prisma.restaurantSetting.create>[0]["data"] });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/contact");
}

export async function getSettingsForAdmin() {
  const settings = await prisma.restaurantSetting.findFirst();
  if (!settings) return null;
  return {
    ...settings,
    openingHours: JSON.parse(settings.openingHours) as OpeningHour[],
  };
}

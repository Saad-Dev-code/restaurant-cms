import { cache } from "react";
import { prisma } from "@/lib/db";
import type { OpeningHour } from "@/types";

export const getRestaurantSettings = cache(async () => {
  const settings = await prisma.restaurantSetting.findFirst();
  if (!settings) return null;
  return {
    ...settings,
    openingHours: JSON.parse(settings.openingHours) as OpeningHour[],
  };
});

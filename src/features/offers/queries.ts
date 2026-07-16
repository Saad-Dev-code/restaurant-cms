import { prisma } from "@/lib/db";
import type { OfferWithStatus } from "@/types";

export async function getActiveOffers(): Promise<OfferWithStatus[]> {
  const now = new Date();
  const offers = await prisma.offer.findMany({
    where: {
      active: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
    orderBy: { startDate: "desc" },
    include: {
      offerItems: {
        include: { item: { select: { id: true, name: true, price: true, image: true } } },
      },
    },
  });
  return offers as unknown as OfferWithStatus[];
}

export async function getAllOffers(): Promise<OfferWithStatus[]> {
  const offers = await prisma.offer.findMany({
    orderBy: { startDate: "desc" },
    include: {
      offerItems: {
        include: { item: { select: { id: true, name: true, price: true, image: true } } },
      },
    },
  });
  return offers as unknown as OfferWithStatus[];
}

export function formatPrice(price: number): string {
  return `${price.toFixed(2)} MAD`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isOfferActive(
  active: boolean,
  startDate: Date | string,
  endDate: Date | string
): boolean {
  if (!active) return false;
  const now = new Date();
  return now >= new Date(startDate) && now <= new Date(endDate);
}

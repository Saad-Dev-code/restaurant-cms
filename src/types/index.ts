export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  featured: boolean;
  categoryId: string;
}

export interface MenuItemWithCategory extends MenuItemData {
  category: { id: string; name: string; displayOrder: number };
}

export interface MenuCategoryWithItems {
  id: string;
  name: string;
  displayOrder: number;
  items: MenuItemData[];
}

export interface OfferItemData {
  id: string;
  itemId: string;
  offerPrice: number;
  item: { id: string; name: string; price: number; image: string };
}

export interface OfferWithStatus {
  id: string;
  title: string;
  description: string;
  image: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  offerItems: OfferItemData[];
}

export interface DashboardStats {
  totalMenuItems: number;
  activeOffers: number;
  lastUpdate: Date | null;
}

export interface PrismaMenuItemWithCategory {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  featured: boolean;
  categoryId: string;
  category: { id: string; name: string; displayOrder: number };
}

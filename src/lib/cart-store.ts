import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OfferBundleItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  offerTitle?: string;
  offerBundle?: {
    offerTitle: string;
    items: OfferBundleItem[];
  };
}

function matchItem(a: { id: string; offerTitle?: string }, b: { id: string; offerTitle?: string }) {
  return a.id === b.id && a.offerTitle === b.offerTitle;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, offerTitle?: string) => void;
  updateQuantity: (id: string, quantity: number, offerTitle?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => matchItem(i, item));
        if (existing) {
          set({
            items: items.map((i) =>
              matchItem(i, item) ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id, offerTitle?) => {
        set({ items: get().items.filter((i) => !(i.id === id && i.offerTitle === offerTitle)) });
      },

      updateQuantity: (id, quantity, offerTitle?) => {
        if (quantity <= 0) {
          get().removeItem(id, offerTitle);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id && i.offerTitle === offerTitle ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

"use client";

import Button from "@mui/material/Button";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItemData } from "@/types";

interface AddToCartButtonProps {
  item: MenuItemData;
  offerPrice?: number;
}

export function AddToCartButton({ item, offerPrice }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!item.available) {
    return (
      <Button variant="outlined" color="primary" size="small" disabled sx={{ width: "auto", px: 1.5, fontSize: 12, whiteSpace: "nowrap" }}>
        Unavailable
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{ width: "auto", px: 1.5, fontSize: 12, whiteSpace: "nowrap" }}
      onClick={() => {
        addItem({
          id: item.id,
          name: item.name,
          price: offerPrice ?? item.price,
          originalPrice: item.price,
          image: item.image,
        });
        openCart();
      }}
    >
      Add to Order
    </Button>
  );
}

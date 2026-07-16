"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { CartDrawer } from "@/components/public/CartDrawer";
import { useCartStore } from "@/lib/cart-store";

interface CartProviderProps {
  whatsappNumber?: string;
}

export function CartProvider({ whatsappNumber }: CartProviderProps) {
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const itemCount = mounted ? totalItems() : 0;

  return (
    <>
      <CartDrawer whatsappNumber={whatsappNumber} />
      <Fab
        color="primary"
        onClick={openCart}
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1200,
          backgroundColor: "#A9CD3A",
          color: "#0D0D0D",
          "&:hover": { backgroundColor: "#8CB32E" },
        }}
      >
        <Badge
          badgeContent={itemCount}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#D85A30",
              color: "#FAF8F2",
            },
          }}
        >
          <ShoppingBagIcon />
        </Badge>
      </Fab>
    </>
  );
}

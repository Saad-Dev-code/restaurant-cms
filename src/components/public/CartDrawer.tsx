"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCartStore, type CartItem } from "@/lib/cart-store";
import { formatPrice } from "@/utils/format";

interface CartDrawerProps {
  whatsappNumber?: string;
}

interface OfferGroup {
  offerTitle: string;
  items: CartItem[];
}

interface SingleEntry {
  type: "single";
  item: CartItem;
}

interface OfferEntry {
  type: "offer";
  group: OfferGroup;
}

type GroupedEntry = SingleEntry | OfferEntry;

function groupCartItems(items: CartItem[]): GroupedEntry[] {
  const offerMap = new Map<string, CartItem[]>();
  const singles: CartItem[] = [];

  for (const item of items) {
    if (item.offerTitle) {
      const group = offerMap.get(item.offerTitle);
      if (group) {
        group.push(item);
      } else {
        offerMap.set(item.offerTitle, [item]);
      }
    } else {
      singles.push(item);
    }
  }

  const result: GroupedEntry[] = [];
  for (const item of singles) {
    result.push({ type: "single", item });
  }
  for (const [offerTitle, groupItems] of offerMap) {
    result.push({ type: "offer", group: { offerTitle, items: groupItems } });
  }
  return result;
}

export function CartDrawer({ whatsappNumber }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();

  const grouped = useMemo(() => groupCartItems(items), [items]);

  function handlePlaceOrder() {
    if (items.length === 0 || !whatsappNumber) return;

    const lines = [];
    lines.push("Order:");
    items.forEach((item) => {
      lines.push(`${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`);
    });
    lines.push(`\nTotal: ${formatPrice(totalPrice())}`);

    const message = encodeURIComponent(lines.join("\n"));
    const num = whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${num}?text=${message}`, "_blank");
    closeCart();
  }

  function renderBundleRow(item: CartItem) {
    const bundle = item.offerBundle!;
    const hasDiscount = item.originalPrice > item.price;
    return (
      <Box
        key={item.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1.5,
          borderRadius: 1,
          backgroundColor: "#1A1A18",
          border: "1px solid #33342C",
          borderLeft: "3px solid #A9CD3A",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
            />
          )}
          <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 700 }}>
            {item.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 0.5 }}>
          {bundle.items.map((bi) => (
            <Box key={bi.id} sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
              {bi.image && (
                <img
                  src={bi.image}
                  alt={bi.name}
                  style={{ width: 36, height: 36, borderRadius: 4, objectFit: "cover", flexShrink: 0 }}
                />
              )}
              <Typography variant="caption" sx={{ color: "#B8B6A9", flexGrow: 1, minWidth: 0 }}>
                {bi.name}
              </Typography>
              <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#A9CD3A" }}>
                {formatPrice(bi.price)}
              </Typography>
              {bi.originalPrice > bi.price && (
                <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#5C5D51", textDecoration: "line-through" }}>
                  {formatPrice(bi.originalPrice)}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700, color: "#A9CD3A" }}>
              {formatPrice(item.price)}
            </Typography>
            {hasDiscount && (
              <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#5C5D51", textDecoration: "line-through" }}>
                {formatPrice(item.originalPrice)}
              </Typography>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: "#B8B6A9" }}>
            per bundle
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}
            sx={{ color: "#B8B6A9", backgroundColor: "#131311", borderRadius: 1, p: 0.5 }}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ color: "#FAF8F2", minWidth: 24, textAlign: "center", fontWeight: 600 }}>
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}
            sx={{ color: "#B8B6A9", backgroundColor: "#131311", borderRadius: 1, p: 0.5 }}>
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => removeItem(item.id)} sx={{ color: "#5C5D51", ml: 1 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    );
  }

  function renderItemRow(item: CartItem, isOfferItem: boolean) {
    const hasDiscount = item.originalPrice > item.price;
    return (
      <Box
        key={`${item.id}::${item.offerTitle ?? ""}`}
        sx={{
          display: "flex",
          gap: 1.5,
          p: 1.5,
          borderRadius: 1,
          backgroundColor: "#1A1A18",
          border: "1px solid #33342C",
          borderLeft: isOfferItem ? "3px solid #A9CD3A" : "1px solid #33342C",
        }}
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        )}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 600, mb: 0.5 }}>
            {item.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
            <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700, color: "#A9CD3A" }}>
              {formatPrice(item.price)}
            </Typography>
            {hasDiscount && (
              <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#5C5D51", textDecoration: "line-through" }}>
                {formatPrice(item.originalPrice)}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1, item.offerTitle)}
              sx={{ color: "#B8B6A9", backgroundColor: "#131311", borderRadius: 1, p: 0.5 }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ color: "#FAF8F2", minWidth: 24, textAlign: "center", fontWeight: 600 }}>
              {item.quantity}
            </Typography>
            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1, item.offerTitle)}
              sx={{ color: "#B8B6A9", backgroundColor: "#131311", borderRadius: 1, p: 0.5 }}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => removeItem(item.id, item.offerTitle)} sx={{ color: "#5C5D51", ml: 1 }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      sx={{ "& .MuiDrawer-paper": { width: { xs: "100%", sm: 380 }, borderLeft: "1px solid #33342C" } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2.5, borderBottom: "1px solid #33342C" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingBagIcon sx={{ color: "#A9CD3A" }} />
            <Typography variant="h3" sx={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "#FAF8F2" }}>
              Your Order
            </Typography>
            <Typography variant="caption" sx={{ color: "#B8B6A9" }}>({totalItems()})</Typography>
          </Box>
          <IconButton onClick={closeCart} sx={{ color: "#B8B6A9" }}><CloseIcon /></IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="body2" sx={{ color: "#5C5D51" }}>Your cart is empty</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {grouped.map((entry) => {
                if (entry.type === "single") {
                  if (entry.item.offerBundle) {
                    return renderBundleRow(entry.item);
                  }
                  return renderItemRow(entry.item, false);
                }
                const groupTotal = entry.group.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
                return (
                  <Box key={entry.group.offerTitle} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 0.5 }}>
                      <ShoppingBagIcon sx={{ color: "#D9A441", fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#D9A441", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {entry.group.offerTitle}
                      </Typography>
                    </Box>
                    {entry.group.items.map((item) => renderItemRow(item, true))}
                    <Typography variant="caption" sx={{ color: "#B8B6A9", textAlign: "right", px: 0.5 }}>
                      Offer total: {formatPrice(groupTotal)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box sx={{ p: 2.5, borderTop: "1px solid #33342C", backgroundColor: "#2D2D28" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body1" sx={{ color: "#FAF8F2", fontWeight: 600 }}>Total</Typography>
            <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 700, color: "#A9CD3A" }}>
              {formatPrice(totalPrice())}
            </Typography>
          </Box>
          {whatsappNumber ? (
            <Button variant="contained" color="primary" fullWidth size="large" disabled={items.length === 0} onClick={handlePlaceOrder}>
              Order via WhatsApp
            </Button>
          ) : (
            <Button variant="contained" color="primary" fullWidth size="large" disabled>
              Online ordering coming soon.
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

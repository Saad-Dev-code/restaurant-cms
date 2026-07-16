"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import type { OfferWithStatus } from "@/types";
import { formatDate, formatPrice } from "@/utils/format";
import { useCartStore } from "@/lib/cart-store";

interface OfferDetailDialogProps {
  offer: OfferWithStatus | null;
  open: boolean;
  onClose: () => void;
}

export function OfferDetailDialog({ offer, open, onClose }: OfferDetailDialogProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!offer) return null;
  const currentOffer = offer;

  function handleGetOffer() {
    const totalPrice = currentOffer.offerItems.reduce((sum, oi) => sum + oi.offerPrice, 0);
    const originalTotal = currentOffer.offerItems.reduce((sum, oi) => sum + oi.item.price, 0);
    addItem({
      id: `offer-bundle-${currentOffer.id}`,
      name: currentOffer.title,
      price: totalPrice,
      originalPrice: originalTotal,
      image: currentOffer.image,
      offerBundle: {
        offerTitle: currentOffer.title,
        items: currentOffer.offerItems.map((oi) => ({
          id: oi.item.id,
          name: oi.item.name,
          price: oi.offerPrice,
          originalPrice: oi.item.price,
          image: oi.item.image,
        })),
      },
    });
    openCart();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ backgroundColor: "#0D0D0D", color: "#FAF8F2", position: "relative" }}>
        {offer.image && (
          <Box
            component="img"
            src={offer.image}
            alt={offer.title}
            sx={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
          />
        )}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#FAF8F2", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h2" sx={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: "#FAF8F2" }}>
            {offer.title}
          </Typography>
          {offer.description && (
            <Typography variant="body1" sx={{ color: "#B8B6A9" }}>
              {offer.description}
            </Typography>
          )}
          {offer.endDate && (
            <Typography variant="caption" sx={{ color: "#D85A30", display: "block" }}>
              Valid until {formatDate(offer.endDate)}
            </Typography>
          )}

          <Typography variant="caption" sx={{ color: "#A9CD3A", mt: 1 }}>
            Included Items
          </Typography>
          <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {offer.offerItems.map((oi) => (
              <ListItem
                key={oi.id}
                disablePadding
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: "#1A1A18",
                  border: "1px solid #33342C",
                }}
              >
                {oi.item.image && (
                  <Box
                    component="img"
                    src={oi.item.image}
                    alt={oi.item.name}
                    sx={{ width: 48, height: 48, borderRadius: 1, objectFit: "cover", flexShrink: 0 }}
                  />
                )}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 600 }}>
                    {oi.item.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700, color: "#A9CD3A" }}>
                      {formatPrice(oi.offerPrice)}
                    </Typography>
                    <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#5C5D51", textDecoration: "line-through" }}>
                      {formatPrice(oi.item.price)}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>

          <Button variant="contained" color="primary" size="large" fullWidth onClick={handleGetOffer} sx={{ mt: 1 }}>
            Get Offer
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

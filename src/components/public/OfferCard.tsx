"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { OfferWithStatus } from "@/types";
import { formatDate } from "@/utils/format";
import { useCartStore } from "@/lib/cart-store";
import { OfferDetailDialog } from "@/components/public/OfferDetailDialog";

interface OfferCardProps {
  offer: OfferWithStatus;
}

export function OfferCard({ offer }: OfferCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleGetOffer(e: React.MouseEvent) {
    e.stopPropagation();
    const totalPrice = offer.offerItems.reduce((sum, oi) => sum + oi.offerPrice, 0);
    const originalTotal = offer.offerItems.reduce((sum, oi) => sum + oi.item.price, 0);
    addItem({
      id: `offer-bundle-${offer.id}`,
      name: offer.title,
      price: totalPrice,
      originalPrice: originalTotal,
      image: offer.image,
      offerBundle: {
        offerTitle: offer.title,
        items: offer.offerItems.map((oi) => ({
          id: oi.item.id,
          name: oi.item.name,
          price: oi.offerPrice,
          originalPrice: oi.item.price,
          image: oi.item.image,
        })),
      },
    });
    openCart();
  }

  return (
    <>
      <Card
        onClick={() => setDialogOpen(true)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.2s, transform 0.2s",
          cursor: "pointer",
          "&:hover": { borderColor: "#5C5D51", transform: "translateY(-2px)" },
        }}
      >
        {offer.image && (
          <CardMedia
            component="img"
            height="200"
            image={offer.image}
            alt={offer.title}
            sx={{ objectFit: "cover" }}
            loading="lazy"
          />
        )}
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5, p: 2 }}>
          <Typography variant="h3" sx={{ fontFamily: "Anton, sans-serif", fontSize: 22, color: "#FAF8F2" }}>
            {offer.title}
          </Typography>
          {offer.description && (
            <Typography variant="body2" sx={{ color: "#B8B6A9", flexGrow: 1 }}>
              {offer.description}
            </Typography>
          )}
          {offer.endDate && (
            <Typography variant="caption" sx={{ color: "#D85A30" }}>
              Valid until {formatDate(offer.endDate)}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ alignSelf: "flex-start", mt: 1 }}
            onClick={handleGetOffer}
            disabled={offer.offerItems.length === 0}
          >
            Get Offer
          </Button>
        </CardContent>
      </Card>
      <OfferDetailDialog offer={offer} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}

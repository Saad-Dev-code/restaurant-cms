"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import type { MenuItemData, MenuItemWithCategory } from "@/types";
import { formatPrice } from "@/utils/format";
import { AddToCartButton } from "@/components/public/AddToCartButton";
import { ItemDetailDialog } from "@/components/public/ItemDetailDialog";

type MenuCardItem = MenuItemData | MenuItemWithCategory;

interface MenuCardProps {
  item: MenuCardItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
          "&:hover": {
            borderColor: "#5C5D51",
            transform: "translateY(-2px)",
          },
        }}
      >
        {item.image && (
          <CardMedia
            component="img"
            height="180"
            image={item.image}
            alt={item.name}
            sx={{ objectFit: "cover" }}
            loading="lazy"
          />
        )}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Anton, sans-serif",
                fontSize: 20,
                lineHeight: 1.2,
                color: "#FAF8F2",
              }}
            >
              {item.name}
            </Typography>
            {item.featured && (
              <Chip
                label="Chef's Pick"
                size="small"
                sx={{
                  backgroundColor: "#8A6420",
                  color: "#FBEBCE",
                  fontSize: 10,
                  height: 22,
                }}
              />
            )}
          </Box>

          {item.description && (
            <Typography variant="body2" sx={{ color: "#B8B6A9", flexGrow: 1 }}>
              {item.description}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, mt: "auto" }}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#A9CD3A",
              }}
            >
              {formatPrice(item.price)}
            </Typography>
            <Box onClick={(e) => e.stopPropagation()}>
              <AddToCartButton item={item} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ItemDetailDialog item={item} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}

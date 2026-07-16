"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import type { MenuItemData, MenuItemWithCategory } from "@/types";
import { formatPrice } from "@/utils/format";
import { AddToCartButton } from "@/components/public/AddToCartButton";

type MenuCardItem = MenuItemData | MenuItemWithCategory;

interface ItemDetailDialogProps {
  item: MenuCardItem | null;
  open: boolean;
  onClose: () => void;
}

export function ItemDetailDialog({ item, open, onClose }: ItemDetailDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ backgroundColor: "#0D0D0D", color: "#FAF8F2", position: "relative" }}>
        {item.image && (
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
          />
        )}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#FAF8F2", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Typography
              variant="h2"
              sx={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: "#FAF8F2" }}
            >
              {item.name}
            </Typography>
            {item.featured && (
              <Chip label="Chef's Pick" size="small" sx={{ backgroundColor: "#8A6420", color: "#FBEBCE", fontSize: 10, height: 22 }} />
            )}
          </Box>
          <Typography variant="body1" sx={{ color: "#B8B6A9" }}>
            {item.description || "No description available."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <Box>
              <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 700, color: "#A9CD3A" }}>
                {formatPrice(item.price)}
              </Typography>
              {!item.available && <Chip label="Unavailable" size="small" color="error" sx={{ mt: 1 }} />}
            </Box>
            <AddToCartButton item={item} />
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import type { MenuCategoryWithItems } from "@/types";

interface CategoryNavProps {
  categories: MenuCategoryWithItems[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {categories.map((cat) => (
        <Chip
          key={cat.id}
          label={cat.name}
          onClick={() => onCategoryChange(cat.id)}
          variant={activeCategory === cat.id ? "filled" : "outlined"}
          sx={{
            flexShrink: 0,
            px: 1,
            height: 36,
            backgroundColor:
              activeCategory === cat.id ? "#A9CD3A !important" : "transparent",
            color:
              activeCategory === cat.id ? "#0D0D0D" : "#B8B6A9",
            borderColor:
              activeCategory === cat.id ? "#A9CD3A" : "#33342C",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": {
              backgroundColor:
                activeCategory === cat.id ? "#A9CD3A" : "rgba(169, 205, 58, 0.08)",
              borderColor: "#A9CD3A",
            },
          }}
        />
      ))}
    </Box>
  );
}

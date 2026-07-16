"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CategoryNav } from "@/components/public/CategoryNav";
import { MenuCard } from "@/components/public/MenuCard";
import type { MenuCategoryWithItems } from "@/types";

interface MenuPageClientProps {
  categories: MenuCategoryWithItems[];
}

export function MenuPageClient({ categories }: MenuPageClientProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories.length > 0 ? categories[0].id : ""
  );

  const activeItems =
    categories.find((c) => c.id === activeCategory)?.items ?? [];

  if (categories.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="body2" sx={{ color: "#5C5D51" }}>
          No menu categories yet.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <Box sx={{ mt: 3 }}>
        {activeItems.length > 0 ? (
          <Grid container spacing={3}>
            {activeItems.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <MenuCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "#B8B6A9", textAlign: "center", py: 4 }}
          >
            No items in this category yet.
          </Typography>
        )}
      </Box>
    </>
  );
}

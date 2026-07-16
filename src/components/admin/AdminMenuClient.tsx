"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { CategoryList } from "@/components/admin/CategoryList";
import { MenuList } from "@/components/admin/MenuList";

interface Category {
  id: string;
  name: string;
  displayOrder: number;
  _count: { items: number };
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  featured: boolean;
  category: { name: string };
  image: string;
  description: string;
}

interface AdminMenuClientProps {
  categories: Category[];
  items: MenuItem[];
}

export function AdminMenuClient({ categories, items }: AdminMenuClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Typography
          variant="h2"
          sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2" }}
        >
          Menu Management
        </Typography>
        <Button onClick={() => router.push("/admin/menu/new")} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Item
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "#FAF8F2", mb: 2 }}>
          Categories
        </Typography>
        <CategoryList categories={categories} />
      </Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h3" sx={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "#FAF8F2" }}>
            Menu Items ({filteredItems.length})
          </Typography>
          <TextField
            size="small"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#5C5D51", fontSize: 20 }} /></InputAdornment>,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#1A1A18",
                color: "#FAF8F2",
                "& fieldset": { borderColor: "#33342C" },
                "&:hover fieldset": { borderColor: "#5C5D51" },
              },
              "& .MuiInputBase-input::placeholder": { color: "#5C5D51", opacity: 1 },
            }}
          />
        </Box>
        <MenuList items={filteredItems} />
      </Box>
    </>
  );
}

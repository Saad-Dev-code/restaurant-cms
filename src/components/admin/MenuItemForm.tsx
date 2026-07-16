"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { createMenuItem, updateMenuItem } from "@/features/menu/actions";

interface Category { id: string; name: string; }

interface MenuItemFormProps {
  categories: Category[];
  item?: {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    available: boolean;
    featured: boolean;
    image: string;
  };
}

export function MenuItemForm({ categories, item }: MenuItemFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(item?.image || "");
  const [dirty, setDirty] = useState(false);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setDirty(true);
    }
  }, []);

  useEffect(() => {
    return () => { if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
  }, [preview]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (dirty) { e.preventDefault(); }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setDirty(false);

    let result;
    if (item) {
      result = await updateMenuItem(item.id, formData);
    } else {
      result = await createMenuItem(formData);
    }

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/admin/menu");
      router.refresh();
    }
  }

  return (
    <Box
      component="form"
      action={handleSubmit}
      sx={{
        backgroundColor: "#1A1A18",
        border: "1px solid #33342C",
        borderRadius: 2,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        name="name"
        label="Item Name"
        defaultValue={item?.name}
        required
        fullWidth
        onChange={() => setDirty(true)}
      />

      <TextField
        name="description"
        label="Description"
        defaultValue={item?.description}
        multiline
        rows={3}
        fullWidth
        onChange={() => setDirty(true)}
      />

      <TextField
        name="price"
        label="Price"
        type="number"
        defaultValue={item?.price}
        required
        fullWidth
        slotProps={{ htmlInput: { step: "0.01", min: "0" } }}
        onChange={() => setDirty(true)}
      />

      <TextField
        name="categoryId"
        label="Category"
        select
        defaultValue={item?.categoryId ?? ""}
        required
        fullWidth
        onChange={() => setDirty(true)}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <FormControlLabel
          control={<Switch name="available" defaultChecked={item?.available ?? true} />}
          label="Available"
        />
        <FormControlLabel
          control={<Switch name="featured" defaultChecked={item?.featured ?? false} />}
          label="Featured"
        />
      </Box>

      <TextField
        name="image"
        type="file"
        fullWidth
        slotProps={{ htmlInput: { accept: "image/*" } }}
        helperText={item?.image ? "Leave empty to keep current image" : ""}
        onChange={handleImageChange}
      />

      {preview && (
        <Box component="img" src={preview} alt="Preview" sx={{ width: 200, height: 120, objectFit: "cover", borderRadius: 1 }} />
      )}

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => router.push("/admin/menu")}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : item ? "Update Item" : "Create Item"}
        </Button>
      </Box>
    </Box>
  );
}

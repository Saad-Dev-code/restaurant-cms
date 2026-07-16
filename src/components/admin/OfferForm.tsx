"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { createOffer, updateOffer } from "@/features/offers/actions";

interface MenuItemBrief {
  id: string;
  name: string;
  price: number;
}

interface OfferItemPrice {
  itemId: string;
  offerPrice: number;
}

interface OfferFormProps {
  menuItems: MenuItemBrief[];
  offer?: {
    id: string;
    title: string;
    description: string;
    active: boolean;
    startDate: Date;
    endDate: Date;
    image: string;
    offerItems: { itemId: string; offerPrice: number }[];
  };
}

export function OfferForm({ menuItems, offer }: OfferFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(offer?.image || "");
  const [dirty, setDirty] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    offer?.offerItems.map((oi) => oi.itemId) ?? []
  );
  const [prices, setPrices] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (offer) {
      for (const oi of offer.offerItems) {
        initial[oi.itemId] = oi.offerPrice.toString();
      }
    }
    return initial;
  });

  function formatDateForInput(date: Date) {
    return new Date(date).toISOString().split("T")[0];
  }

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

    for (const id of selectedIds) {
      formData.append("itemIds", id);
      formData.append("offerPrices", prices[id] || "0");
    }

    let result;
    if (offer) {
      result = await updateOffer(offer.id, formData);
    } else {
      result = await createOffer(formData);
    }

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/admin/offers");
      router.refresh();
    }
  }

  function handleSelectionChange(ids: string[]) {
    setSelectedIds(ids);
    setDirty(true);
    for (const id of ids) {
      if (!prices[id]) {
        const item = menuItems.find((m) => m.id === id);
        if (item) {
          setPrices((prev) => ({ ...prev, [id]: item.price.toString() }));
        }
      }
    }
  }

  function handlePriceChange(itemId: string, value: string) {
    setPrices((prev) => ({ ...prev, [itemId]: value }));
    setDirty(true);
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

      <TextField name="title" label="Offer Title" defaultValue={offer?.title} required fullWidth onChange={() => setDirty(true)} />

      <TextField
        name="description"
        label="Description"
        defaultValue={offer?.description}
        multiline
        rows={3}
        fullWidth
        onChange={() => setDirty(true)}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          name="startDate"
          label="Start Date"
          type="date"
          defaultValue={offer ? formatDateForInput(offer.startDate) : ""}
          required
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={() => setDirty(true)}
        />
        <TextField
          name="endDate"
          label="End Date"
          type="date"
          defaultValue={offer ? formatDateForInput(offer.endDate) : ""}
          required
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={() => setDirty(true)}
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel id="items-label" sx={{ color: "#B8B6A9" }}>Menu Items</InputLabel>
        <Select
          labelId="items-label"
          multiple
          value={selectedIds}
          onChange={(e) => handleSelectionChange(e.target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {menuItems
                .filter((m) => selected.includes(m.id))
                .map((m) => (
                  <Chip key={m.id} label={m.name} size="small" sx={{ backgroundColor: "#33342C", color: "#FAF8F2" }} />
                ))}
            </Box>
          )}
          MenuProps={{ slotProps: { paper: { sx: { maxHeight: 250 } } } }}
          sx={{ color: "#FAF8F2", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#33342C" } }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selectedIds.includes(item.id)} size="small" />
              <ListItemText primary={item.name} secondary={`${item.price.toFixed(2)} MAD`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedIds.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography variant="caption" sx={{ color: "#A9CD3A" }}>
            Offer Prices
          </Typography>
          {selectedIds.map((id) => {
            const item = menuItems.find((m) => m.id === id);
            if (!item) return null;
            return (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, md: 2 },
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: "#131311",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" sx={{ color: "#FAF8F2", minWidth: { xs: "auto", md: 180 }, fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#5C5D51", textDecoration: "line-through" }}>
                  {item.price.toFixed(2)} MAD
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={prices[id] ?? item.price}
                  onChange={(e) => handlePriceChange(id, e.target.value)}
                  slotProps={{ htmlInput: { step: "0.5", min: "0" } }}
                  sx={{ maxWidth: 120, "& .MuiOutlinedInput-root": { color: "#FAF8F2" } }}
                />
                <Typography variant="body2" sx={{ color: "#A9CD3A", fontWeight: 700 }}>
                  MAD
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}

      <FormControlLabel
        control={<Switch name="active" defaultChecked={offer?.active ?? true} />}
        label="Active"
      />

      <TextField
        name="image"
        type="file"
        fullWidth
        slotProps={{ htmlInput: { accept: "image/*" } }}
        helperText={offer?.image ? "Leave empty to keep current image" : ""}
        onChange={handleImageChange}
      />

      {preview && (
        <Box component="img" src={preview} alt="Preview" sx={{ width: 200, height: 120, objectFit: "cover", borderRadius: 1 }} />
      )}

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => router.push("/admin/offers")}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : offer ? "Update Offer" : "Create Offer"}
        </Button>
      </Box>
    </Box>
  );
}

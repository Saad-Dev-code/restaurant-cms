"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMenuItem } from "@/features/menu/actions";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { formatPrice } from "@/utils/format";

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

export function MenuList({ items }: { items: MenuItem[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState("");
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#5C5D51" }}>
        <p>No menu items yet. Click &quot;Add Item&quot; to create one.</p>
      </div>
    );
  }

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 600, color: "#FAF8F2" }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#5C5D51" }}>{item.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip label={item.category.name} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ fontFamily: "Inter", fontWeight: 700, color: "#A9CD3A" }}>
                  {formatPrice(item.price)}
                </TableCell>
                <TableCell>
                  {!item.available && (
                    <Chip label="Unavailable" size="small" color="error" variant="outlined" />
                  )}
                  {item.featured && (
                    <Chip label="Featured" size="small" sx={{ backgroundColor: "#8A6420", color: "#FBEBCE", ml: 0.5 }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => router.push(`/admin/menu/${item.id}`)} sx={{ color: "#B8B6A9" }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => { setDeleting(item.id); setDeletingName(item.name); }} sx={{ color: "#E24B4A" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 1.5 }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              backgroundColor: "#1A1A18",
              border: "1px solid #33342C",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                />
              )}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 600 }}>
                  {item.name}
                </Typography>
                {item.description && (
                  <Typography variant="caption" sx={{ color: "#5C5D51", display: "block", mt: 0.25 }}>
                    {item.description}
                  </Typography>
                )}
                <Box sx={{ display: "flex", gap: 0.5, mt: 0.75, flexWrap: "wrap" }}>
                  <Chip label={item.category.name} size="small" variant="outlined" sx={{ height: 22, fontSize: 11 }} />
                  {!item.available && <Chip label="Unavailable" size="small" color="error" variant="outlined" sx={{ height: 22, fontSize: 11 }} />}
                  {item.featured && <Chip label="Featured" size="small" sx={{ backgroundColor: "#8A6420", color: "#FBEBCE", height: 22, fontSize: 11 }} />}
                </Box>
              </Box>
              <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#A9CD3A", whiteSpace: "nowrap" }}>
                {formatPrice(item.price)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 1.5, justifyContent: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => router.push(`/admin/menu/${item.id}`)}
                startIcon={<EditIcon />}
                sx={{ borderColor: "#33342C", color: "#B8B6A9", fontSize: 12, "&:hover": { borderColor: "#A9CD3A", color: "#A9CD3A" } }}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => { setDeleting(item.id); setDeletingName(item.name); }}
                startIcon={<DeleteIcon />}
                sx={{ borderColor: "#33342C", color: "#E24B4A", fontSize: 12, "&:hover": { borderColor: "#E24B4A" } }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <ConfirmDialog
        open={!!deleting}
        title="Delete Item"
        message={`Are you sure you want to delete "${deletingName}"? This action cannot be undone.`}
        onConfirm={async () => {
          if (deleting) { await deleteMenuItem(deleting); setDeleting(null); }
        }}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}

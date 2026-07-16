"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from "@/features/menu/actions";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

interface Category {
  id: string;
  name: string;
  displayOrder: number;
  _count: { items: number };
}

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  async function handleMoveUp(index: number) {
    if (index <= 0 || reordering) return;
    setReordering(true);
    try {
      const items = categories.map((c) => ({ id: c.id, displayOrder: c.displayOrder }));
      const temp = items[index].displayOrder;
      items[index].displayOrder = items[index - 1].displayOrder;
      items[index - 1].displayOrder = temp;
      await reorderCategories(items);
      setSnackbar({ message: "Category order updated", severity: "success" });
    } catch {
      setSnackbar({ message: "Failed to reorder", severity: "error" });
    }
    setReordering(false);
  }

  async function handleMoveDown(index: number) {
    if (index >= categories.length - 1 || reordering) return;
    setReordering(true);
    try {
      const items = categories.map((c) => ({ id: c.id, displayOrder: c.displayOrder }));
      const temp = items[index].displayOrder;
      items[index].displayOrder = items[index + 1].displayOrder;
      items[index + 1].displayOrder = temp;
      await reorderCategories(items);
      setSnackbar({ message: "Category order updated", severity: "success" });
    } catch {
      setSnackbar({ message: "Failed to reorder", severity: "error" });
    }
    setReordering(false);
  }

  if (categories.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          backgroundColor: "#1A1A18",
          border: "1px solid #33342C",
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "#5C5D51", mb: 2 }}>
          No categories yet.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setShowCreate(true)}
        >
          Create Category
        </Button>

        <Dialog open={showCreate} onClose={() => setShowCreate(false)} maxWidth="xs" fullWidth>
          <Box component="form" action={async (fd) => { await createCategory(fd); setShowCreate(false); }}>
            <DialogTitle>Create Category</DialogTitle>
            <DialogContent>
              <TextField name="name" label="Category Name" fullWidth required autoFocus sx={{ mt: 1 }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Create</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="caption" sx={{ color: "#B8B6A9" }}>
          {categories.length} categor{categories.length === 1 ? "y" : "ies"}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setShowCreate(true)}
          sx={{ borderColor: "#33342C" }}
        >
          Add Category
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}>Order</TableCell>
            <TableCell>Name</TableCell>
            <TableCell sx={{ width: 100 }}>Items</TableCell>
            <TableCell sx={{ width: 140 }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat, index) => (
            <TableRow key={cat.id}>
              <TableCell>
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                  <IconButton
                    size="small"
                    disabled={index === 0 || reordering}
                    onClick={() => handleMoveUp(index)}
                    sx={{ color: index === 0 ? "#33342C" : "#B8B6A9", p: 0.5 }}
                  >
                    <KeyboardArrowUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={index === categories.length - 1 || reordering}
                    onClick={() => handleMoveDown(index)}
                    sx={{ color: index === categories.length - 1 ? "#33342C" : "#B8B6A9", p: 0.5 }}
                  >
                    <KeyboardArrowDownIcon fontSize="small" />
                  </IconButton>
                  {reordering && <CircularProgress size={16} sx={{ color: "#A9CD3A" }} />}
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 600 }}>
                  {cat.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={cat._count.items}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "#33342C", color: "#B8B6A9", minWidth: 36 }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => setEditing(cat)}
                  sx={{ color: "#B8B6A9" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setDeleting(cat)}
                  sx={{ color: "#E24B4A" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showCreate} onClose={() => setShowCreate(false)} maxWidth="xs" fullWidth>
        <Box component="form" action={async (fd) => { await createCategory(fd); setShowCreate(false); }}>
          <DialogTitle>Create Category</DialogTitle>
          <DialogContent>
            <TextField name="name" label="Category Name" fullWidth required autoFocus sx={{ mt: 1 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={!!editing} onClose={() => setEditing(null)} maxWidth="xs" fullWidth>
        <Box component="form" action={async (fd) => { if (editing) { await updateCategory(editing.id, fd); setEditing(null); } }}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField name="name" label="Category Name" fullWidth required autoFocus defaultValue={editing?.name} sx={{ mt: 1 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <ConfirmDialog
        open={!!deleting}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleting?.name}"? All items in this category will also be deleted.`}
        onConfirm={async () => {
          if (deleting) { await deleteCategory(deleting.id); setDeleting(null); }
        }}
        onCancel={() => setDeleting(null)}
      />

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {snackbar ? <Alert severity={snackbar.severity} onClose={() => setSnackbar(null)}>{snackbar.message}</Alert> : undefined}
      </Snackbar>
    </>
  );
}

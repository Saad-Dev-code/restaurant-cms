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
import { deleteOffer } from "@/features/offers/actions";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { formatDate } from "@/utils/format";

interface Offer {
  id: string;
  title: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  image: string;
  description: string;
}

type OfferStatus = "active" | "expired" | "scheduled" | "inactive";

function getOfferStatus(offer: Offer): { status: OfferStatus; label: string; color: "success" | "error" | "warning" | "default" } {
  const now = new Date();
  if (!offer.active) return { status: "inactive", label: "Inactive", color: "default" };
  if (now < new Date(offer.startDate)) return { status: "scheduled", label: "Scheduled", color: "warning" };
  if (now > new Date(offer.endDate)) return { status: "expired", label: "Expired", color: "error" };
  return { status: "active", label: "Active", color: "success" };
}

export function OffersList({ offers }: { offers: Offer[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deletingTitle, setDeletingTitle] = useState("");
  const router = useRouter();

  if (offers.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#5C5D51" }}>
        <p>No offers yet. Click &quot;Add Offer&quot; to create one.</p>
      </div>
    );
  }

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => {
              const { label, color } = getOfferStatus(offer);
              return (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {offer.image && (
                        <img src={offer.image} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600, color: "#FAF8F2" }}>{offer.title}</div>
                        <div style={{ fontSize: 12, color: "#5C5D51" }}>{offer.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ color: "#B8B6A9", fontSize: 13 }}>
                      {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip label={label} size="small" color={color} variant="outlined" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => router.push(`/admin/offers/${offer.id}`)} sx={{ color: "#B8B6A9" }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => { setDeleting(offer.id); setDeletingTitle(offer.title); }} sx={{ color: "#E24B4A" }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 1.5 }}>
        {offers.map((offer) => {
          const { label, color } = getOfferStatus(offer);
          return (
            <Box
              key={offer.id}
              sx={{
                backgroundColor: "#1A1A18",
                border: "1px solid #33342C",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                {offer.image && (
                  <img src={offer.image} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                )}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 600 }}>
                    {offer.title}
                  </Typography>
                  {offer.description && (
                    <Typography variant="caption" sx={{ color: "#5C5D51", display: "block", mt: 0.25 }}>
                      {offer.description}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ color: "#B8B6A9", display: "block", mt: 0.5 }}>
                    {formatDate(offer.startDate)} — {formatDate(offer.endDate)}
                  </Typography>
                </Box>
                <Chip label={label} size="small" color={color} variant="outlined" sx={{ height: 22, fontSize: 11 }} />
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 1.5, justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => router.push(`/admin/offers/${offer.id}`)}
                  startIcon={<EditIcon />}
                  sx={{ borderColor: "#33342C", color: "#B8B6A9", fontSize: 12, "&:hover": { borderColor: "#A9CD3A", color: "#A9CD3A" } }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => { setDeleting(offer.id); setDeletingTitle(offer.title); }}
                  startIcon={<DeleteIcon />}
                  sx={{ borderColor: "#33342C", color: "#E24B4A", fontSize: 12, "&:hover": { borderColor: "#E24B4A" } }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      <ConfirmDialog
        open={!!deleting}
        title="Delete Offer"
        message={`Are you sure you want to delete "${deletingTitle}"?`}
        onConfirm={async () => {
          if (deleting) { await deleteOffer(deleting); setDeleting(null); }
        }}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}

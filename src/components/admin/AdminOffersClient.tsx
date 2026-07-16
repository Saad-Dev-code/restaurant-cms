"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { OffersList } from "@/components/admin/OffersList";

interface Offer {
  id: string;
  title: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  image: string;
  description: string;
}

interface AdminOffersClientProps {
  offers: Offer[];
}

export function AdminOffersClient({ offers }: AdminOffersClientProps) {
  const router = useRouter();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Typography
          variant="h2"
          sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2" }}
        >
          Offers Management
        </Typography>
        <Button onClick={() => router.push("/admin/offers/new")} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Offer
        </Button>
      </Box>
      <OffersList offers={offers} />
    </>
  );
}

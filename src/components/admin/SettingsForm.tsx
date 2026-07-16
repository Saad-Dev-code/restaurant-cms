"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { updateSettings } from "@/features/settings/actions";
import type { OpeningHour } from "@/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface SettingsData {
  id: string;
  restaurantName: string;
  logo: string;
  address: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  googleMaps: string;
  openingHours: OpeningHour[];
}

interface SettingsFormProps {
  settings: SettingsData | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveCounter, setSaveCounter] = useState(0);
  const [logoPreview, setLogoPreview] = useState(settings?.logo || "");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (dirty) { e.preventDefault(); }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  const handleLogoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setDirty(true);
    }
  }, []);

  useEffect(() => {
    return () => { if (logoPreview && logoPreview.startsWith("blob:")) URL.revokeObjectURL(logoPreview); };
  }, [logoPreview]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await updateSettings(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setSaveCounter((c) => c + 1);
        setDirty(false);
        router.refresh();
      }
    } catch {
      setError("Failed to save settings");
    }

    setLoading(false);
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
      {success && <Alert severity="success">Settings saved successfully!</Alert>}

      <Typography variant="caption" sx={{ color: "#A9CD3A" }}>
        General Information
      </Typography>

      <TextField
        name="restaurantName"
        label="Restaurant Name"
        defaultValue={settings?.restaurantName ?? ""}
        required
        fullWidth
        onChange={() => setDirty(true)}
      />

      {(logoPreview || settings?.logo) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box component="img" src={logoPreview || settings?.logo} alt="Logo preview" sx={{ height: 48, borderRadius: 1 }} />
          <Typography variant="body2" sx={{ color: "#5C5D51" }}>Logo preview</Typography>
        </Box>
      )}
      <TextField name="logo" type="file" fullWidth slotProps={{ htmlInput: { accept: "image/*" } }} helperText={settings?.logo ? "Leave empty to keep current logo" : ""} onChange={handleLogoChange} />

      <TextField name="address" label="Address" defaultValue={settings?.address ?? ""} multiline rows={2} fullWidth onChange={() => setDirty(true)} />
      <TextField name="phone" label="Phone" defaultValue={settings?.phone ?? ""} fullWidth onChange={() => setDirty(true)} />
      <TextField name="whatsapp" label="WhatsApp Number" defaultValue={settings?.whatsapp ?? ""} fullWidth helperText="Include country code, e.g. 15551234567" onChange={() => setDirty(true)} />

      <Typography variant="caption" sx={{ color: "#A9CD3A", mt: 2 }}>
        Social Links
      </Typography>

      <TextField name="facebook" label="Facebook URL" defaultValue={settings?.facebook ?? ""} fullWidth onChange={() => setDirty(true)} />
      <TextField name="instagram" label="Instagram URL" defaultValue={settings?.instagram ?? ""} fullWidth onChange={() => setDirty(true)} />
      <TextField name="googleMaps" label="Google Maps URL" defaultValue={settings?.googleMaps ?? ""} fullWidth onChange={() => setDirty(true)} />

      <Typography variant="caption" sx={{ color: "#A9CD3A", mt: 2 }}>
        Opening Hours
      </Typography>

      {DAYS.map((day) => {
        const hours = settings?.openingHours.find((h) => h.day === day);
        return (
          <Box
            key={`${day}-${saveCounter}`}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
              p: 1.5,
              borderRadius: 1,
              backgroundColor: "#131311",
            }}
          >
            <Typography variant="body2" sx={{ minWidth: 100, color: "#FAF8F2", fontWeight: 600 }}>
              {day}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  name={`${day}_closed`}
                  defaultChecked={hours?.closed ?? false}
                  size="small"
                />
              }
              label="Closed"
              sx={{ mr: 1 }}
            />
            <TextField
              name={`${day}_open`}
              label="Open"
              type="time"
              defaultValue={hours?.open ?? "09:00"}
              size="small"
              sx={{ maxWidth: 140 }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              name={`${day}_close`}
              label="Close"
              type="time"
              defaultValue={hours?.close ?? "22:00"}
              size="small"
              sx={{ maxWidth: 140 }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
        );
      })}

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </Box>
    </Box>
  );
}

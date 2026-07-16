import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getSettingsForAdmin } from "@/features/settings/actions";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettingsForAdmin();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontFamily: "Anton, sans-serif", fontSize: { xs: 24, md: 32 }, color: "#FAF8F2", mb: 3 }}
      >
        Restaurant Settings
      </Typography>
      <SettingsForm settings={settings} />
    </Container>
  );
}

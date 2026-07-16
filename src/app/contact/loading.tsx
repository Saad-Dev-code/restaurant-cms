import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ContactLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton variant="rectangular" width="25%" height={36} sx={{ mb: 4, backgroundColor: "#1A1A18", borderRadius: 1 }} />
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2, backgroundColor: "#1A1A18", borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2, backgroundColor: "#1A1A18", borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={140} sx={{ backgroundColor: "#1A1A18", borderRadius: 2 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rectangular" width="100%" height={350} sx={{ backgroundColor: "#1A1A18", borderRadius: 2 }} />
        </Box>
      </Box>
    </Container>
  );
}

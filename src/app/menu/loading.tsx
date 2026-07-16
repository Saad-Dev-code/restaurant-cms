import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function MenuLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton variant="rectangular" width="40%" height={36} sx={{ mb: 3, backgroundColor: "#1A1A18", borderRadius: 1 }} />
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rectangular" width={80} height={36} sx={{ backgroundColor: "#1A1A18", borderRadius: 2 }} />
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rectangular" width="32%" height={320} sx={{ backgroundColor: "#1A1A18", borderRadius: 2 }} />
        ))}
      </Box>
    </Container>
  );
}

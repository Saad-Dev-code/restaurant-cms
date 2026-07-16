import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

export default function RootLoading() {
  return (
    <>
      <Header restaurantName="" />
      <main>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Skeleton variant="rectangular" width="60%" height={48} sx={{ backgroundColor: "#1A1A18", borderRadius: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ backgroundColor: "#1A1A18", borderRadius: 1 }} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="rectangular" width="33%" height={300} sx={{ backgroundColor: "#1A1A18", borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="33%" height={300} sx={{ backgroundColor: "#1A1A18", borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="33%" height={300} sx={{ backgroundColor: "#1A1A18", borderRadius: 1 }} />
            </Box>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D0D0D",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Anton, sans-serif",
            fontSize: { xs: 80, md: 120 },
            color: "#A9CD3A",
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Anton, sans-serif",
            fontSize: { xs: 24, md: 32 },
            color: "#FAF8F2",
            mb: 2,
          }}
        >
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: "#B8B6A9", mb: 4 }}>
          Looks like this page is off the menu. Let&apos;s get you back on track.
        </Typography>
        <Button onClick={() => router.push("/")} variant="contained" color="primary" size="large">
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

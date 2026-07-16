"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
            fontSize: { xs: 60, md: 80 },
            color: "#D85A30",
            lineHeight: 1,
            mb: 2,
          }}
        >
          Oops!
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Anton, sans-serif",
            fontSize: { xs: 20, md: 28 },
            color: "#FAF8F2",
            mb: 2,
          }}
        >
          Something went wrong
        </Typography>
        <Typography variant="body1" sx={{ color: "#B8B6A9", mb: 4 }}>
          {error.message || "An unexpected error occurred. Please try again."}
        </Typography>
        <Button onClick={reset} variant="contained" color="primary" size="large">
          Try Again
        </Button>
      </Container>
    </Box>
  );
}

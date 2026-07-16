"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { login } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

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
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "#1A1A18",
            border: "1px solid #33342C",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Anton, sans-serif",
              fontSize: 28,
              color: "#A9CD3A",
              textAlign: "center",
              mb: 1,
            }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#B8B6A9", textAlign: "center", mb: 3 }}
          >
            Sign in to manage your restaurant
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <Box component="form" action={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              required
              autoFocus
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

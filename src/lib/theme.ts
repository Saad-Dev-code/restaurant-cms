"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#A9CD3A",
      dark: "#6E8A26",
      light: "#D6ECA0",
      contrastText: "#0D0D0D",
    },
    secondary: {
      main: "#D9A441",
      dark: "#8A6420",
      light: "#FBDFA8",
      contrastText: "#2A1C05",
    },
    tertiary: {
      main: "#D85A30",
      dark: "#8A3717",
      light: "#FAD0BC",
      contrastText: "#2E0F04",
    },
    error: {
      main: "#E24B4A",
      dark: "#791F1F",
      light: "#FCEBEB",
      contrastText: "#2E0303",
    },
    background: {
      default: "#0D0D0D",
      paper: "#1A1A18",
    },
    text: {
      primary: "#FAF8F2",
      secondary: "#B8B6A9",
    },
    divider: "#33342C",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontFamily: "Anton, sans-serif",
      fontSize: "44px",
      fontWeight: 400,
      lineHeight: "48px",
      letterSpacing: "0.01em",
    },
    h2: {
      fontFamily: "Anton, sans-serif",
      fontSize: "32px",
      fontWeight: 400,
      lineHeight: "38px",
      letterSpacing: "0.01em",
    },
    h3: {
      fontFamily: "Anton, sans-serif",
      fontSize: "26px",
      fontWeight: 400,
      lineHeight: "32px",
    },
    body1: {
      fontFamily: "Inter, sans-serif",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    body2: {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    button: {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontFamily: "Inter, sans-serif",
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: "16px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0D0D0D",
          color: "#FAF8F2",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontWeight: 600,
          fontSize: "14px",
          textTransform: "none",
          "&.MuiButton-contained.MuiButton-colorPrimary": {
            backgroundColor: "#A9CD3A",
            color: "#0D0D0D",
            "&:hover": {
              backgroundColor: "#8CB32E",
            },
          },
          "&.MuiButton-outlined.MuiButton-colorPrimary": {
            border: "1px solid #5C5D51",
            color: "#FAF8F2",
            "&:hover": {
              border: "1px solid #A9CD3A",
              backgroundColor: "rgba(169, 205, 58, 0.08)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A18",
          border: "1px solid #33342C",
          borderRadius: 16,
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#242420",
          borderLeft: "1px solid #33342C",
          backgroundImage: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#242420",
          border: "1px solid #33342C",
          borderRadius: 16,
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1A1A18",
            "& fieldset": {
              borderColor: "#33342C",
            },
            "&:hover fieldset": {
              borderColor: "#5C5D51",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#A9CD3A",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#B8B6A9",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A18",
          borderBottom: "1px solid #33342C",
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableHead-root .MuiTableCell-head": {
            color: "#B8B6A9",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderBottom: "1px solid #33342C",
          },
          "& .MuiTableBody-root .MuiTableCell-body": {
            color: "#FAF8F2",
            borderBottom: "1px solid #33342C",
          },
        },
      },
    },
  },
});

export default theme;

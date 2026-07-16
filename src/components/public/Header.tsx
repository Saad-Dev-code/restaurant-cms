"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Offers", path: "/offers" },
  { label: "Contact", path: "/contact" },
];

export function Header({
  restaurantName,
  logo,
}: {
  restaurantName: string;
  logo?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const brandLogo = logo ? (
    <Box
      component="img"
      src={logo}
      alt={restaurantName}
      sx={{ height: { xs: 42, md: 56 }, width: "auto", objectFit: "contain" }}
    />
  ) : (
    <Typography
      variant="h3"
      sx={{
        fontFamily: "Anton, sans-serif",
        fontSize: { xs: 22, md: 26 },
        color: "#A9CD3A",
        textDecoration: "none",
      }}
    >
      {restaurantName}
    </Typography>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}>
          <Box
            component={Link}
            href="/"
            sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {brandLogo}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: "auto" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  sx={{
                    color: isActive ? "#A9CD3A" : "#FAF8F2",
                    borderBottom: isActive ? "2px solid #A9CD3A" : "2px solid transparent",
                    borderRadius: 0,
                    px: 2,
                    py: 1,
                    "&:hover": {
                      color: "#A9CD3A",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          <IconButton
            sx={{ display: { md: "none" }, ml: "auto", color: "#FAF8F2" }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { md: "none" } }}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <Link href="/" style={{ display: "block", paddingLeft: 24, paddingRight: 24, marginBottom: 16 }}>
            {logo ? (
              <Box
                component="img"
                src={logo}
                alt={restaurantName}
                sx={{ height: 42, width: "auto", objectFit: "contain" }}
              />
            ) : (
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 22,
                  color: "#A9CD3A",
                }}
              >
                {restaurantName}
              </Typography>
            )}
          </Link>
          <List>
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    selected={isActive}
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      color: isActive ? "#A9CD3A" : "#FAF8F2",
                      "&.Mui-selected": { backgroundColor: "rgba(169, 205, 58, 0.08)" },
                    }}
                  >
                    {item.label}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

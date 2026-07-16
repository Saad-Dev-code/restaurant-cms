"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/app/actions/auth";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { label: "Menu", path: "/admin/menu", icon: <RestaurantMenuIcon /> },
  { label: "Offers", path: "/admin/offers", icon: <LocalOfferIcon /> },
  { label: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
];

const DRAWER_WIDTH = 260;

export function AdminNav({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#131311" }}>
      <Box sx={{ p: 2.5, borderBottom: "1px solid #33342C" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Anton, sans-serif",
            fontSize: 22,
            color: "#A9CD3A",
          }}
        >
          The Bürg
        </Typography>
        <Typography variant="caption" sx={{ color: "#5C5D51" }}>
          Admin Panel
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, px: 1, pt: 1 }}>
        {navItems.map((item) => {
          const isActive = item.path === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 1,
                  color: isActive ? "#A9CD3A" : "#B8B6A9",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(169, 205, 58, 0.08)",
                    color: "#A9CD3A",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(169, 205, 58, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: { fontSize: 14, fontWeight: isActive ? 600 : 400 },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid #33342C" }}>
        <form action={logout}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{ borderColor: "#33342C", color: "#B8B6A9", "&:hover": { borderColor: "#A9CD3A", color: "#A9CD3A" } }}
          >
            Sign Out
          </Button>
        </form>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          display: { md: "none" },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "#A9CD3A" }}>
            Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH, borderRight: "1px solid #33342C" },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#0D0D0D",
          minHeight: "100vh",
          pt: { xs: 8, md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

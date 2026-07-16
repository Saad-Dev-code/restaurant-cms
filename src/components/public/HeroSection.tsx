"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Star from "@mui/icons-material/Star";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { motion, AnimatePresence } from "motion/react";
import type { MenuItemWithCategory } from "@/types";
import { formatPrice } from "@/utils/format";

interface HeroSectionProps {
  restaurantName: string;
  address?: string;
  featuredItems: MenuItemWithCategory[];
}

const tickerItems = [
  "100% Fresh Meat",
  "Artisan Bread",
  "Smashed to Order",
  "Fast Delivery",
];

export function HeroSection({ restaurantName, address, featuredItems }: HeroSectionProps) {
  const router = useRouter();
  const [itemIndex, setItemIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const hasItems = featuredItems.length > 0;

  useEffect(() => {
    if (!hasItems || paused) return;
    const id = setInterval(() => {
      setItemIndex((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => clearInterval(id);
  }, [hasItems, paused, featuredItems.length]);

  const currentItem = hasItems ? featuredItems[itemIndex] : null;

  const locationLabel = address ? address.split(",")[0].trim() : null;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "90vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        backgroundColor: "#060605",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(169, 205, 58, 0.08) 0%, transparent 70%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          alignItems: "center",
          py: { xs: 10, md: 0 },
        }}
      >
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              label={locationLabel ?? "Premium Craft Burgers"}
              size="small"
              sx={{
                backgroundColor: "rgba(169, 205, 58, 0.1)",
                color: "#A9CD3A",
                border: "1px solid rgba(169, 205, 58, 0.3)",
                backdropFilter: "blur(12px)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                mb: 3,
                height: 32,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 44, sm: 56, md: 64, lg: 80 },
                lineHeight: 1,
                color: "#FAF8F2",
                letterSpacing: "0.01em",
              }}
            >
              CRAFTED
              <br />
              TO{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #A9CD3A 0%, #D9A441 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PERFECTION
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              sx={{
                fontFamily: "Anton, sans-serif",
                fontSize: { xs: 24, md: 32 },
                color: "#A9CD3A",
                mt: 1,
              }}
            >
              {restaurantName}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#B8B6A9",
                maxWidth: 500,
                mt: 2,
                mb: 4,
                fontSize: { xs: 16, md: 18 },
              }}
            >
              Premium craft burgers made from locally sourced ingredients. Every
              bite tells a story of quality and passion.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                onClick={() => router.push("/menu")}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.2s",
                }}
                endIcon={<ArrowOutward />}
              >
                View Menu
              </Button>
              <Button
                onClick={() => router.push("/contact")}
                variant="outlined"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.5, fontSize: 16 }}
              >
                Find Us
              </Button>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: { xs: 4, md: 6 } }}>
              <Box sx={{ display: "flex" }}>
                {[0, 1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "2px solid #060605",
                      ml: i > 0 ? -1.5 : 0,
                      background:
                        i === 3
                          ? "linear-gradient(135deg, #A9CD3A 0%, #D9A441 100%)"
                          : "linear-gradient(135deg, #D9A441 0%, #D85A30 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#0D0D0D",
                    }}
                  >
                    {i === 3 ? "+" : ""}
                  </Box>
                ))}
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      sx={{ fontSize: 16, color: "#D9A441", fill: "#D9A441" }}
                    />
                  ))}
                  <Typography
                    variant="caption"
                    sx={{ color: "#FAF8F2", fontWeight: 700, ml: 0.5 }}
                  >
                    4.8+
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#5C5D51" }}>
                  900+ Google reviews
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Mobile inline card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Box sx={{ display: { xs: "block", md: "none" }, mt: 4 }}>
              <Box
                sx={{
                  backgroundColor: "rgba(26, 26, 24, 0.9)",
                  border: "1px solid #33342C",
                  borderRadius: 2,
                  p: 2,
                  backdropFilter: "blur(16px)",
                }}
              >
                {hasItems && currentItem ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                        {currentItem.image ? (
                          <Box
                            component="img"
                            src={currentItem.image}
                            alt={currentItem.name}
                            sx={{ width: 48, height: 48, borderRadius: 1.5, objectFit: "cover", flexShrink: 0 }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 48, height: 48, borderRadius: 1.5,
                              background: "linear-gradient(135deg, #A9CD3A 0%, #D9A441 100%)",
                              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                            }}
                          >🍔</Box>
                        )}
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography variant="caption" sx={{ color: "#5C5D51", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Featured
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 700 }}>
                            {currentItem.name}
                          </Typography>
                          <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#A9CD3A" }}>
                            {formatPrice(currentItem.price)}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          onClick={() => router.push("/menu")}
                          sx={{ minWidth: "auto", px: 1.5, color: "#B8B6A9", fontSize: 11, fontWeight: 600, "&:hover": { color: "#A9CD3A" } }}
                          endIcon={<ArrowOutward sx={{ fontSize: 13 }} />}
                        >
                          Menu
                        </Button>
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <Typography variant="body2" sx={{ color: "#B8B6A9", textAlign: "center" }}>
                    {restaurantName} — Premium craft dining
                  </Typography>
                )}
              </Box>
            </Box>
          </motion.div>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              style={{ position: "relative", maxWidth: 320, marginLeft: "auto" }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(169, 205, 58, 0.15), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "rgba(26, 26, 24, 0.9)",
                  border: "1px solid #33342C",
                  borderRadius: 3,
                  p: 2.5,
                  backdropFilter: "blur(16px)",
                }}
              >
                {hasItems && currentItem ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        {currentItem.image ? (
                          <Box
                            component="img"
                            src={currentItem.image}
                            alt={currentItem.name}
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 2,
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg, #A9CD3A 0%, #D9A441 100%)",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 28,
                            }}
                          >
                            🍔
                          </Box>
                        )}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#5C5D51",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Featured
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#FAF8F2", fontWeight: 700, mt: 0.25 }}
                          >
                            {currentItem.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#A9CD3A",
                              mt: 0.25,
                            }}
                          >
                            {formatPrice(currentItem.price)}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        size="small"
                        onClick={() => router.push("/menu")}
                        sx={{
                          mt: 1.5,
                          color: "#B8B6A9",
                          fontSize: 12,
                          fontWeight: 600,
                          gap: 0.5,
                          "&:hover": { color: "#A9CD3A" },
                        }}
                        endIcon={<ArrowOutward sx={{ fontSize: 14 }} />}
                      >
                        View Menu
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#5C5D51", textTransform: "uppercase", letterSpacing: "0.08em" }}
                    >
                      Signature
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#FAF8F2", fontWeight: 700, mt: 0.5 }}>
                      {restaurantName}
                    </Typography>
                    <Typography sx={{ color: "#B8B6A9", fontSize: 13, mt: 0.5 }}>
                      Premium craft dining
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            style={{ position: "absolute", bottom: 30, left: -20 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(26, 26, 24, 0.9)",
                  border: "1px solid #33342C",
                  borderRadius: 3,
                  p: 2.5,
                  backdropFilter: "blur(16px)",
                  minWidth: 160,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#5C5D51",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Ready in
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 24,
                    color: "#FAF8F2",
                    mt: 0.25,
                  }}
                >
                  12–15 min
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#D9A441", display: "block", mt: 0.25 }}
                >
                  Fast Delivery
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </Box>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid #33342C",
          backgroundColor: "rgba(26, 26, 24, 0.6)",
          backdropFilter: "blur(12px)",
          py: 1.5,
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, md: 4 },
            }}
          >
            {tickerItems.map((item, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#B8B6A9", letterSpacing: "0.08em", fontSize: 11 }}
                >
                  {item}
                </Typography>
                {i < tickerItems.length - 1 && (
                  <Box
                    component="span"
                    sx={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      backgroundColor: "#A9CD3A",
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

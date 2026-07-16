import Box from "@mui/material/Box";

interface MapEmbedProps {
  googleMapsUrl: string;
}

export function MapEmbed({ googleMapsUrl }: MapEmbedProps) {
  let src = "";
  try {
    const url = new URL(googleMapsUrl);
    if (url.hostname === "maps.google.com" || url.hostname === "www.google.com") {
      const q = url.searchParams.get("q");
      if (q) {
        src = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
      }
    } else if (url.hostname === "goo.gl" || url.hostname === "maps.app.goo.gl") {
      src = googleMapsUrl;
    }
  } catch {
    src = googleMapsUrl;
  }

  if (!src) return null;

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 250, md: 350 },
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #33342C",
      }}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Restaurant Location"
      />
    </Box>
  );
}

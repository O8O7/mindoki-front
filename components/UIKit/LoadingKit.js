import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingKit() {
  return (
    <Box sx={{ width: "100%", marginTop: "64px" }}>
      <LinearProgress />
      <div
        style={{
          textAlign: "center",
          padding: 10,
          position: "sticky",
          top: "0px",
        }}
      >
        Loading...
      </div>
    </Box>
  );
}

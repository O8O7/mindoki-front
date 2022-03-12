import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SkeletonCard(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={props.width ?? "100%"}
        height={props.height ?? "100%"}
      />
    </Box>
  );
}

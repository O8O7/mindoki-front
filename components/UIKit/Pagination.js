import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import Link from "next/link";

export default function PaginationKit() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button startIcon={<ChevronLeftIcon />} variant="contained" disabled>
        <Link href={"/"}>
          <a>前のページへ</a>
        </Link>
      </Button>
      <Link href={"/"}>
        <a>
          <Button endIcon={<ChevronRightIcon />} variant="contained">
            次のページへ
          </Button>
        </a>
      </Link>
    </div>
  );
}

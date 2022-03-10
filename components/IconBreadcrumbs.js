import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

import Link from "next/link";

export default function IconBreadcrumbs(props) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ margin: { xs: 2, md: 3 } }}>
      <Link href={"/"} passHref>
        <MuiLink
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          ホーム
        </MuiLink>
      </Link>
      <MuiLink
        sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        color="inherit"
      >
        {props.page}
      </MuiLink>
    </Breadcrumbs>
  );
}

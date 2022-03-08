import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   margin: "0 auto",
  maxWidth: "380px",
  margin: "0 0 10px auto",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  backgroundColor: "#e3e3e3",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchUIKit() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const currentSearchWord = useCallback(
    (e) => {
      const { value } = e.currentTarget;
      setSearch(value);
    },
    [setSearch]
  );

  const handleChange = useCallback(() => {
    router.push(`/${search}`);
  }, [search, router]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="Search"
        fullWidth
        placeholder="キーワードで検索"
        inputProps={{ "aria-label": "search" }}
        onChange={currentSearchWord}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleChange();
          }
        }}
      />
    </Search>
  );
}

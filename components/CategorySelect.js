import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CategorySelect() {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">カテゴリー</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="カテゴリー"
          onChange={handleChange}
        >
          <MenuItem value={10}>Q&A</MenuItem>
          <MenuItem value={20}>ポートフォリオ投稿</MenuItem>
          <MenuItem value={30}>技術記事投稿</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

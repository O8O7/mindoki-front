import { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import Head from "next/head";

import IconBreadcrumbs from "../components/IconBreadcrumbs";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import ArticleForm from "../components/Form/ArticleForm";
import QuestionForm from "../components/Form/QuestionForm";
import PortfolioForm from "../components/Form/PortfolioForm";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import MarkdownCheatSheet from "../components/MarkdownCheatSheet";
import { languageData } from "../components/UIKit/languageData";

const sideWidth = 500;

const PostForm = () => {
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/login");
  }

  return (
    <div style={{ width: "100%" }}>
      <Head>
        <title>投稿画面</title>
      </Head>
      <Toolbar />
      <IconBreadcrumbs page="新規投稿" />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          width: { sx: "100%" },
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          //   component="form"
        >
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  カテゴリーを選択
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="カテゴリーを選択"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Q&A</MenuItem>
                  <MenuItem value={20}>ポートフォリオ投稿</MenuItem>
                  <MenuItem value={30}>技術記事投稿</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {category == 10 ? <QuestionForm languages={languageData} /> : ""}
          {category == 20 ? <PortfolioForm languages={languageData} /> : ""}
          {category == 30 ? <ArticleForm languages={languageData} /> : ""}
        </Box>
        <Box
          component="form"
          sx={{
            display: { xs: "none", lg: "block" },
            background: "#97d190",
            width: { md: `${sideWidth}px` },
            marginLeft: 2,
          }}
        >
          <MarkdownCheatSheet />
        </Box>
      </Container>
    </div>
  );
};

export default PostForm;

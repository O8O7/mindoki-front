import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Account from "../components/Account";
import SideDrawer from "../components/SideDrawer";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Footer from "./Footer";
import Divider from "@mui/material/Divider";
import useSWR from "swr";
import { TextField } from "@mui/material";
// import { refresh } from "../actions/auth";
import { useRouter } from "next/router";

import { Autocomplete } from "@mui/material";

import { user } from "../reduxs/actions/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingKit from "./UIKit/LoadingKit";

const drawerWidth = 230;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Layout = (props) => {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const keyword = useRef(null);
  const userInfo = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch) {
      dispatch(user());
    }
  }, [userInfo, dispatch]);

  const initialLanguageValue = [
    { id: "1", label: "Python" },
    { id: "2", label: "PHP" },
    { id: "3", label: "Ruby" },
    { id: "4", label: "JavaScript" },
    { id: "5", label: "SQL" },
    { id: "6", label: "HTML・CSS" },
    { id: "7", label: "C" },
    { id: "8", label: "C++" },
    { id: "9", label: "C#" },
    { id: "10", label: "Java" },
    { id: "11", label: "Kotlin" },
    { id: "12", label: "Objective-C" },
    { id: "13", label: "Swift" },
    { id: "14", label: "Go" },
    { id: "15", label: "Scala" },
    { id: "16", label: "R" },
    { id: "17", label: "Rust" },
    { id: "18", label: "Dart" },
  ];

  const language = useRef(initialLanguageValue);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/language_list/`,
    fetcher
    // { refreshInterval: 6000 }
  );

  useEffect(() => {
    if (data) {
      language.current = data.results.map((option) => ({
        id: option.id,
        label: option.name,
      }));
    }
  }, [data]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   if (error) return <div>failed to load</div>;
  if (!data) return <LoadingKit />;

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            minHeight: "58px",
            backgroundImage:
              "linear-gradient(-20deg, #0a856e 0%, #0c0606 100%)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Account />
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Autocomplete
              sx={{ m: 1, width: 210 }}
              options={language.current}
              onChange={(event, value) => {
                if (value) {
                  router.push(`/${value.label}`);
                  keyword.current = value.label;
                } else {
                  router.push("/");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="言語で絞る"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            {/*  */}
            <Divider sx={{ marginTop: 1 }} />
            <Box onClick={handleDrawerToggle}>
              <SideDrawer keyword={keyword.current} />
            </Box>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Autocomplete
              sx={{ m: 1, width: 210 }}
              options={language.current}
              onChange={(event, value) => {
                if (value) {
                  router.push(`/${value.label}`);
                  keyword.current = value.label;
                } else {
                  router.push("/");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="言語で絞る"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Divider sx={{ marginTop: 1 }} />
            <SideDrawer keyword={keyword.current} />
            <Divider />
          </Drawer>
        </Box>
        {props.children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;

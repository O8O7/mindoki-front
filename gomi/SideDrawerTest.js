import Head from "next/head";
import { useState } from "react";

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
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Link from "next/link";

import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import StarIcon from "@mui/icons-material/Star";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import MenuItem from "@mui/material/MenuItem";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import BugReportIcon from "@mui/icons-material/BugReport";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ClickAwayListener } from "@mui/material";
import useSWR from "swr";

const drawerWidth = 230;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function SideDrawerTest(props) {
  const { window } = props;
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/language_list/`,
    fetcher
    // { refreshInterval: 6000 }
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundImage: "linear-gradient(-20deg, #0a856e 0%, #0c0606 100%)",
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
          <FormControl sx={{ m: 1, width: 184 }}>
            <InputLabel id="demo-simple-select-label">言語</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              {data &&
                data.results.map((lang, i) => (
                  <MenuItem key={`lang_${i}`} value={i}>
                    {lang.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Divider sx={{ marginTop: 1 }} />
          <Box
            // role="presentation"
            onClick={handleDrawerToggle}
            // onKeyDown={handleDrawerToggle}
          >
            <SideDrawer />
          </Box>
        </Drawer>
        <Drawer
          // anchor="close"
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
          <FormControl sx={{ m: 1, width: 184 }}>
            <InputLabel id="demo-simple-select-label">言語</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              {data &&
                data.results.map((lang, i) => (
                  <MenuItem key={`lang_${i}`} value={i}>
                    {lang.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Divider sx={{ marginTop: 1 }} />
          <Box onClick={handleDrawerToggle}>
            <SideDrawer />
          </Box>
          <Divider />
        </Drawer>
      </Box>
    </>
  );
}

export default SideDrawerTest;

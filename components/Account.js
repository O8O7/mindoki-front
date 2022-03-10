import { useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import Stack from "@mui/material/Stack";

import Link from "next/link";

import { logout } from "../reduxs/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import AvatarIcon from "./UIKit/AvatorIcon";

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    setAnchorEl(null);
    if (dispatch) {
      await dispatch(logout());
    }
  };
  return (
    <>
      <Typography variant="h6" noWrap component="div">
        <Link href={"/"}>みんなで作ろうドキュメント</Link>
      </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          position: "fixed",
          marginRight: { xs: 1.5, sm: 2, md: 3 },
          right: 0,
          display: { xs: "block", lg: "none" },
          p: 0,
          height: { xs: "40px", sm: "45px" },
          width: { xs: "40px", sm: "45px" },
          minWidth: { xs: "40px", sm: "45px" },
          borderRadius: "50%",
        }}
      >
        {user ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              boxShadow:
                "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(92 92 92)",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <AvatarIcon
              alt={user.user.name}
              src={user.user.image}
              width="45"
              height="45"
              objectFit="cover"
            />
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              boxShadow:
                "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(92 92 92)",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <AvatarIcon
              alt="notFoundUser"
              src="/profile.png"
              width="45"
              height="45"
              objectFit="cover"
            />
          </div>
        )}
      </Button>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          position: "fixed",
          marginRight: 2,
          right: 0,
          display: { xs: "none", lg: "block" },
        }}
      >
        {user ? (
          <Button
            variant="contained"
            sx={{ fontWeight: "bold", color: "#000", background: "#68a4ff" }}
            onClick={logoutHandler}
          >
            <Link href={"/logout"}>
              <a>ログアウト</a>
            </Link>
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", color: "#000", background: "#f7f7f7" }}
            >
              <Link href={"/login"}>
                <a>ログイン</a>
              </Link>
            </Button>
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", color: "#000", background: "#68a4ff" }}
            >
              <Link href={"/register"}>
                <a>新規登録</a>
              </Link>
            </Button>
          </>
        )}
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          display: { xs: "block", lg: "none" },
        }}
      >
        {user && (
          <Link href={"/profile"}>
            <a>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>プロフィール</ListItemText>
              </MenuItem>
            </a>
          </Link>
        )}
        {user ? (
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>ログアウト</ListItemText>
          </MenuItem>
        ) : (
          <Link href={"/login"}>
            <a>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>ログイン</ListItemText>
              </MenuItem>
            </a>
          </Link>
        )}
        {!user && (
          <Link href={"/register"}>
            <a>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>新規登録</ListItemText>
              </MenuItem>
            </a>
          </Link>
        )}
      </Menu>
    </>
  );
};

export default Account;

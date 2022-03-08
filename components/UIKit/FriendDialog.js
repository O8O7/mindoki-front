import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useEffect, useState } from "react";
import Link from "next/link";
import AvatarIcon from "./AvatorIcon";

export default function FriendDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen}>{props.children}</div>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{ height: "90%", textAlign: "center" }}
      >
        <DialogTitle>フレンドリスト</DialogTitle>
        <List sx={{ pt: 0, width: "70vw", maxWidth: "100%" }}>
          {props.data ? (
            props.data.map((data) => (
              <Link href={`/profile/detail/${data.id}`} key={data.name}>
                <a>
                  <ListItem button>
                    <ListItemAvatar>
                      <div
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          boxShadow:
                            "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(17 177 17)",
                          overflow: "hidden",
                          margin: "0 auto",
                          marginRight: "10px",
                          marginLeft: "5px",
                        }}
                      >
                        <AvatarIcon
                          width="50px"
                          height="50px"
                          src={`${process.env.NEXT_PUBLIC_API_URL}${data.image}`}
                        />
                      </div>
                    </ListItemAvatar>
                    <ListItemText primary={data.name} />
                  </ListItem>
                </a>
              </Link>
            ))
          ) : (
            <ListItem button>
              <ListItemAvatar>
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    boxShadow:
                      "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(17 177 17)",
                    overflow: "hidden",
                    margin: "0 auto",
                    marginRight: "10px",
                    marginLeft: "5px",
                  }}
                >
                  <AvatarIcon
                    width="50px"
                    height="50px"
                    alt="テストユーザー"
                    src={"/profile.png"}
                  />
                </div>
              </ListItemAvatar>
              <ListItemText primary={"フレンドはまだいません"} />
            </ListItem>
          )}
        </List>
      </Dialog>
    </>
  );
}

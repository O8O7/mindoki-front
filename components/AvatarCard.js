import style from "./AvatarCard.module.css";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Typography } from "@mui/material";
import BottomAppBar from "./Message";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import AvatarIcon from "./UIKit/AvatorIcon";

const rightDrawer = 300;

const AvatarCard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box
      component="main"
      maxWidth={rightDrawer}
      sx={{
        flexGrow: 1,
        p: 3,
        display: { xs: "none", lg: "block" },
        padding: 0,
        paddingTop: "25px",
        paddingRight: "3px",
      }}
    >
      <Toolbar />
      <Typography variant="h6" className="profile" sx={{ marginBottom: 2 }}>
        ユーザー情報
      </Typography>
      {user ? (
        <Link href={"/profile"}>
          <a>
            <div className={style.slide}>
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "auto 5px auto 0px",
                  float: "left",
                }}
              >
                <AvatarIcon
                  alt={user.user.name}
                  src={user.user.image}
                  width="60"
                  height="60"
                  objectFit="cover"
                />
              </div>
              <span className={style.ml2}>名前</span>
              <br />
              <span className={style.name}>{user.user.name}</span>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={"/login"}>
          <a>
            <div className={style.slide}>
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "auto 5px auto 0px",
                  float: "left",
                }}
              >
                <AvatarIcon
                  alt="デフォルトユーザー"
                  src={"/profile.png"}
                  width="60"
                  height="60"
                  objectFit="cover"
                />
              </div>
              <span className={style.ml2}>名前</span>
              <br />
              <span className={style.name}>ログインしてください</span>
            </div>
          </a>
        </Link>
      )}
      <BottomAppBar />
    </Box>
  );
};

export default AvatarCard;

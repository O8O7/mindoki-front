import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { useState } from "react";

import { Avatar } from "@mui/material";

import Image from "next/image";

const ProfilePortfolio = (props) => {
  const [favo, setFavo] = useState(false);

  const favoClick = () => (favo ? setFavo(false) : setFavo(true));
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        marginBottom: 2,
        margin: "0 auto",
        width: "95%",
        boxShadow:
          "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(209, 209, 209)",
      }}
      className="postcard"
    >
      <Image
        objectFit="cover"
        height={200}
        width={300}
        alt="404"
        src={props.image}
        className="portfolio_image"
      />
      <div
        style={{
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            marginTop: 5,
            marginBottom: 5,
            textAlign: "start",
          }}
        >
          {props.title}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span className="tag">django</span>
          <span className="tag">react</span>
          <span className="tag">nextjs</span>
        </div>
        <div style={{ textAlign: "left" }}>
          <span
            style={{
              fontSize: "1rem",
              marginRight: 5,
              display: "inline-block",
              marginTop: "7px",
            }}
          >
            投稿日: {props.posted_at}
          </span>
          |
          <span style={{ fontSize: "1rem", marginLeft: 5 }}>
            更新日: {props.edited_at}
          </span>
        </div>
        <div style={{ float: "right" }}>
          <Badge
            color="secondary"
            badgeContent={props.comment.length}
            style={{ marginRight: 10 }}
          >
            <MailIcon style={{ color: "#1369e9", marginRight: 5 }} />
          </Badge>
          <IconButton
            onClick={() => favoClick()}
            style={{ marginRight: 20, color: "#000" }}
          >
            {favo ? (
              <Badge color="secondary" badgeContent={props.good.length + 1}>
                <FavoriteIcon color="error" />
              </Badge>
            ) : (
              <Badge color="secondary" badgeContent={props.good.length}>
                <FavoriteBorderIcon />
              </Badge>
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
export default ProfilePortfolio;

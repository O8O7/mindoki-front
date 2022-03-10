import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const PortfolioCard = (props) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 1,
        marginBottom: 2,
        boxShadow:
          "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(209, 209, 209)",
      }}
      className="postcard"
    >
      <Link href={`/portfolio/detail/${props.portfolio_id}`}>
        <a>
          {props.thumbnail ? (
            <Image
              objectFit="cover"
              //   layout="fill"
              //   height={150}
              height={150}
              width={266}
              alt={"404"}
              src={props.thumbnail}
              //   className="portfolio_image"
            />
          ) : (
            <Skeleton variant="rectangular" width={180} height={110} />
          )}
        </a>
      </Link>
      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "left",
          marginLeft: "5px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              margin: 0,
              marginTop: 0,
              marginBottom: 0,
              marginRight: "30px",
            }}
          >
            {props.name}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              margin: "0 10px 0 0",
            }}
          >
            投稿日: {props.posted_at}
          </p>
        </div>
        <p
          style={{
            fontSize: "1.1rem",
            marginTop: 0,
            marginBottom: 0,
            textAlign: "start",
            fontWeight: "bold",
          }}
        >
          <Link href={`/portfolio/detail/${props.portfolio_id}`}>
            <a className="hoverAtag">{props.title}</a>
          </Link>
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            float: "left",
            marginRight: "30px",
          }}
        >
          <span className="tag">
            <Link href={`/${props.language}`}>
              <a>{props.language}</a>
            </Link>
          </span>
          {props.tags && props.tags.length > 0 && (
            <>
              {props.tags.map((tag, i) => (
                <span key={`profile_tag_i_${i}`} className="tag">
                  <Link href={`/${tag}`}>
                    <a>{tag}</a>
                  </Link>
                </span>
              ))}
            </>
          )}
        </div>
        <Link href={`/portfolio/detail/${props.portfolio_id}`}>
          <a>
            <div style={{ float: "right" }}>
              <Badge
                color="secondary"
                badgeContent={props.comment.length}
                style={{ marginRight: 10 }}
              >
                <MailIcon style={{ color: "#1369e9", marginRight: 5 }} />
              </Badge>
              <IconButton disabled style={{ marginRight: 20, color: "#000" }}>
                <Badge color="secondary" badgeContent={props.good.length}>
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </div>
          </a>
        </Link>
      </div>
    </Card>
  );
};
export default PortfolioCard;
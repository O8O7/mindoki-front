import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

import Image from "next/image";
import Link from "next/link";

const PortfolioCard = (props) => {
  return (
    <Card
      sx={{
        fontSize: { xs: "14px", sm: "16px", md: "18px" },
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0.5em",
        marginBottom: "1em",
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
              height={150}
              width={266}
              alt={"thumbnail"}
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
          marginLeft: "0.4em",
          overflow: "auto",
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
              fontSize: "1em",
              margin: 0,
              marginTop: 0,
              marginBottom: 0,
              marginRight: "1.9em",
            }}
          >
            {props.name}
          </p>
          <p
            style={{
              fontSize: "0.9em",
              margin: "0 0.7em 0 0",
            }}
          >
            投稿日: {props.posted_at}
          </p>
        </div>
        <p
          style={{
            fontSize: "1.1em",
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
            marginRight: "1.9em",
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
                style={{ marginRight: "0.6em" }}
              >
                <MailIcon
                  style={{
                    color: "#1369e9",
                    marginRight: "0.2em",
                    fontSize: "1.5em",
                  }}
                />
              </Badge>
              <IconButton
                disabled
                style={{ marginRight: "0.5em", color: "#000" }}
              >
                <Badge color="secondary" badgeContent={props.good.length}>
                  <FavoriteBorderIcon sx={{ fontSize: "0.9em" }} />
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

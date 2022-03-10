import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

import AvatarIcon from "../UIKit/AvatorIcon";

const PostCard = (props) => {
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
    >
      <Link href={`/profile/detail/${props.user_id}`}>
        <a>
          <div
            style={{
              height: "60px",
              width: "60px",
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
              height="60"
              width="60"
              src={props.src}
              alt={props.name}
              objectFit="cover"
            />
          </div>
        </a>
      </Link>
      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "left",
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
          <Link href={`/article/detail/${props.article_id}`}>
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
                <span key={`article_tag_i_${i}`} className="tag">
                  <Link href={`/${tag}`}>
                    <a>{tag}</a>
                  </Link>
                </span>
              ))}
            </>
          )}
        </div>
        <Link href={`/article/detail/${props.article_id}`}>
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
export default PostCard;
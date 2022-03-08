import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";

import Link from "next/link";
import Markdown from "../Markdown";
import ArticleGood from "../UIKit/ArticleGood";
import AvatarIcon from "../UIKit/AvatorIcon";
import EditButton from "../UIKit/EditButton";

const ArticleDetail = (props) => {
  return (
    <>
      <Card
        sx={{
          marginBottom: 1,
          boxShadow:
            "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(209, 209, 209)",
          padding: "1em",
          position: "relative",
        }}
        className="CardSize"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          {props.user_image && props.user_name ? (
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
                    alt={props.user_name}
                    src={props.user_image}
                    width="70"
                    height="70"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
          ) : (
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
                alt="テストユーザー"
                src={"/profile.png"}
                width="70"
                height="70"
                objectFit="cover"
              />
            </div>
          )}
          <div>
            <p style={{ fontSize: "1.2rem", margin: 0 }}>
              <Link href={`/profile/detail/${props.user_id}`}>
                <a className="hoverAtag">{props.user_name}</a>
              </Link>
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                marginTop: 5,
                marginBottom: 5,
                fontWeight: "bold",
              }}
            >
              {props.title}
            </p>
          </div>
        </div>
        <EditButton />
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span className="tag">
              {props.language ? (
                <Link href={`/${props.language}`}>
                  <a>{props.language}</a>
                </Link>
              ) : (
                "言語が入ります"
              )}
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
          {props.posted_at == props.edited_at ? (
            <span
              style={{
                fontSize: "1em",
                marginRight: 5,
                display: "inline-block",
                marginTop: "7px",
              }}
            >
              投稿日: {props.posted_at}
            </span>
          ) : (
            <>
              <span
                style={{
                  fontSize: "1em",
                  marginRight: 5,
                  display: "inline-block",
                  marginTop: "7px",
                }}
              >
                投稿日: {props.posted_at}
              </span>
              |
              <span style={{ fontSize: "1em", marginLeft: 5 }}>
                更新日: {props.edited_at}
              </span>
            </>
          )}
          <div style={{ float: "right" }}>
            <Badge
              color="secondary"
              badgeContent={props.comment.length}
              style={{ marginRight: 10 }}
            >
              <MailIcon style={{ color: "#1369e9", marginRight: 5 }} />
            </Badge>
            <ArticleGood id={props.article_id} good={props.good} />
          </div>
        </div>
        <Markdown description={props.description} />
      </Card>
    </>
  );
};
export default ArticleDetail;

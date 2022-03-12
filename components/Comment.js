import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import Markdown from "./Markdown";
import CommentGood from "./UIKit/CommentGood";

const Comment = (props) => {
  return (
    <>
      <Card
        sx={{
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          padding: 1,
          marginBottom: 1,
          boxShadow:
            "0px 2px 3px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(209 209 209)",
          padding: 2,
        }}
      >
        <div
          style={{
            marginBottom: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "0.8rem", margin: 0, marginLeft: 5 }}>
              名前 {props.username}
            </p>
          </div>
          <CommentGood good={props.good} id={props.id} />
        </div>
        <Divider />
        <div>
          <span
            style={{
              fontSize: "0.7rem",
              display: "inline-block",
              marginTop: "7px",
            }}
          >
            投稿日: {props.posted_at}
          </span>
        </div>
        <Markdown description={props.comment} />
      </Card>
    </>
  );
};
export default Comment;

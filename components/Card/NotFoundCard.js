import Card from "@mui/material/Card";

const NotFoundCard = (props) => {
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
      <div style={{ width: "100%" }}>
        <h4 style={{ textAlign: "center" }}>まだ投稿はありません</h4>
      </div>
    </Card>
  );
};
export default NotFoundCard;

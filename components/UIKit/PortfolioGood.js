import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PortfolioGood = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [favo, setFavo] = useState(
    user && props.good.length ? props.good.includes(user.user.id) : false
  );

  const id = props.id;

  const favoClick = () => {
    fetch(`/api/portfolio/good`, {
      method: "POST",
      body: id,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error && data.error === "アクセストークンがありません") {
          alert("ログインしてください");
        }
        if (data.data && data.data.success === "グッドに成功しました") {
          alert("グッドに成功しました");
          setFavo(true);
        } else if (
          data.data &&
          data.data.success === "グッド削除に成功しました"
        ) {
          alert("グッド削除に成功しました");
          setFavo(false);
        }
      });
  };

  return (
    <IconButton onClick={favoClick} style={{ marginRight: 20, color: "#000" }}>
      {favo ? (
        <Badge color="secondary" badgeContent={props.good.length}>
          <FavoriteIcon color="error" />
        </Badge>
      ) : (
        <Badge color="secondary" badgeContent={props.good.length}>
          <FavoriteBorderIcon />
        </Badge>
      )}
    </IconButton>
  );
};

export default PortfolioGood;

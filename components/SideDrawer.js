import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import StarIcon from "@mui/icons-material/Star";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ArticleIcon from "@mui/icons-material/Article";

import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import BugReportIcon from "@mui/icons-material/BugReport";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import Link from "next/link";
import { useRouter } from "next/router";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function SideDrawer(props) {
  const router = useRouter();
  return (
    <>
      <List className="hoverColor">
        <ListItem
          onClick={() => {
            if (props.keyword) {
              router.push(`/question/${props.keyword}`);
            } else {
              router.push("/question");
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <QuestionMarkIcon color="warning" />
          </ListItemIcon>
          <ListItemText primary={"Q&A"} />
        </ListItem>
      </List>
      <List
        onClick={() => {
          if (props.keyword) {
            router.push(`/portfolio/${props.keyword}`);
          } else {
            router.push("/portfolio");
          }
        }}
        className="hoverColor"
      >
        <ListItem>
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <ArtTrackIcon color="success" />
          </ListItemIcon>
          <ListItemText primary={"ポートフォリオ"} />
        </ListItem>
      </List>
      <List
        onClick={() => {
          if (props.keyword) {
            router.push(`/article/${props.keyword}`);
          } else {
            router.push("/article");
          }
        }}
        className="hoverColor"
      >
        <ListItem>
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <ArticleIcon color="info" />
          </ListItemIcon>
          <ListItemText primary={"技術記事"} />
        </ListItem>
      </List>
      <Link href="/portfolio_ranking">
        <a>
          <List className="hoverColor">
            <ListItem>
              <ListItemIcon sx={{ minWidth: "35px" }}>
                <StarIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"人気のポートフォリオ"} />
            </ListItem>
          </List>
        </a>
      </Link>
      <Link href="/article_ranking">
        <a>
          <List className="hoverColor">
            <ListItem>
              <ListItemIcon sx={{ minWidth: "35px" }}>
                <StarIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"人気の記事"} />
            </ListItem>
          </List>
        </a>
      </Link>
      <List
        onClick={() => {
          if (props.keyword) {
            router.push(`/category/${props.keyword}/error`);
          } else {
            router.push("/エラー");
          }
        }}
        className="hoverColor"
      >
        <ListItem>
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <NewReleasesIcon color="error" />
          </ListItemIcon>
          <ListItemText primary={"エラー"} />
        </ListItem>
      </List>
      <List className="hoverColor">
        <ListItem
          onClick={() => {
            if (props.keyword) {
              router.push(`/category/${props.keyword}/チートシート`);
            } else {
              router.push("/チートシート");
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <CodeIcon color="info" />
          </ListItemIcon>
          <ListItemText primary={"チートシート"} />
        </ListItem>
      </List>
      <List
        onClick={() => {
          if (props.keyword) {
            router.push(`/category/${props.keyword}/環境構築`);
          } else {
            router.push("/環境構築");
          }
        }}
        className="hoverColor"
      >
        <ListItem>
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <LaptopChromebookIcon />
          </ListItemIcon>
          <ListItemText primary={"環境構築"} />
        </ListItem>
      </List>
      <List
        onClick={() => {
          if (props.keyword) {
            router.push(`/category/${props.keyword}/テストコード`);
          } else {
            router.push("/テストコード");
          }
        }}
        className="hoverColor"
      >
        <ListItem>
          <ListItemIcon sx={{ minWidth: "35px" }}>
            <BugReportIcon color="warning" />
          </ListItemIcon>
          <ListItemText primary={"テストコード"} />
        </ListItem>
      </List>
    </>
  );
}

export default SideDrawer;

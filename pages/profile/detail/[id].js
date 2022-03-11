import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleIcon from "@mui/icons-material/Article";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Link from "next/link";

import PostCard from "../../../components/Card/PostCard";
import PortfolioCard from "../../../components/Card/PortfolioCard";

import { useRouter } from "next/router";
import useSWR from "swr";
import AvatarIcon from "../../../components/UIKit/AvatorIcon";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProfileDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/${id}/` : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <div className="wrapper" style={{ paddingTop: "170px" }}>
        <div className="profile-card">
          <div className="profileImg">
            <AvatarIcon
              width={150}
              height={150}
              src={data.image}
              alt="profile card"
            />
          </div>

          <div className="profileDetail">
            <Link href={"/"}>
              <a>
                <CloseIcon
                  className="close"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 2,
                    fontSize: "50px",
                  }}
                />
              </a>
            </Link>
            <div className="profileName">{data.name}</div>
            <Box sx={{ bgcolor: "background.paper" }}>
              <List
                disablePadding
                sx={{
                  display: "flex",
                }}
              >
                {/*  */}
                <ListItem disablePadding>
                  <ListItemButton
                    disabled
                    sx={{ maxWidth: "200px", margin: "0 auto" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "100px",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, margin: "0 auto" }}>
                        <PermIdentityIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          textAlign: "center",
                        }}
                        primary="フォロー"
                      />
                    </div>
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                      className="listItemFlex"
                      primary={data ? `${data.following.length}人` : "?人"}
                    />
                  </ListItemButton>
                </ListItem>
                {/*  */}
                <ListItem disablePadding>
                  <ListItemButton
                    disabled
                    sx={{ maxWidth: "200px", margin: "0 auto" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "100px",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, margin: "0 auto" }}>
                        <PermIdentityIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          textAlign: "center",
                        }}
                        primary="フォロワー"
                      />
                    </div>
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                      className="listItemFlex"
                      primary={data ? `${data.followers.length}人` : "?人"}
                    />
                  </ListItemButton>
                </ListItem>
                {/*  */}
              </List>
              {data.introduction}
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <ListItem disablePadding sx={{ marginBottom: 1 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary="記事" />
                  </ListItemButton>
                </ListItem>

                {data.article &&
                  data.article.length > 0 &&
                  data.article.map((article, i) => (
                    <div key={`profile_article${i}`}>
                      <PostCard
                        article_id={article.id}
                        user_id={article.username.id}
                        // src={article.username.image}
                        src={data.image}
                        name={article.username.name}
                        language={article.language.name}
                        title={article.title}
                        tags={article.tag}
                        description={article.description}
                        edited_at={article.edited_at}
                        posted_at={article.posted_at}
                        is_public={article.is_public}
                        comment={article.comment}
                        good={article.good}
                      />
                    </div>
                  ))}

                <ListItem disablePadding sx={{ marginBottom: 1, marginTop: 2 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ArtTrackIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="ポートフォリオ" />
                  </ListItemButton>
                </ListItem>

                {data.portfolio &&
                  data.portfolio.length > 0 &&
                  data.portfolio.map((portfolio, i) => (
                    <div key={`profile_portfolio${i}`}>
                      <PortfolioCard
                        user_id={portfolio.username.id}
                        portfolio_id={portfolio.id}
                        name={portfolio.username.name}
                        language={portfolio.language.name}
                        thumbnail={portfolio.image[0].image}
                        title={portfolio.title}
                        tags={portfolio.tag}
                        description={portfolio.description}
                        posted_at={portfolio.posted_at}
                        edited_at={portfolio.edited_at}
                        is_public={portfolio.is_public}
                        comment={portfolio.comment}
                        good={portfolio.good}
                      />
                    </div>
                  ))}
              </List>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;

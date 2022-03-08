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
import useSWR from "swr";

import PortfolioCard from "../components/Card/PortfolioCard";
import PostCard from "../components/Card/PostCard";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import FriendDialog from "../components/UIKit/FriendDialog";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Profile = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const { data: followingData, error: followingDataError } = useSWR(
    "/api/friend/following",
    fetcher
  );

  const { data: followerData, error: followerDataError } = useSWR(
    "/api/friend/follower",
    fetcher
  );

  if (followingDataError) return <div>Failed to load</div>;
  if (!followingData) return <div>Loading...</div>;

  if (followerDataError) return <div>Failed to load</div>;
  if (!followerData) return <div>Loading...</div>;

  return (
    <>
      <div className="wrapper" style={{ paddingTop: "170px" }}>
        <div className="profile-card">
          <div className="profileImg">
            {user ? (
              <Image
                src={user.user.image}
                alt={user.user.name}
                objectFit="contain"
                layout="fill"
              />
            ) : (
              <Image
                src="/404Error.png"
                alt="notFound"
                objectFit="contain"
                layout="fill"
              />
            )}
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
            <div className="profileName">
              {user ? user.user.name : "ログインしてください"}
            </div>
            <Box sx={{ bgcolor: "background.paper" }}>
              <List
                disablePadding
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/*  */}
                <FriendDialog data={user ? followingData.data : ""}>
                  <ListItem disablePadding>
                    <ListItemButton>
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
                        primary={
                          user &&
                          followingData &&
                          followerData.data &&
                          followerData.data.length > 0
                            ? `${Object.keys(followingData.data).length}人`
                            : "?人"
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </FriendDialog>
                {/*  */}
                <FriendDialog data={followerData.data}>
                  <ListItem disablePadding>
                    <ListItemButton>
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
                        primary={
                          user &&
                          followerData &&
                          followerData.data &&
                          followerData.data.length > 0
                            ? `${Object.keys(followerData.data).length}人`
                            : "?人"
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </FriendDialog>
                {/*  */}
              </List>
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

                {user && (
                  <>
                    {user.user.article.map((article, i) => (
                      <div key={`article_${i}`} className="postcard">
                        <PostCard
                          article_id={article.id}
                          user_id={article.username.id}
                          src={article.username.image}
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
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {data && data.previous ? (
                        <Button
                          onClick={() => {
                            setPageURL(data.previous);
                            window.scroll({ top: 0 });
                          }}
                          startIcon={<ChevronLeftIcon />}
                          variant="contained"
                        >
                          前のページへ
                        </Button>
                      ) : (
                        <Button
                          startIcon={<ChevronLeftIcon />}
                          variant="contained"
                          disabled
                        >
                          前のページへ
                        </Button>
                      )}
                      {data && data.next ? (
                        <Button
                          onClick={() => {
                            setPageURL(data.next);
                            window.scroll({ top: 0 });
                          }}
                          endIcon={<ChevronRightIcon />}
                          variant="contained"
                        >
                          次のページへ
                        </Button>
                      ) : (
                        <Button
                          endIcon={<ChevronRightIcon />}
                          variant="contained"
                          disabled
                        >
                          次のページへ
                        </Button>
                      )}
                    </div> */}
                  </>
                )}

                <ListItem disablePadding sx={{ marginBottom: 1, marginTop: 2 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ArtTrackIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="ポートフォリオ" />
                  </ListItemButton>
                </ListItem>
                {user && (
                  <>
                    {user.user.portfolio.map((portfolio, i) => (
                      <div key={`portfolio_${i}`}>
                        <PortfolioCard
                          user_id={portfolio.username.id}
                          // user_image={portfolio.username.image}
                          portfolio_id={portfolio.id}
                          name={portfolio.username.name}
                          language={portfolio.language.name}
                          thumbnail={portfolio.image[0]}
                          title={portfolio.title}
                          tags={portfolio.tag}
                          description={portfolio.description}
                          edited_at={portfolio.edited_at}
                          posted_at={portfolio.posted_at}
                          is_public={portfolio.is_public}
                          comment={portfolio.comment}
                          good={portfolio.good}
                        />
                      </div>
                    ))}
                  </>
                )}
              </List>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

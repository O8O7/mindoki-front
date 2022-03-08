import Box from "@mui/material/Box";
import SearchUIKit from "../../components/SearchUIKit";
import { Typography } from "@mui/material";
import PostCard from "../../components/Card/PostCard";
import NotFoundCard from "../../components/Card/NotFoundCard";
import AvatarCard from "../../components/AvatarCard";
import IconBreadcrumbs from "../../components/IconBreadcrumbs";

import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const drawerWidth = 230;
const rightDrawer = 300;

const ArticleSearchPage = () => {
  const router = useRouter();
  const { param } = router.query;

  const [pageURL, setPageURL] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/api/article_list_large/?tag=${param}`
  );

  const { data, error } = useSWR(pageURL, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 5,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <IconBreadcrumbs page={`${param}の記事一覧`} />
        <SearchUIKit />
        <Typography variant="h5" gutterBottom className="postHeading">
          {param}を含む記事全{data.count}件
        </Typography>
        {data && data.results ? (
          <>
            {data.results.map((article, i) => (
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
          </>
        ) : (
          <NotFoundCard />
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <Button endIcon={<ChevronRightIcon />} variant="contained" disabled>
              次のページへ
            </Button>
          )}
        </div>
      </Box>
      <AvatarCard />
    </>
  );
};

export default ArticleSearchPage;

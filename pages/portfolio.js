import Box from "@mui/material/Box";
import SearchUIKit from "../components/SearchUIKit";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import { Typography } from "@mui/material";
import PortfolioCard from "../components/Card/PortfolioCard";
import useSWR from "swr";
import NotFoundCard from "../components/Card/NotFoundCard";
import { useState } from "react";
import { Button } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import AvatarCard from "../components/AvatarCard";
import PostButton from "../components/UIKit/PostButton";

const drawerWidth = 230;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function ResponsiveDrawer() {
  const [pageURL, setPageURL] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/list_large/`
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
        <IconBreadcrumbs page="ポートフォリオ一覧" />
        <SearchUIKit />
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          最新ポートフォリオ投稿
          {data && data.results && data.results.length && ` 全${data.count}件`}
        </Typography>
        {data && data.results && data.results.length ? (
          <>
            {data.results.map((portfolio, i) => (
              <div key={`portfolio_${i}`}>
                <PortfolioCard
                  //   user_id={portfolio.username.id}
                  // user_image={portfolio.username.image}
                  portfolio_id={portfolio.id}
                  name={portfolio.username.name}
                  language={portfolio.language.name}
                  thumbnail={portfolio.image[0].image}
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
      <PostButton />
    </>
  );
}

export default ResponsiveDrawer;

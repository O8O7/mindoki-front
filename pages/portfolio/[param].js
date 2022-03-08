import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import SearchUIKit from "../../components/SearchUIKit";
import IconBreadcrumbs from "../../components/IconBreadcrumbs";
import { Typography } from "@mui/material";
import PortfolioCard from "../../components/Card/PortfolioCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import NotFoundCard from "../../components/Card/NotFoundCard";
import AvatarCard from "../../components/AvatarCard";

import { useState } from "react";
import { Button } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 230;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function PortfolioSearchFilterPage() {
  const router = useRouter();
  const { param } = router.query;
  const [pageURL, setPageURL] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio_list_large/?tag=${param}`
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
        <IconBreadcrumbs page={`${param}のポートフォリオ一覧`} />
        <SearchUIKit />
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          {param}を含むポートフォリオ全{data.count}件
        </Typography>
        {data && data.results ? (
          <>
            {data.results.map((portfolio, i) => (
              <div key={`portfolio_${i}`}>
                <PortfolioCard
                  portfolio_id={portfolio.id}
                  user_id={portfolio.username.id}
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
        ) : (
          <NotFoundCard />
        )}
        <Divider />

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
}

export default PortfolioSearchFilterPage;

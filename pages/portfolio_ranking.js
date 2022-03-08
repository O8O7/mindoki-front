import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import SearchUIKit from "../components/SearchUIKit";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import { Typography } from "@mui/material";
import PortfolioCard from "../components/Card/PortfolioCard";
import NotFoundCard from "../components/Card/NotFoundCard";

import AvatarCard from "../components/AvatarCard";
import PostButton from "../components/UIKit/PostButton";

const drawerWidth = 230;

function PortfolioRanking({ data }) {
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
        <IconBreadcrumbs page="人気のポートフォリオ投稿" />
        <SearchUIKit />
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          人気のポートフォリオ投稿
        </Typography>
        {data && data.results.length ? (
          <>
            {data.results.map((portfolio, i) => (
              <div key={`portfolio_${i}`}>
                <PortfolioCard
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
        ) : (
          <NotFoundCard />
        )}
        <Divider />
      </Box>
      <AvatarCard />
      <PostButton />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio_good_ranking/`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default PortfolioRanking;

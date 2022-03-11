import Box from "@mui/material/Box";

import SearchUIKit from "../components/SearchUIKit";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import { Typography } from "@mui/material";
import PostCard from "../components/Card/PostCard";

import AvatarCard from "../components/AvatarCard";
import PostButton from "../components/UIKit/PostButton";

const drawerWidth = 230;

function article_ranking({ data }) {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          p: "1em",
          marginTop: 5,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <IconBreadcrumbs page="人気記事" />
        <SearchUIKit />
        <Typography variant="h5" gutterBottom className="postHeading">
          人気記事
        </Typography>
        {data && (
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
        )}
      </Box>
      <AvatarCard />
      <PostButton />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/article/good_ranking/`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default article_ranking;

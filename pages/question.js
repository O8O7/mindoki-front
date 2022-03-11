import Box from "@mui/material/Box";

import SearchUIKit from "../components/SearchUIKit";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import { Typography } from "@mui/material";
import useSWR from "swr";
import { useState } from "react";
import { Button } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import QuestionCard from "../components/Card/QuestionCard";
import AvatarCard from "../components/AvatarCard";
import PostButton from "../components/UIKit/PostButton";
import NotFoundCard from "../components/Card/NotFoundCard";

const drawerWidth = 230;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Question() {
  const [pageURL, setPageURL] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/api/question/list_large/`
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
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          p: "1em",
          marginTop: 5,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <IconBreadcrumbs page="質問一覧" />
        <SearchUIKit />
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          最新Q&A投稿一覧{data && data.results.length && ` 全${data.count}件`}
        </Typography>
        {data && data.results.length ? (
          <>
            {data.results.map((question, i) => (
              <div key={`question_${i}`} className="postcard">
                <QuestionCard
                  question_id={question.id}
                  user_id={question.username.id}
                  src={question.username.image}
                  name={question.username.name}
                  language={question.language.name}
                  title={question.title}
                  tags={question.tag}
                  description={question.description}
                  edited_at={question.edited_at}
                  posted_at={question.posted_at}
                  is_public={question.is_public}
                  comment={question.comment}
                  good={question.good}
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

export default Question;

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";

import SearchUIKit from "../../components/SearchUIKit";
import { Pagination } from "@mui/material";
import IconBreadcrumbs from "../../components/IconBreadcrumbs";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { Button } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import QuestionCard from "../../components/Card/QuestionCard";
import AvatarCard from "../../components/AvatarCard";

const drawerWidth = 230;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Question() {
  const router = useRouter();
  const { param } = router.query;

  const [pageURL, setPageURL] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/api/question/list_large/?tag=${param}`
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
        <IconBreadcrumbs page={`${param}のQ&A投稿一覧`} />
        <SearchUIKit />
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          {param}のQ&A投稿全{data.count}件
        </Typography>
        {data && (
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

export default Question;

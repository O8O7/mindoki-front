import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import SearchUIKit from "../../../components/SearchUIKit";
import QuestionDetail from "../../../components/Detail/QuestionDetail";
import IconBreadcrumbs from "../../../components/IconBreadcrumbs";
import Comment from "../../../components/Comment";
import AvatarCard from "../../../components/AvatarCard";
import CommentForm from "../../../components/Form/CommentForm";
import { useRouter } from "next/router";
import useSWR from "swr";

const drawerWidth = 230;
const rightDrawer = 300;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function ResponsiveDrawer() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/question/${id}/` : null,
    fetcher
  );

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
          width: { md: `calc(100% - ${drawerWidth}px - ${rightDrawer}px)` },
        }}
      >
        <IconBreadcrumbs page="記事詳細" />
        <SearchUIKit />
        {data && (
          <QuestionDetail
            question_id={data.id}
            user_id={data.username.id}
            user_name={data.username.name}
            user_image={data.username.image}
            language={data.language.name}
            title={data.title}
            tag={data.tag}
            description={data.description}
            edited_at={data.edited_at}
            posted_at={data.posted_at}
            comment={data.comment}
            good={data.good}
          />
        )}
        <Divider />
        {data.comment &&
          data.comment.map((com, i) => (
            <div key={`question_comment${i}`}>
              <Comment
                id={com.id}
                username={com.username.name}
                comment={com.comment}
                posted_at={com.posted_at}
                good={com.good}
              />
            </div>
          ))}
        <CommentForm category="question" id={id} />
      </Box>
      <AvatarCard />
    </>
  );
}

export default ResponsiveDrawer;

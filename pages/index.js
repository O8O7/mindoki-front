import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import AvatarCard from "../components/AvatarCard";
import PostCard from "../components/Card/PostCard";
import SearchUIKit from "../components/SearchUIKit";
import PortfolioCard from "../components/Card/PortfolioCard";
import QuestionCard from "../components/Card/QuestionCard";

import Link from "next/link";
import { Button } from "@mui/material";
import NotFoundCard from "../components/Card/NotFoundCard";
import PostButton from "../components/UIKit/PostButton";

const drawerWidth = 230;

function Index({ article, portfolio, question }) {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <SearchUIKit />
        <Typography variant="h5" gutterBottom className="postHeading">
          最新記事一覧
        </Typography>

        {article && article.results.length ? (
          <>
            {article.results.map((article, i) => (
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
        {article.count > 3 && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <Link href={"/article"}>
              <a>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                >
                  最新記事一覧へ
                </Button>
              </a>
            </Link>
          </div>
        )}
        <Divider sx={{ marginTop: 2 }} />
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          最新Q&A投稿
        </Typography>
        {question && question.results.length ? (
          <>
            {question.results.map((question, i) => (
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

        {question.count > 3 && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <Link href={"/question"}>
              <a>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                >
                  最新Q&A一覧へ
                </Button>
              </a>
            </Link>
          </div>
        )}
        <Typography
          variant="h5"
          gutterBottom
          className="postHeading"
          sx={{ marginTop: 3 }}
        >
          最新ポートフォリオ投稿
        </Typography>
        {portfolio && portfolio.results.length ? (
          <>
            {portfolio.results.map((portfolio, i) => (
              <div key={`portfolio_${i}`}>
                <PortfolioCard
                  user_id={portfolio.username.id}
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
        {portfolio.count > 3 && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <Link href={"/portfolio"}>
              <a>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                >
                  最新ポートフォリオ一覧へ
                </Button>
              </a>
            </Link>
          </div>
        )}
      </Box>
      <AvatarCard />
      <PostButton />
    </>
  );
}

export async function getServerSideProps() {
  const article_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/article/list/`
  );
  const article = await article_res.json();

  const portfolio_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/list/`
  );
  const portfolio = await portfolio_res.json();

  const question_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/question/list/`
  );
  const question = await question_res.json();

  return {
    props: {
      article,
      portfolio,
      question,
    },
  };
}

export default Index;

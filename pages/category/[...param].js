import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

import AvatarCard from "../../components/AvatarCard";
import PostCard from "../../components/Card/PostCard";
import SearchUIKit from "../../components/SearchUIKit";
import PortfolioCard from "../../components/Card/PortfolioCard";
import QuestionCard from "../../components/Card/QuestionCard";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import NotFoundCard from "../../components/Card/NotFoundCard";

import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const drawerWidth = 230;
const rightDrawer = 300;

function SearchHome() {
  const router = useRouter();
  const { param } = router.query;

  const { data: article, error: articleError } = useSWR(
    param
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/article/list/?lang=${param[0]}&tag=${param[1]}`
      : null,
    fetcher
  );

  const { data: question, error: questionError } = useSWR(
    param
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/question/list/?lang=${param[0]}&tag=${param[1]}`
      : null,
    fetcher
  );

  const { data: portfolio, error: portfolioError } = useSWR(
    param
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/list/?lang=${param[0]}&tag=${param[1]}`
      : null,
    fetcher
  );

  if (articleError) return <div>Failed to load</div>;
  if (questionError) return <div>Failed to load</div>;
  if (portfolioError) return <div>Failed to load</div>;
  //   if (!data) return <div>Loading...</div>;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          p: "1em",
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <SearchUIKit />

        <h2 style={{ backgroundColor: "#bddb84", padding: "10px" }}>
          {param && (
            <>
              {param[0]}&{param[1]}の検索結果
            </>
          )}
        </h2>
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
        {article && article.results.length > 3 && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <Link href={`/article/${param}`}>
              <a>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                >
                  {param && param[1]}の記事一覧へ
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

        {question && question.results.length > 3 && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <Link href={`/question/${param}`}>
              <a>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                >
                  {param && param[1]}のQ&A一覧へ
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
          最新ポートフォリオ投稿
        </Typography>
        {portfolio && portfolio.results.length > 0 ? (
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
        {portfolio && portfolio.results.length > 3 && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <Link href={`/portfolio/${param}`}>
              <a>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                >
                  {param && param[1]}のポートフォリオ一覧へ
                </Button>
              </a>
            </Link>
          </div>
        )}
      </Box>
      <AvatarCard />
      {/* </Box> */}
      <Link href={"/postform"} passHref>
        <div className="postButton" style={{ zIndex: 2 }}>
          <a>
            <EditIcon
              sx={{
                width: 65,
                height: 65,
              }}
              fontSize="large"
            />
          </a>
        </div>
      </Link>
    </>
  );
}

export default SearchHome;

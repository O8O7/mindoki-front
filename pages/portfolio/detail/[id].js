import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import SearchUIKit from "../../../components/SearchUIKit";
import IconBreadcrumbs from "../../../components/IconBreadcrumbs";
import Comment from "../../../components/Comment";
import AvatarCard from "../../../components/AvatarCard";
import CommentForm from "../../../components/Form/CommentForm";
import PortfolioGood from "../../../components/UIKit/PortfolioGood";
import AvatarIcon from "../../../components/UIKit/AvatorIcon";

import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Markdown from "../../../components/Markdown";

const drawerWidth = 230;
const rightDrawer = 300;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function PortfolioDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${id}/` : null,
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
          p: 1,
          marginTop: 5,
          width: { md: `calc(100% - ${drawerWidth}px - ${rightDrawer}px)` },
        }}
      >
        <IconBreadcrumbs page="ポートフォリオ詳細" />
        <SearchUIKit />
        <Card
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
            marginBottom: 1,
            boxShadow:
              "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(209, 209, 209)",
            padding: "1em",
          }}
          className="CardSize"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginBottom: 7,
            }}
          >
            <Link href={`/profile/detail/${data.username.id}`}>
              <a>
                <div
                  style={{
                    height: "3.5em",
                    width: "3.5em",
                    borderRadius: "50%",
                    boxShadow:
                      "0px 5px 8px 0px rgb(7 0 30), 0px 0px 0px 2px rgb(17 177 17)",
                    overflow: "hidden",
                    margin: "0 auto",
                    marginRight: "0.7em",
                    marginLeft: "0.4em",
                  }}
                >
                  <AvatarIcon
                    alt={data.username.name}
                    src={data.username.image}
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
            <div>
              <p style={{ fontSize: "1.2em", margin: 0 }}>
                <Link href={`/profile/detail/${data.username.id}`}>
                  <a className="hoverAtag">{data.username.name}</a>
                </Link>
              </p>
              <p style={{ fontSize: "1.2em", marginTop: 5, marginBottom: 5 }}>
                {data.title}
              </p>
            </div>
          </div>
          <Divider sx={{ marginBottom: 2 }} />

          {/* 画像が一枚の場合 */}
          {data.image.length == 1 && (
            <div className="slider_container">
              <div className="carousel__container">
                <CarouselProvider
                  visibleSlides={1}
                  currentSlide={0}
                  totalSlides={data.image.length}
                  naturalSlideWidth={300}
                  naturalSlideHeight={190}
                  interval={2500}
                  // hasMasterSpinner
                  infinite
                >
                  <Slider>
                    {data.image.map((src, i) => (
                      <Slide index={i} key={`slider_image_${i}`}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Image
                            className="slider_image"
                            // src={`/404Error.pngs`}
                            alt="slider_image"
                            src={src.image}
                            layout="fill"
                            objectFit="fill"
                            priority
                          />
                        </div>
                      </Slide>
                    ))}
                  </Slider>
                </CarouselProvider>
              </div>
            </div>
          )}
          {data.image.length > 1 && (
            <div className="slider_container">
              <div className="carousel__container">
                <CarouselProvider
                  visibleSlides={1}
                  currentSlide={0}
                  totalSlides={data.image.length}
                  naturalSlideWidth={300}
                  naturalSlideHeight={190}
                  interval={2500}
                  // hasMasterSpinner
                  infinite
                >
                  <Slider>
                    {data.image.map((src, i) => (
                      <Slide index={i} key={`slider_image_${i}`}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Image
                            id={`image_${i}`}
                            className="slider_image"
                            alt="slider image"
                            src={src.image}
                            layout="fill"
                            objectFit="fill"
                            priority
                          />
                        </div>
                      </Slide>
                    ))}
                  </Slider>
                  <ButtonBack>
                    <ArrowCircleLeftIcon
                      className="arrow_icon"
                      sx={{ visibility: "visible" }}
                    />
                  </ButtonBack>
                  <ButtonNext>
                    <ArrowCircleRightIcon
                      className="arrow_icon"
                      sx={{ visibility: "visible" }}
                    />
                  </ButtonNext>
                  <DotGroup className="dotButton" />
                </CarouselProvider>
              </div>
            </div>
          )}

          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span className="tag">
                <Link href={`/${data.language.name}`}>
                  <a>{data.language.name}</a>
                </Link>
              </span>
              {data.tag && data.tag.length > 0 && (
                <>
                  {data.tag.map((tag, i) => (
                    <span key={`article_tag_i_${i}`} className="tag">
                      <Link href={`/${tag}`}>
                        <a>{tag}</a>
                      </Link>
                    </span>
                  ))}
                </>
              )}
            </div>
            {data.posted_at == data.edited_at ? (
              <span
                style={{
                  fontSize: "1em",
                  marginRight: 5,
                  display: "inline-block",
                  marginTop: "7px",
                }}
              >
                投稿日: {data.posted_at}
              </span>
            ) : (
              <>
                <span
                  style={{
                    fontSize: "1em",
                    marginRight: 5,
                    display: "inline-block",
                    marginTop: "7px",
                  }}
                >
                  投稿日: {data.posted_at}
                </span>
                |
                <span style={{ fontSize: "1em", marginLeft: 5 }}>
                  更新日: {data.edited_at}
                </span>
              </>
            )}
            <div style={{ float: "right" }}>
              <Badge
                color="secondary"
                badgeContent={data.comment.length}
                style={{ marginRight: "0.6em" }}
              >
                <MailIcon style={{ color: "#1369e9", marginRight: "0.2em" }} />
              </Badge>
              <PortfolioGood id={data.id} good={data.good} />
            </div>
          </div>
          <Markdown description={data.description} />
        </Card>
        {data.comment &&
          data.comment.map((com, i) => (
            <div key={`portfolio_comment_${i}`}>
              <Comment
                id={com.id}
                username={com.username.name}
                comment={com.comment}
                posted_at={com.posted_at}
                good={com.good}
              />
            </div>
          ))}
        <CommentForm category="portfolio" id={id} />
      </Box>
      <AvatarCard />
    </>
  );
}

// export async function getStaticProps() {
//     const portfolio = await fetch()
// }

export default PortfolioDetail;

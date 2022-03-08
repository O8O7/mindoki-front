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

import Image from "next/image";

const ImageSlider = (props) => {
  return (
    <div className="slider_container">
      <div className="carousel__container">
        <CarouselProvider
          visibleSlides={1}
          currentSlide={1}
          totalSlides={props.thumbnailList.length}
          naturalSlideWidth={300}
          naturalSlideHeight={190}
          interval={2500}
          // hasMasterSpinner
          infinite
        >
          <Slider>
            {props.thumbnailList.map((src, i) => (
              <Slide key={`slider_image_${i + 1}`} index={i}>
                <Image
                  className="slider_image"
                  src={src}
                  //   layout="fill"
                  //   objectFit="contain"
                  objectFit="fill"
                />
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
  );
};

export default ImageSlider;

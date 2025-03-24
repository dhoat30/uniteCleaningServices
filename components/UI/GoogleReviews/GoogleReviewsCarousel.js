'use client';

import { useRef } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Slider from "react-slick";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";

var settings = {
  dots: true,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  centerMode: true,
  centerPadding: "40px",
  draggable: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function GoogleReviewsCarousel({data, className}) {
  if (!data && data.length === 0) return null;
  console.log(data)
  // slider arrow functionality
  const sliderRef = useRef(null);


  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  // filter review comment 
  const filteredReviewData = data.filter((item) => { 
    return (    item.stars === 5 &&
      typeof item.text === "string" 
      )
  });

  const testimonialCardsJSX = filteredReviewData.map(
    (item, index) => {
      if (index > 10) return null;
      return (
        <GoogleReviewCard
          key={index}
          name={item.name}
          description={item.text}
          customerPic={item.reviewerPhotoUrl}
          characterLimit={80}
        />
      );
    }
  );

  return (
    <Section className={className}>
      <Container maxWidth="xl">
      <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
          Google Reviews
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description mt-16"
            align="center"
          >
Explore authentic customer feedback and see why people trust us. Each review reflects the quality and dedication we bring to every service we provide.        </Typography>


        </div>
        <div className="arrows-wrapper">
          <CarouselArrows next={next} previous={previous} />
        </div>
      </Container>
      <div className="carousel-wrapper mt-16">
        <Slider ref={sliderRef} {...settings}>
          {testimonialCardsJSX}
        </Slider>
      </div>
      <Container maxWidth="xl" className="cta-wrapper mt-40">
        <Link href={"https://g.page/r/CfiZybByiY7_EAE/review"} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
           Leave a Review 
          </Button>
        </Link>
        <Link href="/customer-reviews">
          <Button variant={`outlined`}>
            Read All Reviews
          </Button>
        </Link>
      </Container>
    </Section>
  );
}

const Section = styled.section`
background:var(--light-surface-container);
  border-top: 1px solid var(--light-outline-variant);
  border-bottom: 1px solid var(--light-outline-variant);
  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .arrows-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .carousel-wrapper {
  }
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap; 
  }
`;

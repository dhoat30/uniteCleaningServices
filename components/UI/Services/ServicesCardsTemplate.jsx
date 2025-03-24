"use client";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import ServiceCard from "../Card/ServiceCard";
import Button from "@mui/material/Button";
export default function ServicesCardsTemplate({
  subtitle,
  title,
  description,
  cards,
  archivePageSlug,
  showLimitedServices = false,
}) {
  if (!cards.length > 0) return null;
  // reverse the order of the cards
  const reversedCards = [...cards].reverse();

  const serviceCards = reversedCards.map((item, key) => {
    if (showLimitedServices && key > 2) return null;
    return (
      <ServiceCard
        key={key}
        cta={{
          label: "LEARN MORE",
          link: `/${archivePageSlug}/${item.slug}`,
        }}
        image={item.acf.hero_section.image}
        title={item.title.rendered}
        description={item.excerpt?.rendered}
        sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 30vw"

      />
    );
  });
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        {subtitle && (
          <Typography component="h3" variant="h3" className="subtitle">
            {subtitle}
          </Typography>
        )}

        <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description"
            align="center"
          >
            {description}
          </Typography>
        </div>
        <div className="cards-wrapper mt-32">{serviceCards}</div>
        {showLimitedServices && (
          <div className="button-wrapper flex justify-center mt-24" >
          <Button
            className="archive-button"
            size="large"
            variant="contained"
            color="primary"
            href="/services"
          >
            View all services
          </Button>
          </div> 
        )}
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--light-surface-container-lowest);

  padding: 80px 0;
  @media (max-width: 900px) {
    padding: 40px 0;
  }

  .title-row {
    max-width: 1000px;
    margin: 0 auto;
    .title {
    }
    .subtitle {
    }
    .description {
      margin-top: 16px;
    }
  }
  .cards-wrapper {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1100px) {
      gap: 16px;

      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 650px) {
      grid-template-columns: 1fr;
    }
    .card {
      border-radius: 8px;
      overflow: hidden;
      background: var(--light-surface-container);
      border: 1px solid var(--light-outline-variant);
      .content-wrapper {
        padding: 16px;
      }
    }
  }
  .archive-button {
  }
`;

'use client'
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function HeroUSP({ data, className }) {
  if (!data) return;
  return (
    <Div className={`${className} hero-usp-wrapper`}>
      <div className="text-usp-wrapper mt-16">
        {data.text_usp.map((item, index) => {
          return (
            <Typography
              variant="subtitle2"
              component="div"
              className="text-usp"
              key={index}
              color="#232e85"
            >
              <CheckCircleIcon />
              <span> {item.value}</span>
            </Typography>
          );
        })}
      </div>
      <div className="image-usp-wrapper">
        {data.image_usp &&
          data.image_usp.map((item, index) => {
            return (
              <Image
                key={index}
                src={item.image.url}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
            );
          })}
      </div>
    </Div>
  );
}

const Div = styled.div`

  .text-usp-wrapper {

  }
  .image-usp-wrapper {
    margin-top: 16px;
  }
  .text-usp-wrapper,
  .image-usp-wrapper {
 
    .text-usp {
      margin-bottom: 8px; 
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

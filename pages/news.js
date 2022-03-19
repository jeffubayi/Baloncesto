
import { Button, Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import styled from "styled-components";

const StyledDiv = styled.div`
  width: "100%",
  margin: 0.2rem 0 0;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(1, auto);
  gap: 1rem;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (min-width: 1300px) {
    grid-template-columns: repeat(2, auto);
    gap: 1.5rem;
    margin: 1rem 0 0;
  }
`;

export default function NewsCard({ newsArray: newsArray }) {
  return (
    <>
      <StyledDiv>
        {newsArray.map((news) => (
            <Card sx={{ borderRadius: "0.3rem" }} elevation={0}>
              <CardMedia
                component="img"
                height={350}
                image={news.media}
                alt="nba"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {news.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={news.link}>
                  <Button size="small"  sx={{ textTransform: "lowerCase",color: "#051c2d" }}>
                    Read more
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
      </StyledDiv>
    </>
  );
}

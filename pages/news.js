import { Button, Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  Typography,
  Box,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";

import Avatar from "@mui/material/Avatar";

import styled from "styled-components";

const StyledDiv = styled.div`
  width: "100%",
  margin: 1rem 0 2rem;
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
    margin: 0.2rem 0 0.5rem;
  }
`;

export default function NewsCard({ newsArray: newsArray }) {
  return (
    <>
      <StyledDiv>
        {newsArray?.map((news) => (
          <Link href={news.link}>
            <Card
              sx={{
                display: "flex",
                borderRadius: "0.5rem",
                boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: "#051c2d", fontSize: "0.75rem", pb: 1 }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{ color: "grey", fontSize: "0.4rem" }}
                  >
                    {news.summary.slice(0, 300)}...
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "space-between",
                    pl: 1,
                    pb: 1,
                  }}
                ></Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={news.media}
                alt="news media"
              />
            </Card>
          </Link>
        ))}
      </StyledDiv>
    </>
  );
}

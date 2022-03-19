
import { Button, Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { StyledDiv } from "./index";
import Link from "next/link";

export default function NewsCard({ newsArray: newsArray }) {
  return (
    <>
      <StyledDiv>
        {newsArray.length > 0 &&
          newsArray.map((news) => (
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

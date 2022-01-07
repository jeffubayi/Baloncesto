import { css } from "@emotion/react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import getGeneralNewsFromLastTwoDays from "../components/news";
import getSpecialNewsFromLastTwoDays from "../components/personalizednews";
import getLastNightScores from "../components/yesterdayscores";
import { setDateCookieClientSide } from "../util/cookies";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { useState } from "react";
import TrendingSlider from "./TrendingSlider";
import Paper from "@mui/material/Paper";
import StandingList from "./StandingList";
import TrendingNews from "./TrendingNews";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";

const ourGray = "#1d2d35";
const lightGray = "#E9E4E4";

const StyledCard = styled(Card)`
  padding: 1rem;
`;

const Item = styled(Paper)`
  padding: 1;
  textalign: center;
  color: #0000;
`;

const scoresStyles = css`
  color: ${ourGray};
  text-decoration: none;

  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  font-family: "PT Sans", "Helvetica", "Arial", sans-serif;
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  ul {
    display: flex;
    justify-content: space-evenly;
    text-decoration: none;
    padding: 20px 40px;
    background-color: #f7e7ce;
    width: 95%;
  }

  a {
    text-decoration: none;
    color: ${ourGray};
    text-align: center;
  }

  li {
    padding: 2px;
    align-self: stretch;
    background-color: white;
    border: none;
    border-radius: 5px;
    min-width: 140px;
  }

  li + li {
    margin-left: 20px;
  }

  div + div {
    padding-left: 10 px;
  }
`;

const NewsFieldStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr;
`;

const NewsTextStyles = styled.div`
  padding-left: 20 px;
`;

export default function Home(props) {
  const newsArray = props.newsArray;
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const yesterdayWithoutDashes = yesterday.replace(/-/g, "");

  setDateCookieClientSide(yesterdayWithoutDashes);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  const findGameWinner = () => {
    if (
      props.scoresArray.scores.vTeam.triCode >
      props.scoresArray.scores.hTeam.triCode
    ) {
      return true;
    } else false;
  };

  return (
    <>
      <Carousel responsive={responsive} ssr={true} infinite={false}>
        <Paper
          elevation={3}
          style={{
            padding: "0.2rem 0.5rem 0",
            backgroundColor: "rgba(255, 255, 255, 0.72)",
          }}
        >
          <h6 style={{ textAlign: "center" }}>
            Yesterday's Game Scores <br></br>
            {yesterday}
            <br></br>
            <Button variant="outlined" size="small" style={{textTransform: "capitalize",margin:"0.15rem"}}>
              view scores
            </Button>
          </h6>
        </Paper>
        {props.scoresArray.map((scores) => (
          // Here we use div instead of li tag
          // because Carousel adds another li tag
          // by itself. If we set this tag to li,
          // it would cause the conflict.
          <Link href={`/${scores.gameId}`}>
            <Card
              style={{
                borderRadius: "0.2rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "repeat(2,auto)",
                cursor: "pointer",
                padding: "0.2rem",
                backgroundColor: "rgba(255, 255, 255, 0.72)",
                height: 120,
              }}
              key={scores.gameId}
            >
              <div
                style={{
                  justifyContent: "flex-start",
                  display: "grid",
                  gap: "0.1rem",
                  gridTemplateRows: "repeat(2,auto)",
                }}
              >
                <Avatar
                  src={`/${scores.hTeam.triCode}.png`}
                  alt="Image"
                  style={{ width: "2rem", height: "2rem" }}
                />
                <Avatar
                  src={`/${scores.vTeam.triCode}.png`}
                  alt="Image"
                  style={{ width: "2rem", height: "2rem" }}
                />
              </div>
              <CardContent>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "grid",
                    gap: "0.4rem",
                    gridTemplateColumns: "repeat(2,2fr 2fr 2fr)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: "0.6rem",
                    }}
                  >
                    <Typography gutterBottom variant="h7" component="div">
                      {scores.hTeam.triCode}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      {scores.vTeam.triCode}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "0.6rem",
                      paddingRight: "0.5rem",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {scores.hTeam.score}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {scores.vTeam.score}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "0.6rem",
                      paddingRight: "0.5rem",
                    }}
                  >
                    {findGameWinner ? (
                      <div>
                        <Badge badgeContent={"win"} color="success" />
                        <Badge badgeContent={"win"} color="success" />
                        <Badge badgeContent={"win"} color="success" />
                      </div>
                    ) : (
                      <div>
                        <Badge badgeContent={"win"} color="success" />
                        <Badge badgeContent={"win"} color="success" />
                        <Badge badgeContent={"win"} color="success" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
      <Box style={{ width: "auto", margin: " 1rem 8rem 5rem" }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
          <Box gridColumn="span 8">
            <h6 style={{ color: "grey" }}>NBA Highlights</h6>
            <TrendingSlider />
          </Box>
          <Box gridColumn="span 4" gap={5}>
            <h6 style={{ color: "grey" }}>Trending News</h6>
            <List
              sx={{
                width: "100%",
                height: "auto",
                bgcolor: "background.paper",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              {newsArray.map((news) => (
                <Link href={news.link}>
                  <ListItem key={news._id}>
                    <ListItemIcon>.</ListItemIcon>
                    <ListItemText secondary={news.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>

          <Box gridColumn="span 8">
            <h6 style={{ color: "grey" }}>Headlines</h6>
            <div
              style={{
                padding: "0.4rem",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "repeat(1,auto)",
                gap: "3rem",
              }}
            >
              {newsArray.map((news) => (
                // It is better to use as key one of the
                // object properties that has unique
                // character. Hence we used _id prop,
                // which was pre-defined by API provider.
                <Link href={news.link}>
                  <Card
                    sx={{ display: "flex", borderRadius: "0.4rem" }}
                    key={news._id}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="subtitle1">
                          {news.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="div"
                        >
                          {news.summary.substring(0, 230)}...
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image="https://blog.logomyway.com/wp-content/uploads/2017/01/nba-logo-1.jpg"
                    />
                  </Card>
                </Link>
              ))}
            </div>
          </Box>
          <Box gridColumn="span 4">
            <h6 style={{ color: "grey" }}>Conference Standings</h6>
            <StandingList />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getSessionByToken, getUsersFavTeams, getUserByToken } = await import(
    "../util/database"
  );

  const scoresArray = await getLastNightScores();

  const session = await getSessionByToken(context.req.cookies.session);

  const user = await getUserByToken(session);

  if (!session || session.userId !== user.userId || user === "undefined") {
    const newsArray = await getGeneralNewsFromLastTwoDays();

    return {
      props: {
        newsArray: newsArray || [],
        scoresArray: scoresArray || [],
      },
    };
  } else {
    const favoriteTeamsArray = await getUsersFavTeams(user.userId);

    const favTeams = favoriteTeamsArray.map((team) => team.teamName);
    const favTeamsInOneString = favTeams.join();
    const queryString = favTeamsInOneString.replace(",", " ");

    const userId = user.userId;

    const newsArray = await getSpecialNewsFromLastTwoDays(queryString);

    return {
      props: {
        newsArray: newsArray || [],
        scoresArray: scoresArray || [],
        userId: userId,
      },
    };
  }
}

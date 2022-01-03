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
import {  useState } from "react";
import TrendingSlider from "./TrendingSlider";
import Paper from "@mui/material/Paper";
import StandingList from "./StandingList";
import TrendingNews from "./TrendingNews";


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
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Carousel responsive={responsive} ssr={true} infinite={false}>
        {props.scoresArray.map((scores) => (
          // Here we use div instead of li tag
          // because Carousel adds another li tag
          // by itself. If we set this tag to li,
          // it would cause the conflict.
          <Link
            href={`/${scores.gameId}`}
            style={{
              padding: "0.4rem",
              margin: "1rem",
              cursor: "pointer",
            }}
          >
            <Card key={scores.gameId}>
              <div
                style={{
                  justifyContent: "space-evenly",
                  display: "grid",
                  gap: "0.4rem",
                  gridTemplateColumns: "repeat(2,auto)",
                }}
              >
                <CardMedia
                  component="img"
                  height="70"
                  image={`/${scores.vTeam.triCode}.png`}
                  alt="green iguana"
                />
                <CardMedia
                  component="img"
                  height="70"
                  image={`/${scores.hTeam.triCode}.png`}
                  alt="green iguana"
                />
              </div>
              <CardContent>
                <div
                  style={{
                    justifyContent: "space-evenly",
                    display: "grid",
                    gap: "0.4rem",
                    gridTemplateColumns: "repeat(3,auto)",
                  }}
                >
                  <Typography gutterBottom variant="h7" component="div">
                    {scores.vTeam.triCode}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    vs
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    {scores.hTeam.triCode}
                  </Typography>
                </div>
                <div
                  style={{
                    justifyContent: "space-evenly",
                    display: "grid",
                    gap: "0.4rem",
                    gridTemplateColumns: "repeat(3,auto)",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {scores.vTeam.score}
                  </Typography>
                  <Typography gutterBottom variant="caption" component="div">
                    -
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {scores.hTeam.score}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
      <Box style={{ width: "auto", margin: "3rem 1rem 2rem" }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
          <Box gridColumn="span 8">
            <TrendingSlider />
          </Box>
          <Box gridColumn="span 4">
            <TrendingNews />
          </Box>
          
          <Box gridColumn="span 8">
            <div
              style={{
                padding: "0.4rem",
                margin: "1rem",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "repeat(2,auto)",
                gap: "3rem",
              }}
            >
              {newsArray.map((news) => (
                // It is better to use as key one of the
                // object properties that has unique
                // character. Hence we used _id prop,
                // which was pre-defined by API provider.
                <Link href={news.link}>
                  <StyledCard key={news._id}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        "data:image/jpeg;base64,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"
                      }
                      alt="green iguana"
                    />
                    <CardContent>
                      <h4>{news.title}</h4>
                      <Typography
                        variant="body2"
                        style={{ textOverflow: "ellipsis" }}
                      >
                        {" "}
                        {news.summary}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Link>
              ))}
            </div>
          </Box>
          <Box gridColumn="span 4">
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

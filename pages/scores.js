import { css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import GetLastNightScores from "../components/yesterdayscores";
import { setDateCookieClientSide } from "../util/cookies";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
const axios = require("axios");

const ourGray = "#FFFF";
const lightGray = "#E9E4E4";

const StyledDiv = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, auto);
  margin: 0.5rem;
`;


export default function Scores(props) {
  const [scores, setScores] = useState(props.yestScoresArray);
  const [value, setValue] = useState(null);
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const yesterdayWithoutDashes = yesterday.replace(/-/g, "");

  const [date, setDate] = useState(yesterdayWithoutDashes);

  setDateCookieClientSide(date);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      slidesToSlide: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
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
      <Head>
        <title>NBA Game Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFF",
            display: "grid",
            justifyContent: "center",
            color: "white",
            padding: "20px",
            backgroundColor: "#051c2d",
          }}
        >
          <TextField
            id="date"
            label="Game scores on day:"
            onChange={(e) => {
              const newDate = e.target.value;
              const newDateWithoutDashes = newDate.replace(/-/g, "");
              setDate(newDateWithoutDashes);

              const options = {
                method: "GET",
                url: `https://data.nba.net/10s/prod/v2/${newDateWithoutDashes}/scoreboard.json`,
                params: {},
                headers: {},
              };
              axios
                .request(options)
                .then(function (response) {
                  const scoresArray = response.data.games;

                  return setScores(scoresArray);
                })
                .catch(function (error) {
                  console.error(error);
                });
            }}
            type="date"
            defaultValue={today}
            sx={{ width: 350, borderRadius: "1rem", color: "white" }}
            InputLabelProps={{
              shrink: true,
            }}
            focused
          />
        </div>
        {isSmallWindow ? (
        <StyledDiv>
          {scores.map((game) => (
            // Here we use div instead of li tag
            // because Carousel adds another li tag
            // by itself. If we set this tag to li,
            // it would cause the conflict.
            <Link href={`/${game.gameId}`}>
              <Card
                style={{
                  margin: "1rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                key={game.gameId}
              >
                <div
                  style={{
                    justifyContent: "space-evenly",
                    display: "grid",
                    gap: "0.4rem",
                    gridTemplateColumns: "repeat(2,auto)",
                  }}
                >
                  <Avatar
                    src={`/${game.vTeam.triCode}.png`}
                    alt="Image"
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  />
                  <Avatar
                    src={`/${game.hTeam.triCode}.png`}
                    alt="Image"
                    style={{ width: "3.5rem", height: "3.5rem" }}
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
                      {game.vTeam.triCode}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      vs
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      {game.hTeam.triCode}
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
                      {game.vTeam.score}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      -
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {game.hTeam.score}
                    </Typography>
                  </div>
                  {game.isRecapArticleAvail ? (
                    <div style={{ textAlign: "center" }}>
                      <Badge badgeContent={"FINAL"} />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
        </StyledDiv>
        ):(
          <div style={{  
            display:"grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(3, auto)",
            margin:" 0.5rem",
           }}>
             {scores.map((game) => (
            // Here we use div instead of li tag
            // because Carousel adds another li tag
            // by itself. If we set this tag to li,
            // it would cause the conflict.
            <Link href={`/${game.gameId}`}>
              <Card
                style={{
                  margin: "1rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                key={game.gameId}
              >
                <div
                  style={{
                    justifyContent: "space-evenly",
                    display: "grid",
                    gap: "0.4rem",
                    gridTemplateColumns: "repeat(2,auto)",
                  }}
                >
                  <Avatar
                    src={`/${game.vTeam.triCode}.png`}
                    alt="Image"
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  />
                  <Avatar
                    src={`/${game.hTeam.triCode}.png`}
                    alt="Image"
                    style={{ width: "3.5rem", height: "3.5rem" }}
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
                      {game.vTeam.triCode}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      vs
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      {game.hTeam.triCode}
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
                      {game.vTeam.score}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      -
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {game.hTeam.score}
                    </Typography>
                  </div>
                  {game.isRecapArticleAvail ? (
                    <div style={{ textAlign: "center" }}>
                      <Badge badgeContent={"FINAL"} />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getSessionByToken, getUserByToken } = await import(
    "../util/database"
  );

  const session = await getSessionByToken(context.req.cookies.session);
  const userByToken = await getUserByToken(session);

  if (
    !session ||
    session.userId !== userByToken.userId ||
    userByToken === "undefined"
  ) {
    const yestScoresArray = await GetLastNightScores();
    return {
      props: {
        yestScoresArray: yestScoresArray || [],
      },
    };
  } else {
    const userId = userByToken.userId;

    const yestScoresArray = await GetLastNightScores();
    return {
      props: {
        yestScoresArray: yestScoresArray || [],
        userId: userId,
      },
    };
  }
}

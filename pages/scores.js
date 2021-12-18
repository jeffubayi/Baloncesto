import { css } from "@emotion/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GetLastNightScores from "../components/yesterdayscores";
import { setDateCookieClientSide } from "../util/cookies";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {DatePicker,LocalizationProvider } from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterMoment';
import TextField from '@mui/material/TextField';

const axios = require("axios");

const ourGray = "#FFFF";
const lightGray = "#E9E4E4";

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

  ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    padding: 40px;
    background-color: ${lightGray};
    width: 100%;
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
    align-content: center;
  }

  li + li {
    margin-left: 20px;
  }
`;

const paragraphStyles = css`
  text-align: center;
  background-color: ${ourGray};
  color: ${lightGray};
  padding: 20px;

  input {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

export default function Scores(props) {
  const [scores, setScores] = useState(props.yestScoresArray);
  const [value, setValue] = useState(null);
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;

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
        <title>NBA News Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p
          style={{
            textAlign: "center",
            backgroundColor: "#BE6C42",
            color: "white",
            padding: "20px",
          }}
          data-cy="scores-page-content-p"
        >
          Game scores on the day:
          {"  "}
          {"  "}
          <TextField
        id="date"
        label="Select Game Night"
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
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
          {/* <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Select Game Night"
              value={value}
              onChange={(value) => {
                const newDate = value;
                const newDateWithoutDashes = newDate;
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
              renderInput={(params) => <TextField {...params} />}
            />
           </LocalizationProvider> */}
        </p>

        <div css={scoresStyles}>
          <ul>
            <Carousel
              responsive={responsive}
              ssr={true}
              infinite={false}
              showDots={true}
            >
              {scores.map((game) => (
                // Here we use div instead of li tag
                // because Carousel adds another li tag
                // by itself. If we set this tag to li,
                // it would cause the conflict.
                <Link
                  href={`/${game.gameId}`}
                  style={{
                    padding: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  <Card key={game.gameId}>
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
                        height="140"
                        image={`/${game.vTeam.triCode}.png`}
                        alt="green iguana"
                      />
                      <CardMedia
                        component="img"
                        height="140"
                        image={`/${game.hTeam.triCode}.png`}
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
                          {game.vTeam.triCode}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          vs
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                          {game.hTeam.triCode}
                        </Typography>
                      </div>
                      <div
                        style={{
                          justifyContent: "space-between",
                          display: "grid",
                          gap: "0.4rem",
                          gridTemplateColumns: "repeat(2,auto)",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {game.vTeam.score}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {game.hTeam.score}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions
                      style={{
                        justifyContent: "center",
                        display: "grid",
                      }}
                    >
                      <Button size="small">See More</Button>
                    </CardActions>
                  </Card>
                </Link>
                // <div
                //   key={game.gameId}
                //   style={{
                //     cursor: "pointer",
                //     backgroundColor: "rgba(255,255,255,0.4)",
                //     backdropFilter: "blur(40px)",
                //     border: "2px solid rgba(255,255,255,0.4)",
                //     padding: "0.5rem",
                //     borderRadius: "10px",
                //   }}
                // >
                //   <Link href={`/${game.gameId}`}>
                //     <div
                //       style={{
                //         justifyContent: "space-evenly",
                //         display: "grid",
                //         gap: "0.4rem",
                //         gridTemplateColumns: "repeat(2,auto)",
                //       }}
                //     >
                //       <div
                //         style={{
                //           display: "grid",
                //           gap: "0.4rem",
                //           gridTemplateRows: "repeat(3,auto)",
                //         }}
                //       >
                //         <div>
                //           <Image
                //             src={`/${game.vTeam.triCode}.png`}
                //             alt="Image"
                //             width={40}
                //             height={40}
                //           />
                //         </div>
                //         <div>{game.vTeam.triCode}</div>
                //         <div>{game.vTeam.score}</div>
                //       </div>
                //       <div
                //         style={{
                //           display: "grid",
                //           gap: "0.4rem",
                //           gridTemplateRows: "repeat(3,auto)",
                //         }}
                //       >
                //         <div>
                //           <Image
                //             src={`/${game.hTeam.triCode}.png`}
                //             alt="Image"
                //             width={40}
                //             height={40}
                //           />
                //         </div>
                //         <div>{game.hTeam.triCode}</div>
                //         <div>{game.hTeam.score}</div>
                //       </div>
                //     </div>
                //   </Link>
                // </div>
              ))}
            </Carousel>
          </ul>
        </div>
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

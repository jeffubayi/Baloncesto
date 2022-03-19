import * as React from "react";
import "react-multi-carousel/lib/styles.css";
import getGeneralNewsFromLastTwoDays from "../components/news";
import getSpecialNewsFromLastTwoDays from "../components/personalizednews";
import getLastNightScores from "../components/yesterdayscores";
import { setDateCookieClientSide } from "../util/cookies";
import styled from "styled-components";
import Box from "@mui/material/Box";
import StandingList from "./StandingList";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewsFeed from "./news";
import Head from "next/head";

const StyledBox = styled(Box)`
  width: auto;
  margin: 3.5rem 0.5rem 1rem;
  @media (min-width: 600px) {
    margin: 3rem 2rem 1rem;
  }

  @media (min-width: 1300px) {
    margin: 3rem 2rem 2rem;
  }
`;

export const StyledDiv = styled.div`
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

export default function Home(props) {
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  const newsArray = props.newsArray;
  React.useEffect((newsArray) => [newsArray]);
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const yesterdayWithoutDashes = yesterday.replace(/-/g, "");

  setDateCookieClientSide(yesterdayWithoutDashes);


  return (
    <>
      <Head>
        <title>NBA | News</title>
      </Head>
      <StyledBox>
       
        <Grid container spacing={3}>
          {/* news list */}
          <Grid item xs={12} md={8} lg={9}>
            <NewsFeed newsArray={newsArray} />
          </Grid>

          {/* standing list */}
          <Grid item xs={12} md={4} lg={3}>
            {!isSmallWindow && <StandingList />}
          </Grid>
        </Grid>
      </StyledBox>
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

//
import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";

export default function TitlebarImageList() {
  const [teams, setTeams] = React.useState([]);
  const axios = require("axios");
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  async function getTeams() {
    axios
      .get("https://data.nba.net/prod/v1/2021/teams.json")
      .then((response) => {
        const teamArray = response.data.league;
        console.log(`teams ==`, teamArray);
        setTeams(teamArray);
      });
  }

  React.useEffect(() => getTeams(), []);

  return (
    <>
    <Head>
        <title>NBA | Teams</title>
      </Head>
      <div style={{marginTop: "1rem" }}>
      {isSmallWindow ? (
        <ImageList sx={{ width: "100%", height: "auto" }}>
          {teams.sacramento ? (
            teams.sacramento.filter(sac => !sac.urlName.startsWith("utah")).map((item) => (
              <ImageListItem key={item.teamId}>
                <img
                  src={`/${item.tricode}.png`}
                  srcSet={`/${item.tricode}.png`}
                  alt={item.fullName}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.tricode}
                  subtitle={item.fullName}
                />
              </ImageListItem>
            ))
          ) : (
            <p>Not Available</p>
          )}
        </ImageList>
      ) : (
        <div style={{margin:"1rem"}}>
        <ImageList style={{ width: "100%", height:"auto" ,display:"grid",gridTemplateColumns:"repeat(5,1fr)",}}>
          {teams.sacramento ? (
            teams.sacramento.filter(sac => !sac.urlName.startsWith("utah")).map((item) => (
              <ImageListItem  key={item.teamId}>
                <img
                  src={`/${item.tricode}.png`}
                  srcSet={`/${item.tricode}.png`}
                  alt={item.fullName}
                  loading="lazy"
                />
                <ImageListItemBar
                noWrap
                  title={item.fullName}
                  subtitle={item.divName}
                />
              </ImageListItem>
            ))
          ) : (
            <p>Not Available</p>
          )}
        </ImageList>
        </div>
      )}
    </div>
    </>
  );
}

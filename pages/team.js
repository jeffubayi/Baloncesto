//
import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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
        <title>NBA Teams</title>
      </Head>
      {isSmallWindow ? (
        <ImageList sx={{ width: "100%", height: "auto" }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader
              component="p"
              sx={{ textAlign: "center", color: "black" }}
            >
              All NBA Franchise Teams
            </ListSubheader>
          </ImageListItem>
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
                  title={item.fullName}
                  subtitle={item.confName}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.fullName}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          ) : (
            <p>Not Available</p>
          )}
        </ImageList>
      ) : (
        <ImageList style={{ width: "100%", height:"auto" ,display:"grid",gridTemplateColumns:"repeat(6,auto)",}}>
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
                  title={item.fullName}
                  subtitle={item.confName}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.fullName}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          ) : (
            <p>Not Available</p>
          )}
        </ImageList>
      )}
    </>
  );
}

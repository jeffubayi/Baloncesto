// 
import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList() {
  const [teams, setTeams] = React.useState([]);
  const axios = require("axios");

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
    <ImageList sx={{ width:"auto", height: 800 }}>
      <ImageListItem key="Subheader" cols={6}>
        <ListSubheader component="p" sx={{ textAlign:"center",color:"black" }}>All NBA Franchise Teams</ListSubheader>
      </ImageListItem>
      {teams.sacramento ? teams.sacramento.map((item) => (
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
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.fullName}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
     )): <p>Not Available</p>}
    </ImageList>
  );
}

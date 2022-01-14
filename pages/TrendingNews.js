import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function PinnedSubheaderList() {

  const RenderStatsComponent = ({ item }) => {
    return (
      <ListItem
        key={item.statId}
        style={{ color: "grey" ,fontSize:"0.7rem"}}
        secondaryAction={item.averagePerGame}
      >
        <ListItemAvatar>
          <Avatar
            style={{ width: "2rem", height: "2rem" }}
            src={item.playerAvatar}
          />
        </ListItemAvatar>
        <ListItemText
          style={{ color: "grey",fontSize:"0.9rem" }}
          primary={item.player}
          secondary={item.team}
        />
      </ListItem>
    );
  };

  const playersStats = {
    seasonLeaders:  [
        {
          statId: "1",
          statName: "Points Per Game",
          player: "Kevin Durant",
          averagePerGame: "29.7",
          team: "Nets",
          playerAvatar:
            "https://cdn.basketballnews.com/images/images/players/headshots/7567a053-32db-4d72-8f3e-5d519528907d_sm.png",
        },
        {
          statId: "2",
          statName: "Assists Per Game",
          player: "Chris Paul",
          averagePerGame: "10.1",
          team: "Suns",
          playerAvatar:
            "https://cdn.basketballnews.com/images/images/players/headshots/e0b4121f-65c2-45b5-adb9-30131c1b3354_sm.png",
        },
        {
          statId: "3",
          statName: "Rebounds Per Game",
          player: "Rudy Golbert",
          averagePerGame: "15.5",
          team: "Jazz",
          playerAvatar:
            "https://cdn.basketballnews.com/images/images/players/headshots/5662882d-4d7a-4ccf-888d-b65fcfffbe6c_sm.png",
        },
        {
          statId: "4",
          statName: "Blocks Per Game",
          player: "Miles Turner",
          averagePerGame: "2.88",
          team: "Pacers",
          playerAvatar:
            "https://cdn.basketballnews.com/images/images/players/headshots/5461ba6a-1fa0-4994-9b6f-cf61eb57ffe7_sm.png",
        },
        {
          statId: "5",
          statName: "Steals Per Game",
          player: "Alex Carusso",
          averagePerGame: "2.88",
          team: "Bulls",
          playerAvatar:
            "https://cdn.basketballnews.com/images/images/players/headshots/5b77c7ba-04d4-495e-a99d-0166f34840a7_sm.png",
        }
      ],
  };

  console.log(`playerStats`, playersStats);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 1115,
        borderRadius: "0.5rem",
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {playersStats.seasonLeaders
        ? playersStats.seasonLeaders.map((stat) => (
            <li key={stat.statId}>
              <ul>
                <ListSubheader style={{ color: "black" }}>
                {stat.statName}
                </ListSubheader>
                <div  style={{ padding:1 }}>
                <RenderStatsComponent item={stat} />
                </div>
              </ul>
            </li>
          ))
        : null}
    </List>
  );
}

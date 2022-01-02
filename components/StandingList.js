import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import getStandings from "./standings";

export default function StandingList() {
  getStandings();
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {props.standingsArray.league.standard.conference.east.map((team) => (
          <ListItem key={team.teamId} component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={team.teamSitesOnly.teamNickname} />
            </ListItemButton>
          </ListItem>
        ))}
      </FixedSizeList>
    </Box>
  );
}

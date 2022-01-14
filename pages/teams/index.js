// 
import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";

export default function StandingList(props) {
  const [value, setValue] = React.useState("1");
  const [standings, setStandings] = React.useState([]);
  const axios = require("axios");

  async function getStandings() {
    axios
      .get("https://data.nba.net/10s/prod/2020/teams_config.json")
      .then((response) => {
        const standArray = response.data.league.standard.conference;
        console.log(`standArray==`, standArray);
        setStandings(standArray);
      });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => getStandings(), []);

  return (
    <div
      style={{
        margin: "1rem",
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          height: 500,
          borderRadius: "0.5rem",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                style={{ textAlign: "center" }}
              >
                <Tab
                  label="Eastern"
                  value="1"
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Western"
                  value="2"
                  style={{ textTransform: "capitalize" }}
                />
              </TabList>
            </Box>

            <TabPanel value="1">
              {standings.east? standings.east.map((team) => (
                <ListItem key={team.teamId} style={{color:"#3c4444"}}  secondaryAction={
                  team.win
                }>
                  <ListItemAvatar>
                    <Avatar
                      src={`/${team.teamSitesOnly.teamTricode}.png`}
                      alt="Image"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={
                    <>
                    <p>
                     {team.teamSitesOnly.teamNickname}</p> 
                    </>
                  }/>
                </ListItem>
               )): <p>Not Available</p>}
            </TabPanel>

            <TabPanel value="2">
              {standings.west? standings.west.map((team) => (
                <ListItem key={team.teamId} style={{color:"#3c4444"}} secondaryAction={
                  team.win
                }>
                  <ListItemAvatar>
                    <Avatar
                      src={`/${team.teamSitesOnly.teamTricode}.png`}
                      alt="Image"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </ListItemAvatar>
                  <ListItemText  primary={
                    <>
                    <p>
                     {team.teamSitesOnly.teamNickname}</p> 
                    </>
                  } />
                </ListItem>
              )): <p>Not Available</p>}
            </TabPanel>
          </TabContext>
        </Box>
      </List>
    </div>
  );
}
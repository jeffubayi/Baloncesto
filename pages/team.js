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
      .get("https://data.nba.net/prod/v1/2021/teams.json")
      .then((response) => {
        const standArray = response.data.league;
        console.log(`teams ==`, standArray);
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
          height: 700,
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
                  label="Sacramento"
                  value="1"
                  style={{ textTransform: "capitalize" }}
                />
              </TabList>
            </Box>

            <TabPanel value="1">
              {standings.sacramento ? standings.sacramento.map((team) => (
                <ListItem key={team.teamId} style={{color:"#3c4444"}}  secondaryAction={
                  team.confName
                }>
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText primary={
                    <>
                    <p>
                     {team.fullName}</p> 
                    </>
                  }/>
                </ListItem>
               )): <p>Not Available</p>}
            </TabPanel>

            
          </TabContext>
        </Box>
      </List>
    </div>
  );
}
import * as React from "react";
import List from "@mui/material/List";
import getStandings from "../components/standings";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";

export default function StandingList(props) {
  const [value, setValue] = React.useState("1");
  const [standings, setStandings] = React.useState([]);
  const axios = require("axios");

  async function getStandings() {
    axios
      .get("https://data.nba.net/10s/prod/v1/current/standings_conference.json")
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
    <div>
      <List
        sx={{
          width: 330,
          bgcolor: "background.paper",
          margin: "0.4rem",
          position: "fixed",
          overflow: "auto",
          height: 540,
          borderRadius: "0.5rem",
          "& ul": { padding: 0 },
        }}
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ textAlign: "center", fontSize: "0.8rem" }}
          >
            Conference Standings
          </ListSubheader>
        }
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
                  label="Eastern Conference"
                  value="1"
                  sx={{ textTransform: "capitalize", fontSize: "0.6rem" }}
                />
                <Tab
                  label="Western Conference"
                  value="2"
                  sx={{ textTransform: "capitalize", fontSize: "0.6rem" }}
                />
              </TabList>
            </Box>

            <TabPanel value="1">
              {standings.east ? (
                standings.east.map((team) => (
                  <ListItem
                    key={team.teamId}
                    style={{ color: "#3c4444",fontSize: "0.7rem"  }}
                    secondaryAction={team.win}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`/${team.teamSitesOnly.teamTricode}.png`}
                        alt="Image"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <p style={{ fontSize: "0.7rem" }}>{team.teamSitesOnly.teamNickname}</p>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* <Image src="https://c.tenor.com/IOxRkEFDAwMAAAAj/sports-sportsmanias.gif" alt="Image" width={150} height={150} /> */}
                </div>
              )}
            </TabPanel>

            <TabPanel value="2">
              {standings.west ? (
                standings.west.map((team) => (
                  <ListItem
                    key={team.teamId}
                    style={{ color: "#3c4444",fontSize: "0.7rem"  }}
                    secondaryAction={team.win}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`/${team.teamSitesOnly.teamTricode}.png`}
                        alt="Image"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <p style={{ fontSize: "0.7rem" }}>{team.teamSitesOnly.teamNickname}</p>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <p>Not Available</p>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </List>
    </div>
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
    const standingsArray = await getStandings();
    return {
      props: {
        standingsArray: standingsArray,
      },
    };
  } else {
    const userId = userByToken.userId;

    const standingsArray = await getStandings();

    return {
      props: {
        standingsArray: standingsArray,
        userId: userId,
      },
    };
  }
}

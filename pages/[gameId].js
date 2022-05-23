import { css } from "@emotion/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
  CircularProgress,
  LinearProgress,
  Card,
  CardContent,
  ListSubheader,
  ImageListItemBar,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { StyledTableCell } from "./standings";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CardMedia, IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InfoIcon from "@mui/icons-material/Info";

const axios = require("axios");
const ourGray = "#051c2d";

const BoxscoreHeadingStyles = styled(Paper)`
  display: flex;
  align-items: center;
  border: 2px solid ${ourGray};
  borderradius: 2rem;
  justify-content: center;
  margin: 3.5rem 3.5rem 0;
  padding: 0.5rem;
  font-size: 0.8rem;
`;

const TeamsParentStyles = styled(Paper)`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  border-radius: 1rem;
`;

const TeamsStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;

  span {
    font-weight: 700;
  }
`;

const loaderStyles = css`
  text-align: center;
  font-size: 0.8em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1, auto);
  gap: 0.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, auto);
  }
`;

export default function BoxScore(props) {
  const [boxscore, setBoxscore] = useState(null);
  const [stats, setStats] = useState(null);
  const [playerStats, setPlayerStats] = useState({});
  const [scoreline, setScoreline] = useState([]);
  const [AwayScoreline, setAscoreline] = useState([]);
  const [value, setValue] = useState("1");
  const [teams, setTeams] = useState();
  const [names, setNames] = useState({ home: "", away: "" });
  console.log(`TEAM NAMES ==`, teams,names);
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const gameYesterday = yesterday.replace(/-/g, "");

  async function getTeams() {
    axios
      .get("https://data.nba.net/prod/v1/2021/teams.json")
      .then((response) => {
        const teamArray = response.data.league;
        console.log(`teams id ==`, teams);
        teamArray.sacramento.forEach(function (item, index) {
          console.log(`teamss ==`, item.teamId, item.fullName);
          if(item.teamId === teams){
            console.log(`teamssssss ==`, item.teamId, item.fullName, );
          setNames(item.fullName);
        }else{
          console.log(`teams ${teams.home} ==`, item.teamId);
        }
        });
      });
  }

  const gameDate =
    props.gameDate === undefined ? gameYesterday : props.gameDate;
  const gameId = props.gameId;
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://data.nba.net/prod/v1/${gameDate}/${gameId}_boxscore.json`,
      params: {},
      headers: {},
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(`players response`, response);
        const boxscoreObject = response.data.basicGameData;
        const statsObject = response.data.stats;
        const scoreObject = response.data.basicGameData.hTeam.linescore;
        const aScoreObject = response.data.basicGameData.vTeam.linescore;
        const hteamId = response.data.basicGameData.hTeam.teamId;
        const vteamId = response.data.basicGameData.vTeam.teamId;
        const players = response.data.stats.activePlayers;
        setStats(statsObject);
        setScoreline(scoreObject);
        setAscoreline(aScoreObject);
        setPlayerStats(players);
        setTeams(hteamId)
        console.log(`players`, players);
        console.log(`scoreObject`, scoreObject);
        console.log(`statsObject`, statsObject);
        console.log(`boxscoreObject`, boxscoreObject);
        console.log(`teammmm`, vteamId, hteamId);
        return setBoxscore(boxscoreObject);
      })
      .catch(function (error) {
        console.error(error);
      });
      getTeams();
  }, [gameDate, gameId]);

  // this is not error, bcs sometimes the answer from api comes late, and in meantime we show this conditional render
  // eslint-disable-next-line
  if (boxscore === null)
    return (
      <Box sx={{ flexGrow: 1, mt: 20 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item lg={12}></Grid>
          <Grid item lg={12}>
            <CircularProgress />
          </Grid>
          <Grid item lg={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Fetching from NBA database
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );

  const vTeamName = boxscore.vTeam.triCode;
  const hTeamName = boxscore.hTeam.triCode;
  const vTeamTotal = boxscore.vTeam.score;
  const hTeamTotal = boxscore.hTeam.score;
  const vTeam1st = scoreline[0]?.score;
  const vTeam2nd = scoreline[1]?.score;
  const vTeam3rd = scoreline[2]?.score;
  const vTeam4th = scoreline[3]?.score;
  const hTeam1st = AwayScoreline[0]?.score;
  const hTeam2nd = AwayScoreline[1]?.score;
  const hTeam3rd = AwayScoreline[2]?.score;
  const hTeam4th = AwayScoreline[3]?.score;
  const playJerseyOne = playerStats[0]?.personId;
  const playNamesOne = `${playerStats[0]?.firstName.charAt(0)}. ${
    playerStats[0]?.lastName
  }`;
  const playMinsOne = playerStats[0]?.min;
  const playRebsOne = playerStats[0]?.totReb;
  const playAssistsOne = playerStats[0]?.assists;
  const playPointsOne = playerStats[0]?.points;

  const playJerseyTwo = playerStats[1]?.personId;
  const playNamesTwo = `${playerStats[1]?.firstName.charAt(0)}. ${
    playerStats[1]?.lastName
  }`;
  const playMinsTwo = playerStats[1]?.min;
  const playRebsTwo = playerStats[1]?.totReb;
  const playAssistsTwo = playerStats[1]?.assists;
  const playPointsTwo = playerStats[1]?.points;

  const playJerseyThree = playerStats[2]?.personId;
  const playNamesThree = `${playerStats[2]?.firstName.charAt(0)}. ${
    playerStats[2]?.lastName
  }`;
  const playMinsThree = playerStats[2]?.min;
  const playRebsThree = playerStats[2]?.totReb;
  const playAssistsThree = playerStats[2]?.assists;
  const playPointsThree = playerStats[2]?.points;

  const playJerseyFour = playerStats[3]?.personId;
  const playNamesFour = `${playerStats[3]?.firstName.charAt(0)}. ${
    playerStats[3]?.lastName
  }`;
  const playMinsFour = playerStats[3]?.min;
  const playRebsFour = playerStats[3]?.totReb;
  const playAssistsFour = playerStats[3]?.assists;
  const playPointsFour = playerStats[3]?.points;

  const playJerseyFive = playerStats[4]?.personId;
  const playNamesFive = `${playerStats[4]?.firstName.charAt(0)}. ${
    playerStats[4]?.lastName
  }`;
  const playMinsFive = playerStats[4]?.min;
  const playRebsFive = playerStats[4]?.totReb;
  const playAssistsFive = playerStats[4]?.assists;
  const playPointsFive = playerStats[4]?.points;

  const hplayJerseyOne = playerStats[17]?.personId;
  const hplayNamesOne = `${playerStats[17]?.firstName.charAt(0)}. ${
    playerStats[17]?.lastName
  }`;
  const hplayMinsOne = playerStats[17]?.min;
  const hplayRebsOne = playerStats[17]?.totReb;
  const hplayAssistsOne = playerStats[17]?.assists;
  const hplayPointsOne = playerStats[17]?.points;

  const hplayJerseyTwo = playerStats[13]?.personId;
  const hplayNamesTwo = `${playerStats[13]?.firstName.charAt(0)}. ${
    playerStats[13]?.lastName
  }`;
  const hplayMinsTwo = playerStats[13]?.min;
  const hplayRebsTwo = playerStats[13]?.totReb;
  const hplayAssistsTwo = playerStats[13]?.assists;
  const hplayPointsTwo = playerStats[13]?.points;

  const hplayJerseyThree = playerStats[14]?.personId;
  const hplayNamesThree = `${playerStats[14]?.firstName.charAt(0)}. ${
    playerStats[14]?.lastName
  }`;
  const hplayMinsThree = playerStats[14]?.min;
  const hplayRebsThree = playerStats[14]?.totReb;
  const hplayAssistsThree = playerStats[14]?.assists;
  const hplayPointsThree = playerStats[14]?.points;

  const hplayJerseyFour = playerStats[15]?.personId;
  const hplayNamesFour = `${playerStats[15]?.firstName.charAt(0)}. ${
    playerStats[15]?.lastName
  }`;
  const hplayMinsFour = playerStats[15]?.min;
  const hplayRebsFour = playerStats[15]?.totReb;
  const hplayAssistsFour = playerStats[15]?.assists;
  const hplayPointsFour = playerStats[15]?.points;

  const hplayJerseyFive = playerStats[16]?.personId;
  const hplayNamesFive = `${playerStats[16]?.firstName.charAt(0)}. ${
    playerStats[16]?.lastName
  }`;
  const hplayMinsFive = playerStats[16]?.min;
  const hplayRebsFive = playerStats[16]?.totReb;
  const hplayAssistsFive = playerStats[16]?.assists;
  const hplayPointsFive = playerStats[16]?.points;

  function createPlayer(names, jersey, mins, rebs, assists, points) {
    return { names, jersey, mins, rebs, assists, points };
  }

  const rowPlayers = [
    createPlayer(
      playNamesOne,
      playJerseyOne,
      playMinsOne,
      playRebsOne,
      playAssistsOne,
      playPointsOne
    ),
    createPlayer(
      playNamesTwo,
      playJerseyTwo,
      playMinsTwo,
      playRebsTwo,
      playAssistsTwo,
      playPointsTwo
    ),
    createPlayer(
      playNamesThree,
      playJerseyThree,
      playMinsThree,
      playRebsThree,
      playAssistsThree,
      playPointsThree
    ),
    createPlayer(
      playNamesFour,
      playJerseyFour,
      playMinsFour,
      playRebsFour,
      playAssistsFour,
      playPointsFour
    ),
    createPlayer(
      playNamesFive,
      playJerseyFive,
      playMinsFive,
      playRebsFive,
      playAssistsFive,
      playPointsFive
    ),
  ];

  function createPlayer(names, jersey, mins, rebs, assists, points) {
    return { names, jersey, mins, rebs, assists, points };
  }

  const homePlayers = [
    createPlayer(
      hplayNamesOne,
      hplayJerseyOne,
      hplayMinsOne,
      hplayRebsOne,
      hplayAssistsOne,
      hplayPointsOne
    ),
    createPlayer(
      hplayNamesTwo,
      hplayJerseyTwo,
      hplayMinsTwo,
      hplayRebsTwo,
      hplayAssistsTwo,
      hplayPointsTwo
    ),
    createPlayer(
      hplayNamesThree,
      hplayJerseyThree,
      hplayMinsThree,
      hplayRebsThree,
      hplayAssistsThree,
      hplayPointsThree
    ),
    createPlayer(
      hplayNamesFour,
      hplayJerseyFour,
      hplayMinsFour,
      hplayRebsFour,
      hplayAssistsFour,
      hplayPointsFour
    ),
    createPlayer(
      hplayNamesFive,
      hplayJerseyFive,
      hplayMinsFive,
      hplayRebsFive,
      hplayAssistsFive,
      hplayPointsFive
    ),
  ];

  const itemData = [
    {
      img: `https://cdn.nba.com/headshots/nba/latest/1040x760/${hplayJerseyFour}.png`,
      title: boxscore.hTeam.score,
      author: teams.home,
      team: `/${boxscore.hTeam.triCode}.png`,
    },

    {
      img: `https://cdn.nba.com/headshots/nba/latest/1040x760/${playJerseyOne}.png`,
      title: boxscore.vTeam.score,
      author: teams.away,
      team: `/${boxscore.vTeam.triCode}.png`,
    },
  ];

  function createData(team, first, second, third, fourth, total) {
    return { team, first, second, third, fourth, total };
  }

  const rows = [
    createData(hTeamName, vTeam1st, vTeam2nd, vTeam3rd, vTeam4th, hTeamTotal),
    createData(vTeamName, hTeam1st, hTeam2nd, hTeam3rd, hTeam4th, vTeamTotal),
  ];

  return (
    <>
      <Head>
        <title>Box score</title>
      </Head>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {isSmallWindow ? (
              <ImageList>
                <ImageListItem key="Subheader" cols={2}>
                  {boxscore.arena.name},{"    "}
                  <br />
                  {boxscore.arena.city}
                </ImageListItem>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.author}
                      actionIcon={
                        <Avatar
                          src={`${item.team}?w=248&fit=crop&auto=format`}
                        />
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <TeamsParentStyles
                elevation={0}
                style={{ borderRadius: "0.7rem", marginTop: "1rem" }}
              >
                <TeamsStyles>
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{ marginLeft: "2rem" }}
                  >
                    <div style={{ marginTop: "0.5rem" }}>
                      <CardMedia
                        component="img"
                        image={`https://cdn.nba.com/headshots/nba/latest/1040x760/${hplayJerseyFive}.png`}
                      />
                    </div>
                    <div style={{ margin: "1.3rem 0.5rem 0" }}>
                      <h3 style={{ fontSize: "1.35rem" }}>
                        {boxscore.hTeam.score}
                      </h3>
                      <Image
                        src={`/${boxscore.hTeam.triCode}.png`}
                        alt="Image"
                        width={130}
                        height={130}
                      />
                      <Typography
                        style={{ fontSize: "0.6rem" }}
                        variant="caption"
                      >
                        ({boxscore.hTeam.win}-{boxscore.hTeam.loss})
                      </Typography>
                    </div>
                  </Stack>
                  <Typography style={{ fontSize: "1rem" }} variant="subtitle1">
                    {boxscore.hTeam.triCode}
                  </Typography>
                </TeamsStyles>

                <TeamsStyles>
                  <>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        color: "grey.500",
                      }}
                      spacing={2}
                    >
                      <p style={{ fontSize: "1.4rem" }}>vs</p>
                      {boxscore.period.current > 3 ? (
                        <p style={{ fontSize: "0.8rem", color: "grey" }}>
                          FINAL
                        </p>
                      ) : (
                        <div>
                          <p style={{ fontSize: "0.8rem", color: "grey" }}>
                            Q{boxscore.period.current}
                          </p>
                          <p style={{ fontSize: "0.7rem", color: "green" }}>
                            {boxscore.gameDuration.hours}:
                            {boxscore.gameDuration.minutes}
                          </p>
                          <LinearProgress color="success" />
                        </div>
                      )}
                      <div>
                        <p style={{ fontSize: "0.7rem", color: "grey" }}>
                          {boxscore.arena.name},{"    "}
                        </p>
                        <p style={{ fontSize: "0.7rem", color: "grey" }}>
                          {boxscore.arena.city}
                        </p>
                      </div>
                    </Stack>
                  </>
                </TeamsStyles>
                <TeamsStyles>
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{ marginRight: "2rem" }}
                  >
                    <div style={{ margin: "1.3rem 0.5rem 0" }}>
                      <h3 style={{ fontSize: "1.35rem" }}>
                        {boxscore.vTeam.score}
                      </h3>
                      <Image
                        src={`/${boxscore.vTeam.triCode}.png`}
                        alt="Image"
                        width={130}
                        height={130}
                      />
                      <Typography
                        style={{ fontSize: "0.6rem" }}
                        variant="caption"
                      >
                        ({boxscore.vTeam.win}-{boxscore.vTeam.loss})
                      </Typography>
                    </div>

                    <div style={{ marginTop: "0.5rem" }}>
                      <CardMedia
                        component="img"
                        image={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playJerseyFive}.png`}
                      />
                    </div>
                  </Stack>
                  <br />
                  <Typography style={{ fontSize: "1rem" }} variant="subtitle1">
                    {boxscore.vTeam.triCode}
                  </Typography>
                </TeamsStyles>
              </TeamsParentStyles>
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.2rem" }}
              elevation={0}
            >
              {" "}
              <div style={{ margin: "0.5rem" }}>
                <Avatar
                  alt={boxscore.hTeam.triCode}
                  src={`/${boxscore.hTeam.triCode}.png`}
                />
              </div>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>STARTERS</StyledTableCell>
                    <StyledTableCell align="center">RBS</StyledTableCell>
                    <StyledTableCell align="center">ASTS</StyledTableCell>
                    <StyledTableCell align="center">PTS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {homePlayers.map((row) => (
                    <TableRow
                      key={row.jersey}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        <Chip
                          sx={{ fontSize: "0.6rem" }}
                          avatar={
                            <Avatar
                              alt={row.jersey}
                              src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${row.jersey}.png`}
                            />
                          }
                          label={row.names}
                          variant="outlined"
                        />{" "}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.rebs}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.assists}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.points}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              component={Paper}
              sx={{ width: "100%", typography: "body1", borderRadius: "10px" }}
              elevation={0}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Game Recap"
                      value="1"
                      sx={{ textTransform: "capitalize", fontSize: "0.7rem" }}
                    />
                    <Tab
                      label="Team Stats"
                      value="2"
                      sx={{ textTransform: "capitalize", fontSize: "0.7rem" }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {" "}
                  <TableContainer
                    component={Paper}
                    style={{ borderRadius: "0.2rem" }}
                    elevation={0}
                  >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Team</StyledTableCell>
                          <StyledTableCell align="right">Q1</StyledTableCell>
                          <StyledTableCell align="right">Q2</StyledTableCell>
                          <StyledTableCell align="right">Q3</StyledTableCell>
                          <StyledTableCell align="right">Q4</StyledTableCell>
                          <StyledTableCell align="right">TOTAL</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.team}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <StyledTableCell component="th" scope="row">
                              <b>{row.team}</b>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.first ? `${row.first}` : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.second ? `${row.second}` : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.third ? `${row.third}` : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.fourth ? `${row.fourth}` : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.total ? `${row.total}` : "-"}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="2">
                  <TableContainer
                    component={Paper}
                    style={{ borderRadius: "0.2rem" }}
                    elevation={0}
                  >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Team</StyledTableCell>
                          <StyledTableCell align="right">
                            Blocks
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Rebounds
                          </StyledTableCell>
                          <StyledTableCell align="right">Lead</StyledTableCell>
                          <StyledTableCell align="right">
                            Turn Overs
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Field Goals
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[boxscore].map((row) => (
                          <TableRow
                            key={row.hTeam}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <StyledTableCell component="th" scope="row">
                              <b>{row.hTeam.triCode}</b>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {" "}
                              {stats.hTeam.totals.blocks}{" "}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                              {" "}
                              {stats.hTeam.totals.totReb}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {" "}
                              {stats.hTeam.biggestLead}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                              {" "}
                              {stats.hTeam.totals.turnovers}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {" "}
                              {stats.hTeam.pointsInPaint}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableBody>
                        {[boxscore].map((row) => (
                          <TableRow
                            key={row.vTeam}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <StyledTableCell component="th" scope="row">
                              <b>{row.vTeam.triCode}</b>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {" "}
                              {stats.vTeam.totals.blocks}{" "}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {" "}
                              {stats.vTeam.totals.totReb}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                              {" "}
                              {stats.vTeam.biggestLead}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {" "}
                              {stats.vTeam.totals.turnovers}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                              {" "}
                              {stats.vTeam.pointsInPaint}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.2rem" }}
              elevation={0}
            >
              {" "}
              <div style={{ margin: "0.5rem" }}>
                <Avatar
                  alt={boxscore.vTeam.triCode}
                  src={`/${boxscore.vTeam.triCode}.png`}
                />
              </div>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>STARTERS</StyledTableCell>
                    <StyledTableCell align="center">RBS</StyledTableCell>
                    <StyledTableCell align="center">ASTS</StyledTableCell>
                    <StyledTableCell align="center">PTS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowPlayers.map((row) => (
                    <TableRow
                      key={row.jersey}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        <Chip
                          sx={{ fontSize: "0.6rem" }}
                          avatar={
                            <Avatar
                              alt={row.jersey}
                              src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${row.jersey}.png`}
                            />
                          }
                          label={row.names}
                          variant="outlined"
                        />{" "}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.rebs}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.assists}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.points}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const gameId = String(context.query.gameId);
  const gameDate = String(context.req.cookies.gamedate);

  return {
    props: {
      gameId: gameId,
      gameDate: gameDate,
    },
  };
}

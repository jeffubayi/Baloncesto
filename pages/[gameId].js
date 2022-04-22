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
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { CircularProgress,LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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
  grid-template-columns: 1fr 1fr 1fr;
  borderradius: 1rem;
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gameDate = props.gameDate;
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
        const boxscoreObject = response.data.basicGameData;
        const statsObject = response.data.stats;
        const scoreObject = response.data.basicGameData.hTeam.linescore;
        const aScoreObject = response.data.basicGameData.vTeam.linescore;
        const players = response.data.stats.activePlayers;
        setStats(statsObject);
        setScoreline(scoreObject);
        setAscoreline(aScoreObject);
        setPlayerStats(players);
        console.log(`players`, players);
        console.log(`scoreObject`, scoreObject);
        console.log(`statsObject`, statsObject);
        console.log(`boxscoreObject`, boxscoreObject);
        return setBoxscore(boxscoreObject);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [gameDate, gameId]);

  // this is not error, bcs sometimes the answer from api comes late, and in meantime we show this conditional render
  // eslint-disable-next-line
  if (!boxscore)
    return (
      <Box sx={{ flexGrow: 1, mt: 20 }}>
        <Grid container  direction="column" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item lg={12}></Grid>
          <Grid item lg={12}>
            <CircularProgress />
          </Grid>
          <Grid item lg={12}></Grid>
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
  const playJerseyOne = playerStats[0]?.pos;
  const playNamesOne = `${playerStats[0]?.firstName.charAt(0)}. ${
    playerStats[0]?.lastName
  }`;
  const playMinsOne = playerStats[0]?.min;
  const playRebsOne = playerStats[0]?.totReb;
  const playAssistsOne = playerStats[0]?.assists;
  const playPointsOne = playerStats[0]?.points;

  const playJerseyTwo = playerStats[1]?.pos;
  const playNamesTwo = `${playerStats[1]?.firstName.charAt(0)}. ${
    playerStats[1]?.lastName
  }`;
  const playMinsTwo = playerStats[1]?.min;
  const playRebsTwo = playerStats[1]?.totReb;
  const playAssistsTwo = playerStats[1]?.assists;
  const playPointsTwo = playerStats[1]?.points;

  const playJerseyThree = playerStats[2]?.pos;
  const playNamesThree = `${playerStats[2]?.firstName.charAt(0)}. ${
    playerStats[2]?.lastName
  }`;
  const playMinsThree = playerStats[2]?.min;
  const playRebsThree = playerStats[2]?.totReb;
  const playAssistsThree = playerStats[2]?.assists;
  const playPointsThree = playerStats[2]?.points;

  const playJerseyFour = playerStats[3]?.pos;
  const playNamesFour = `${playerStats[3]?.firstName.charAt(0)}. ${
    playerStats[3]?.lastName
  }`;
  const playMinsFour = playerStats[3]?.min;
  const playRebsFour = playerStats[3]?.totReb;
  const playAssistsFour = playerStats[3]?.assists;
  const playPointsFour = playerStats[3]?.points;

  const playJerseyFive = playerStats[4]?.pos;
  const playNamesFive = `${playerStats[4]?.firstName.charAt(0)}. ${
    playerStats[4]?.lastName
  }`;
  const playMinsFive = playerStats[4]?.min;
  const playRebsFive = playerStats[4]?.totReb;
  const playAssistsFive = playerStats[4]?.assists;
  const playPointsFive = playerStats[4]?.points;

  const hplayJerseyOne = playerStats[17]?.pos;
  const hplayNamesOne = `${playerStats[17]?.firstName.charAt(0)}. ${
    playerStats[17]?.lastName
  }`;
  const hplayMinsOne = playerStats[17]?.min;
  const hplayRebsOne = playerStats[17]?.totReb;
  const hplayAssistsOne = playerStats[17]?.assists;
  const hplayPointsOne = playerStats[17]?.points;

  const hplayJerseyTwo = playerStats[13]?.pos;
  const hplayNamesTwo = `${playerStats[13]?.firstName.charAt(0)}. ${
    playerStats[13]?.lastName
  }`;
  const hplayMinsTwo = playerStats[13]?.min;
  const hplayRebsTwo = playerStats[13]?.totReb;
  const hplayAssistsTwo = playerStats[13]?.assists;
  const hplayPointsTwo = playerStats[13]?.points;

  const hplayJerseyThree = playerStats[14]?.pos;
  const hplayNamesThree = `${playerStats[14]?.firstName.charAt(0)}. ${
    playerStats[14]?.lastName
  }`;
  const hplayMinsThree = playerStats[14]?.min;
  const hplayRebsThree = playerStats[14]?.totReb;
  const hplayAssistsThree = playerStats[14]?.assists;
  const hplayPointsThree = playerStats[14]?.points;

  const hplayJerseyFour = playerStats[15]?.pos;
  const hplayNamesFour = `${playerStats[15]?.firstName.charAt(0)}. ${
    playerStats[15]?.lastName
  }`;
  const hplayMinsFour = playerStats[15]?.min;
  const hplayRebsFour = playerStats[15]?.totReb;
  const hplayAssistsFour = playerStats[15]?.assists;
  const hplayPointsFour = playerStats[15]?.points;

  const hplayJerseyFive = playerStats[16]?.pos;
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
                    <Image
                      src={`/${boxscore.hTeam.triCode}.png`}
                      alt="Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div style={{ margin: "1.3rem 0.5rem 0" }}>
                    <h3 style={{ fontSize: "1.3rem" }}>
                      {boxscore.hTeam.score}
                    </h3>
                  </div>
                </Stack>
                <br />
                <span style={{ fontSize: "1.1rem" }}>
                  {boxscore.hTeam.triCode}
                </span>
                <br />
                <Typography variant="caption" display="block" gutterBottom>
                  ({boxscore.hTeam.win}-{boxscore.hTeam.loss})
                </Typography>
              </TeamsStyles>

              <TeamsStyles>
                <Stack direction="row" spacing={2}>
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
                      <p style={{ fontSize: "0.8rem", color: "grey" }}>FINAL</p>
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
                        <br />
                        {boxscore.arena.city}
                        <br />
                      </p>
                    </div>
                  </Stack>
                </Stack>
              </TeamsStyles>
              <TeamsStyles>
                <Stack
                  direction="row"
                  spacing={2}
                  style={{ marginRight: "2rem" }}
                >
                  <div style={{ margin: "1.3rem 0.5rem 0" }}>
                    <h3 style={{ fontSize: "1.3rem" }}>
                      {boxscore.vTeam.score}
                    </h3>
                  </div>

                  <div style={{ marginTop: "0.5rem" }}>
                    <Image
                      src={`/${boxscore.vTeam.triCode}.png`}
                      alt="Image"
                      width={100}
                      height={100}
                    />
                  </div>
                </Stack>
                <br />
                <span style={{ fontSize: "1.1rem" }}>
                  {boxscore.vTeam.triCode}
                </span>
                <br />
                <Typography variant="caption" display="block" gutterBottom>
                  ({boxscore.vTeam.win}-{boxscore.vTeam.loss})
                </Typography>
              </TeamsStyles>
            </TeamsParentStyles>
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
                    <TableCell>STARTERS</TableCell>
                    <TableCell align="center">RBS</TableCell>
                    <TableCell align="center">ASTS</TableCell>
                    <TableCell align="center">PTS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {homePlayers.map((row) => (
                    <TableRow
                      key={row.jersey}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Chip
                          avatar={<Avatar alt={row.jersey} src="" />}
                          label={row.names}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                      <TableCell align="center">{row.rebs}</TableCell>
                      <TableCell align="center">{row.assists}</TableCell>
                      <TableCell align="center">{row.points}</TableCell>
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
                    <Tab label="Game Recap" value="1" />
                    <Tab label="Team Stats" value="2" />
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
                          <TableCell>Team</TableCell>
                          <TableCell align="right">Q1</TableCell>
                          <TableCell align="right">Q2</TableCell>
                          <TableCell align="right">Q3</TableCell>
                          <TableCell align="right">Q4</TableCell>
                          <TableCell align="right">TOTAL</TableCell>
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
                            <TableCell component="th" scope="row">
                              <b>{row.team}</b>
                            </TableCell>
                            <TableCell align="right">
                              {row.first ? `${row.first}` : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {row.second ? `${row.second}` : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {row.third ? `${row.third}` : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {row.fourth ? `${row.fourth}` : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {row.total ? `${row.total}` : "-"}
                            </TableCell>
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
                          <TableCell>Team</TableCell>
                          <TableCell align="right">Blocks</TableCell>
                          <TableCell align="right">Rebounds</TableCell>
                          <TableCell align="right">Lead</TableCell>
                          <TableCell align="right">Turn Overs</TableCell>
                          <TableCell align="right">Field Goals</TableCell>
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
                            <TableCell component="th" scope="row">
                              <b>{row.hTeam.triCode}</b>
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {stats.hTeam.totals.blocks}{" "}
                            </TableCell>

                            <TableCell align="right">
                              {" "}
                              {stats.hTeam.totals.totReb}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {stats.hTeam.biggestLead}
                            </TableCell>

                            <TableCell align="right">
                              {" "}
                              {stats.hTeam.totals.turnovers}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {stats.hTeam.pointsInPaint}
                            </TableCell>
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
                            <TableCell component="th" scope="row">
                              <b>{row.vTeam.triCode}</b>
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {stats.vTeam.totals.blocks}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {stats.vTeam.totals.totReb}
                            </TableCell>

                            <TableCell align="right">
                              {" "}
                              {stats.vTeam.biggestLead}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {stats.vTeam.totals.turnovers}
                            </TableCell>

                            <TableCell align="right">
                              {" "}
                              {stats.vTeam.pointsInPaint}
                            </TableCell>
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
                    <TableCell>STARTERS</TableCell>
                    <TableCell align="center">RBS</TableCell>
                    <TableCell align="center">ASTS</TableCell>
                    <TableCell align="center">PTS</TableCell>
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
                      <TableCell component="th" scope="row">
                        <Chip
                          avatar={<Avatar alt={row.jersey} src="" />}
                          label={row.names}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                      <TableCell align="center">{row.rebs}</TableCell>
                      <TableCell align="center">{row.assists}</TableCell>
                      <TableCell align="center">{row.points}</TableCell>
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

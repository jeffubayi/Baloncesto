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
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

const axios = require("axios");
const paddBott = "20px";
const ourGray = "#051c2d";
const lightGray = "#E9E4E4";

const BoxscoreHeadingStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: ${ourGray};
  color: ${lightGray};
`;

const TeamsParentStyles = styled(Paper)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 1rem;
  borderradius: 1rem;
`;

const TeamsStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
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
  const gameDate = props.gameDate;
  function renderRow(stats) {
    return (
      <ListItem component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={stats.activePlayers} />
        </ListItemButton>
      </ListItem>
    );
  }

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
      <>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <h6 style={{ color: "grey", textAlign: "center", padding: "2rem" }}>
              The stats will populate once the game commences
            </h6>
            <div style={{ display: "flex", justifyContent: "center" }}>
             <Image src="https://c.tenor.com/IOxRkEFDAwMAAAAj/sports-sportsmanias.gif" alt="Image" width={150} height={150} /> 
            </div>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Recap</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Team stats</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Game Leaders</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell align="center"> Most Points</TableCell>
                    <TableCell align="center"> Most Rebounds</TableCell>
                    <TableCell align="center">Most Assists</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Game Leaders</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                    <TableCell>STARTERS</TableCell>
                    <TableCell align="center">POS</TableCell>
                    <TableCell align="center">Minutes</TableCell>
                    <TableCell align="center">Rebounds</TableCell>
                    <TableCell align="center">Assists</TableCell>
                    <TableCell align="center">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
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
      <BoxscoreHeadingStyles>
        Location :{"    "}
        {boxscore.arena.name},{"    "}
        {boxscore.arena.city}
        <br />
        Time : {"    "}
        {boxscore.homeStartTime.slice(0, 2)}:
        {boxscore.homeStartTime.slice(2, 4)},{"    "}
        {boxscore.homeStartDate.slice(6, 8)}.
        {boxscore.homeStartDate.slice(4, 6)}.
        {boxscore.homeStartDate.slice(0, 4)}
        <br />
      </BoxscoreHeadingStyles>
      <TeamsParentStyles elevation={5} style={{ borderRadius: "0.7rem" }}>
        <TeamsStyles>
          <Stack direction="row" spacing={2} style={{ marginLeft: "2rem" }}>
            <div style={{ marginTop: "0.5rem" }}>
              <Image
                src={`/${boxscore.hTeam.triCode}.png`}
                alt="Image"
                width={100}
                height={100}
              />
            </div>
            <div style={{ margin: "1.3rem 0.5rem 0" }}>
              <h3 style={{ fontSize: "1.3rem" }}>{boxscore.hTeam.score}</h3>
            </div>
          </Stack>
          <br />
          <span style={{ fontSize: "1.1rem" }}>{boxscore.hTeam.triCode}</span>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
            ({boxscore.hTeam.win}-{boxscore.hTeam.loss})
          </Typography>
        </TeamsStyles>

        <div
          style={{
            display: "grid",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <p style={{ fontSize: "1.4rem" }}>vs</p>
          {boxscore.period.current > 3  ? (
            <p style={{ fontSize: "0.8rem", color: "grey" }}>FINAL</p>
          ) : (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <p style={{ fontSize: "0.8rem", color: "grey" }}>Q{boxscore.period.current}</p>
              <p style={{ fontSize: "0.7rem", color: "green" }}>{boxscore.gameDuration.hours}:{boxscore.gameDuration.minutes}</p>
              <LinearProgress color="success" />
            </Stack>
          )}
        </div>
        <TeamsStyles>
          <Stack direction="row" spacing={2} style={{ marginRight: "2rem" }}>
            <div style={{ margin: "1.3rem 0.5rem 0" }}>
              <h3 style={{ fontSize: "1.3rem" }}>{boxscore.vTeam.score}</h3>
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
          <span style={{ fontSize: "1.1rem" }}>{boxscore.vTeam.triCode}</span>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
            ({boxscore.vTeam.win}-{boxscore.vTeam.loss})
          </Typography>
        </TeamsStyles>
      </TeamsParentStyles>
      {scoreline[0]?.score ? (
        <>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Recap</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <b>{row.team}</b>
                      </TableCell>
                      <TableCell align="right">{row.first ? `${row.first}` : "-" }</TableCell>
                      <TableCell align="right">{row.second ? `${row.second}` : "-" }</TableCell>
                      <TableCell align="right">{row.third ? `${row.third}` : "-" }</TableCell>
                      <TableCell align="right">{row.fourth ? `${row.fourth}` : "-" }</TableCell>
                      <TableCell align="right">{row.total ? `${row.total}` : "-" }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Team stats</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          </Paper>

          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Game Leaders</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell align="center"> Most Points</TableCell>
                    <TableCell align="center"> Most Rebounds</TableCell>
                    <TableCell align="center">Most Assists</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.hTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <b>{row.hTeam.triCode}</b>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {stats.hTeam.leaders.points.value}
                        <br />{" "}
                        <Chip
                          avatar={
                            <Avatar
                              alt={
                                stats.hTeam.leaders.points.players[0].lastName
                              }
                              src=""
                            />
                          }
                          label={`${stats.hTeam.leaders.points.players[0].firstName.charAt(
                            0
                          )}. ${
                            stats.hTeam.leaders.points.players[0].lastName
                          }`}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {stats.hTeam.leaders.rebounds.value}
                        <br />{" "}
                        <Chip
                          avatar={
                            <Avatar
                              alt={
                                stats.hTeam.leaders.rebounds.players[0].lastName
                              }
                              src=""
                            />
                          }
                          label={`${stats.hTeam.leaders.rebounds.players[0].firstName.charAt(
                            0
                          )}. ${
                            stats.hTeam.leaders.rebounds.players[0].lastName
                          }`}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {stats.hTeam.leaders.assists.value}
                        <br />{" "}
                        <Chip
                          avatar={
                            <Avatar
                              alt={
                                stats.hTeam.leaders.assists.players[0].lastName
                              }
                              src=""
                            />
                          }
                          label={`${stats.hTeam.leaders.assists.players[0].firstName.charAt(
                            0
                          )}. ${
                            stats.hTeam.leaders.assists.players[0].lastName
                          }`}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.vTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <b>{row.vTeam.triCode}</b>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {stats.vTeam.leaders.points.value}
                        <br />{" "}
                        <Chip
                          avatar={
                            <Avatar
                              alt={
                                stats.vTeam.leaders.points.players[0].lastName
                              }
                              src=""
                            />
                          }
                          label={`${stats.vTeam.leaders.points.players[0].firstName.charAt(
                            0
                          )}. ${
                            stats.vTeam.leaders.points.players[0].lastName
                          }`}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {stats.vTeam.leaders.rebounds.value}
                        <br />{" "}
                        <Chip
                          avatar={
                            <Avatar
                              alt={
                                stats.vTeam.leaders.rebounds.players[0].lastName
                              }
                              src=""
                            />
                          }
                          label={`${stats.vTeam.leaders.rebounds.players[0].firstName.charAt(
                            0
                          )}. ${
                            stats.vTeam.leaders.rebounds.players[0].lastName
                          }`}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {stats.vTeam.leaders.assists.value}
                        <br />{" "}
                        <Chip
                          avatar={
                            <Avatar
                              alt={
                                stats.vTeam.leaders.assists.players[0].lastName
                              }
                              src=""
                            />
                          }
                          label={`${stats.vTeam.leaders.assists.players[0].firstName.charAt(
                            0
                          )}. ${
                            stats.vTeam.leaders.assists.players[0].lastName
                          }`}
                          variant="outlined"
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <StyledDiv>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              {" "}
              <div style={{ margin: "0.5rem" }}>
                <Avatar
                  alt={boxscore.hTeam.triCode}
                  src={`/${boxscore.hTeam.triCode}.png`}
                />
              </div>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>STARTERS</TableCell>
                    <TableCell align="center">POS</TableCell>
                    <TableCell align="center">MIN</TableCell>
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
                      <TableCell align="center">{row.jersey}</TableCell>
                      <TableCell align="center">{row.mins}</TableCell>
                      <TableCell align="center">{row.rebs}</TableCell>
                      <TableCell align="center">{row.assists}</TableCell>
                      <TableCell align="center">{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              {" "}
              <div style={{ margin: "0.5rem" }}>
                <Avatar
                  alt={boxscore.vTeam.triCode}
                  src={`/${boxscore.vTeam.triCode}.png`}
                />
              </div>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>STARTERS</TableCell>
                    <TableCell align="center">POS</TableCell>
                    <TableCell align="center">MIN</TableCell>
                    <TableCell align="center">RBS</TableCell>
                    <TableCell align="center">ASTS</TableCell>
                    <TableCell align="center">PTS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowPlayers.map((row) => (
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
                      <TableCell align="center">{row.jersey}</TableCell>
                      <TableCell align="center">{row.mins}</TableCell>
                      <TableCell align="center">{row.rebs}</TableCell>
                      <TableCell align="center">{row.assists}</TableCell>
                      <TableCell align="center">{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </StyledDiv>
        </>
      ) : (
        <>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <h6 style={{ color: "grey", textAlign: "center", padding: "2rem" }}>
              The stats will populate once the game commences
            </h6>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <Image src="https://c.tenor.com/IOxRkEFDAwMAAAAj/sports-sportsmanias.gif" alt="Image" width={150} height={150} /> */}
            </div>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Recap</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.hTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.hTeam.triCode}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.vTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.vTeam.triCode}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Team stats</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.hTeam.triCode}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.vTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.vTeam.triCode}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
            <TableContainer
              component={Paper}
              style={{ borderRadius: "0.7rem" }}
            >
              <h5 style={{ marginLeft: "1rem" }}>Game Leaders</h5>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell align="center"> Most Points</TableCell>
                    <TableCell align="center"> Most Rebounds</TableCell>
                    <TableCell align="center">Most Assists</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.hTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.hTeam.triCode}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  {[boxscore].map((row) => (
                    <TableRow
                      key={row.vTeam}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.vTeam.triCode}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
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

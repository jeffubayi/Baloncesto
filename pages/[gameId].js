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
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

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

export default function BoxScore(props) {
  const [boxscore, setBoxscore] = useState(null);
  const [stats, setStats] = useState(null);
  const [scoreline, setScoreline] = useState([]);
  const [AwayScoreline, setAscoreline] = useState([]);
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
        setStats(statsObject);
        setScoreline(scoreObject);
        setAscoreline(aScoreObject);
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
      <div style={{height:"100%",width:"100%",display:"grid",justifyContent:"center"}}>
        <div style={{ display:"flex",justifyContent: "center"}}>
            <Image src="https://c.tenor.com/IOxRkEFDAwMAAAAj/sports-sportsmanias.gif" alt="Image" width={150} height={150} />
            </div>
      </div>
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
                src={`/${boxscore.vTeam.triCode}.png`}
                alt="Image"
                width={100}
                height={100}
              />
            </div>
            <div style={{ margin: "1.3rem 0.5rem 0" }}>
              <h3 style={{ fontSize: "1.3rem" }}>{boxscore.vTeam.score}</h3>
            </div>
          </Stack>
          <br />
          <span style={{ fontSize: "1.1rem" }}>{boxscore.vTeam.triCode}</span>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
            ({boxscore.vTeam.win}-{boxscore.vTeam.loss})
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
          <p style={{ fontSize: "0.8rem", color: "grey" }}>FINAL</p>
        </div>
        <TeamsStyles>
          <Stack direction="row" spacing={2} style={{ marginRight: "2rem" }}>
            <div style={{ margin: "1.3rem 0.5rem 0" }}>
              <h3 style={{ fontSize: "1.3rem" }}>{boxscore.hTeam.score}</h3>
            </div>

            <div style={{ marginTop: "0.5rem" }}>
              <Image
                src={`/${boxscore.hTeam.triCode}.png`}
                alt="Image"
                width={100}
                height={100}
              />
            </div>
          </Stack>
          <br />
          <span style={{ fontSize: "1.1rem" }}>{boxscore.hTeam.triCode}</span>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
            ({boxscore.hTeam.win}-{boxscore.hTeam.loss})
          </Typography>
        </TeamsStyles>
      </TeamsParentStyles>
      {scoreline[0]?.score ? (
        <>
      <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem" }}>
          <h5 style={{ marginLeft: "1rem" }}>Recap</h5>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell align="right">1ST</TableCell>
                <TableCell align="right">2ND</TableCell>
                <TableCell align="right">3RD</TableCell>
                <TableCell align="right">4TH</TableCell>
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
                  <TableCell align="right">{row.first}</TableCell>
                  <TableCell align="right">{row.second}</TableCell>
                  <TableCell align="right">{row.third}</TableCell>
                  <TableCell align="right">{row.fourth}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem" }}>
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
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem" }}>
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
                          alt={stats.hTeam.leaders.points.players[0].lastName}
                          src=""
                        />
                      }
                      label={`${stats.hTeam.leaders.points.players[0].firstName.charAt(
                        0
                      )}. ${stats.hTeam.leaders.points.players[0].lastName}`}
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
                          alt={stats.hTeam.leaders.rebounds.players[0].lastName}
                          src=""
                        />
                      }
                      label={`${stats.hTeam.leaders.rebounds.players[0].firstName.charAt(
                        0
                      )}. ${stats.hTeam.leaders.rebounds.players[0].lastName}`}
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
                          alt={stats.hTeam.leaders.assists.players[0].lastName}
                          src=""
                        />
                      }
                      label={`${stats.hTeam.leaders.assists.players[0].firstName.charAt(
                        0
                      )}. ${stats.hTeam.leaders.assists.players[0].lastName}`}
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
                          alt={stats.vTeam.leaders.points.players[0].lastName}
                          src=""
                        />
                      }
                      label={`${stats.vTeam.leaders.points.players[0].firstName.charAt(
                        0
                      )}. ${stats.vTeam.leaders.points.players[0].lastName}`}
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
                          alt={stats.vTeam.leaders.rebounds.players[0].lastName}
                          src=""
                        />
                      }
                      label={`${stats.vTeam.leaders.rebounds.players[0].firstName.charAt(
                        0
                      )}. ${stats.vTeam.leaders.rebounds.players[0].lastName}`}
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
                          alt={stats.vTeam.leaders.assists.players[0].lastName}
                          src=""
                        />
                      }
                      label={`${stats.vTeam.leaders.assists.players[0].firstName.charAt(
                        0
                      )}. ${stats.vTeam.leaders.assists.players[0].lastName}`}
                      variant="outlined"
                    />{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </>
      ):(
        <>
        <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
          <h6 style={{ color: "grey",textAlign:"center",padding:"2rem" }}>
            The stats will populate once the game commences
            </h6>
            <div style={{ display:"flex",justifyContent: "center"}}>
            <Image src="https://c.tenor.com/IOxRkEFDAwMAAAAj/sports-sportsmanias.gif" alt="Image" width={150} height={150} />
            </div>
        </Paper>
        <Paper style={{ margin: "1rem", borderRadius: "0.7rem" }}>
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem" }}>
          <h5 style={{ marginLeft: "1rem" }}>Recap</h5>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell align="right">1ST</TableCell>
                <TableCell align="right">2ND</TableCell>
                <TableCell align="right">3RD</TableCell>
                <TableCell align="right">4TH</TableCell>
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
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem" }}>
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
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem" }}>
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

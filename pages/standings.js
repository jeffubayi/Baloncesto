import { css } from "@emotion/react";
import Head from "next/head";
import Image from "next/image";
import getStandings from "../components/standings";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Paper } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { StyledDiv } from "./scores";
import useMediaQuery from "@mui/material/useMediaQuery";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#051c2d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ourGray = "#1d2d35";
const lightGray = "#E9E4E4";

export default function Standings(props) {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  getStandings();
  return (
    <>
      <Head>
        <title>NBA Standings</title>
      </Head>

      <TabContext value={value}>
        <Paper
          elevation={4}
          style={{
            display: "grid",
            padding: "0.3rem",
            width: "auto",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h4>NBA Season 2020/2021</h4>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              style={{ textAlign: "center" }}
            >
              <Tab
                label="East Conference"
                value="1"
                style={{ textTransform: "capitalize" }}
              />
              <Tab
                label="West Conference"
                value="2"
                style={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Divisions"
                value="3"
                style={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
        </Paper>
        <div
          style={{
            padding: "2rem",
          }}
        >
          <TabPanel value="1">
            {isSmallWindow ? (
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        {" "}
                        <Avatar
                          src="https://i.pinimg.com/originals/01/41/16/0141166a90aa673e552a1472badcd8cb.gif"
                          alt="Image"
                          width={30}
                          height={30}
                        />
                      </StyledTableCell>
                      <StyledTableCell>Eastern Conference</StyledTableCell>
                      <StyledTableCell>Wins</StyledTableCell>
                      <StyledTableCell>Loses</StyledTableCell>
                      <StyledTableCell align="right">GB</StyledTableCell>
                      <StyledTableCell align="right">Pct(%)</StyledTableCell>
                      <StyledTableCell align="right">L10</StyledTableCell>
                      <StyledTableCell align="right">Streak</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.standingsArray.league.standard.conference.east.map(
                      (team) => (
                        <StyledTableRow key={team.teamId}>
                          <StyledTableCell component="th" scope="row">
                            {" "}
                            {team.confRank}
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2,auto)",
                            }}
                          >
                            <Avatar
                              src={`/${team.teamSitesOnly.teamTricode}.png`}
                              alt="Image"
                              style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                            {team.teamSitesOnly.teamNickname}
                          </StyledTableCell>
                          <StyledTableCell>{team.win}</StyledTableCell>
                          <StyledTableCell>{team.loss}</StyledTableCell>
                          <StyledTableCell align="right">
                            {team.gamesBehind}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {(Number(team.winPct) * 100).toFixed(1)}%
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {team.lastTenWin}-{team.lastTenLoss}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {" "}
                            {team.streak}{" "}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        {" "}
                        <Avatar
                          src="https://i.pinimg.com/originals/01/41/16/0141166a90aa673e552a1472badcd8cb.gif"
                          alt="Image"
                          width={30}
                          height={30}
                        />
                      </StyledTableCell>
                      <StyledTableCell>Eastern Conference</StyledTableCell>
                      <StyledTableCell>Wins</StyledTableCell>
                      <StyledTableCell>Loses</StyledTableCell>
                      <StyledTableCell align="right">GB</StyledTableCell>
                      <StyledTableCell align="right">Pct(%)</StyledTableCell>
                      <StyledTableCell align="right">L10</StyledTableCell>
                      <StyledTableCell align="right">Home win</StyledTableCell>
                      <StyledTableCell align="right">Home loss</StyledTableCell>
                      <StyledTableCell align="right">Away win</StyledTableCell>
                      <StyledTableCell align="right">Away loss</StyledTableCell>
                      <StyledTableCell align="right">Streak</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.standingsArray.league.standard.conference.east.map(
                      (team) => (
                        <StyledTableRow key={team.teamId}>
                          <StyledTableCell component="th" scope="row">
                            {" "}
                            {team.confRank}
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2,auto)",
                            }}
                          >
                            <Avatar
                              src={`/${team.teamSitesOnly.teamTricode}.png`}
                              alt="Image"
                              style={{ width: "1.5rem", height: "1.5rem" }}
                            />{" "}
                            {team.teamSitesOnly.teamKey.concat(" ",
                            `${team.teamSitesOnly.teamNickname}`)}

                          </StyledTableCell>
                          <StyledTableCell>{team.win}</StyledTableCell>
                          <StyledTableCell>{team.loss}</StyledTableCell>
                          <StyledTableCell align="right">
                            {team.gamesBehind}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {(Number(team.winPct) * 100).toFixed(1)}%
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {team.lastTenWin}-{team.lastTenLoss}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {" "}
                            {team.homeWin}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {" "}
                            {team.homeLoss}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {" "}
                            {team.awayWin}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {" "}
                            {team.awayLoss}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {" "}
                            {team.streak}{" "}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          <TabPanel value="2">
            {isSmallWindow ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {" "}
                      <Avatar
                        src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                        alt="Image"
                        width={30}
                        height={30}
                      />
                    </StyledTableCell>
                    <StyledTableCell>Western Conference</StyledTableCell>
                    <StyledTableCell align="right">Wins</StyledTableCell>
                    <StyledTableCell align="right">Loses</StyledTableCell>
                    <StyledTableCell align="right">GB</StyledTableCell>
                    <StyledTableCell align="right">Pct(%)</StyledTableCell>
                    <StyledTableCell align="right">L10</StyledTableCell>
                    <StyledTableCell align="right">Streak</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.standingsArray.league.standard.conference.west.map(
                    (team) => (
                      <StyledTableRow key={team.teamId}>
                        <StyledTableCell component="th" scope="row">
                          {team.confRank}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,auto)",
                            gap: "0.5rem",
                          }}
                        >
                          <Avatar
                            src={`/${team.teamSitesOnly.teamTricode}.png`}
                            alt="Image"
                            width={30}
                            height={30}
                          />
                          {team.teamSitesOnly.teamNickname}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.win}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.loss}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.gamesBehind}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {(Number(team.winPct) * 100).toFixed(1)}%
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.lastTenWin}-{team.lastTenLoss}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {team.streak}{" "}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            ):(
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {" "}
                      <Avatar
                        src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                        alt="Image"
                        width={30}
                        height={30}
                      />
                    </StyledTableCell>
                    <StyledTableCell>Western Conference</StyledTableCell>
                    <StyledTableCell>Wins</StyledTableCell>
                    <StyledTableCell>Loses</StyledTableCell>
                    <StyledTableCell align="right">GB</StyledTableCell>
                    <StyledTableCell align="right">Pct(%)</StyledTableCell>
                    <StyledTableCell align="right">L10</StyledTableCell>
                    <StyledTableCell align="right">Home win</StyledTableCell>
                    <StyledTableCell align="right">Home loss</StyledTableCell>
                    <StyledTableCell align="right">Away win</StyledTableCell>
                    <StyledTableCell align="right">Away loss</StyledTableCell>
                    <StyledTableCell align="right">Streak</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.standingsArray.league.standard.conference.west.map(
                    (team) => (
                      <StyledTableRow key={team.teamId}>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {team.confRank}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,auto)",
                          }}
                        >
                          <Avatar
                            src={`/${team.teamSitesOnly.teamTricode}.png`}
                            alt="Image"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />{" "}
                          {team.teamSitesOnly.teamKey.concat(" ",
                          `${team.teamSitesOnly.teamNickname}`)}

                        </StyledTableCell>
                        <StyledTableCell>{team.win}</StyledTableCell>
                        <StyledTableCell>{team.loss}</StyledTableCell>
                        <StyledTableCell align="right">
                          {team.gamesBehind}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {(Number(team.winPct) * 100).toFixed(1)}%
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.lastTenWin}-{team.lastTenLoss}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {team.homeWin}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {team.homeLoss}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {team.awayWin}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {team.awayLoss}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {team.streak}{" "}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            )}
          </TabPanel>

          <TabPanel value="3">
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 2, sm: 2, lg: 3 }}
              >
                <Grid item xs={12} lg={6}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            {" "}
                            <Avatar
                              src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          </StyledTableCell>
                          <StyledTableCell> South West</StyledTableCell>
                          <StyledTableCell align="right">Wins</StyledTableCell>
                          <StyledTableCell align="right">Loses</StyledTableCell>
                          <StyledTableCell align="right">GB</StyledTableCell>
                          <StyledTableCell align="right">
                            Pct(%)
                          </StyledTableCell>
                          <StyledTableCell align="right">L10</StyledTableCell>
                          <StyledTableCell align="right">
                            Streak
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.standingsArray.league.standard.conference.west
                          .slice(0, 5)
                          .map((team) => (
                            <StyledTableRow key={team.teamId}>
                              <StyledTableCell component="th" scope="row">
                                {team.divRank}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(2,auto)",
                                  gap: "0.5rem",
                                }}
                              >
                                <Avatar
                                  src={`/${team.teamSitesOnly.teamTricode}.png`}
                                  alt="Image"
                                  width={30}
                                  height={30}
                                />
                                {team.teamSitesOnly.teamKey}
                                <br></br>
                                {team.teamSitesOnly.teamNickname}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.win}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.loss}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.gamesBehind}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {(Number(team.winPct) * 100).toFixed(1)}%
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.lastTenWin}-{team.lastTenLoss}{" "}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {" "}
                                {team.streak}{" "}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            {" "}
                            <Avatar
                              src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          </StyledTableCell>
                          <StyledTableCell> South East</StyledTableCell>
                          <StyledTableCell align="right">Wins</StyledTableCell>
                          <StyledTableCell align="right">Loses</StyledTableCell>
                          <StyledTableCell align="right">GB</StyledTableCell>
                          <StyledTableCell align="right">
                            Pct(%)
                          </StyledTableCell>
                          <StyledTableCell align="right">L10</StyledTableCell>
                          <StyledTableCell align="right">
                            Streak
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.standingsArray.league.standard.conference.east
                          .slice(0, 5)
                          .map((team) => (
                            <StyledTableRow key={team.teamId}>
                              <StyledTableCell component="th" scope="row">
                                {team.divRank}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(2,auto)",
                                  gap: "0.5rem",
                                }}
                              >
                                <Avatar
                                  src={`/${team.teamSitesOnly.teamTricode}.png`}
                                  alt="Image"
                                  width={30}
                                  height={30}
                                />
                                {team.teamSitesOnly.teamKey}
                                <br></br>
                                {team.teamSitesOnly.teamNickname}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.win}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.loss}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.gamesBehind}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {(Number(team.winPct) * 100).toFixed(1)}%
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.lastTenWin}-{team.lastTenLoss}{" "}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {" "}
                                {team.streak}{" "}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            {" "}
                            <Avatar
                              src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          </StyledTableCell>
                          <StyledTableCell> Central Western </StyledTableCell>
                          <StyledTableCell align="right">Wins</StyledTableCell>
                          <StyledTableCell align="right">Loses</StyledTableCell>
                          <StyledTableCell align="right">GB</StyledTableCell>
                          <StyledTableCell align="right">
                            Pct(%)
                          </StyledTableCell>
                          <StyledTableCell align="right">L10</StyledTableCell>
                          <StyledTableCell align="right">
                            Streak
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.standingsArray.league.standard.conference.west
                          .slice(5, 10)
                          .map((team) => (
                            <StyledTableRow key={team.teamId}>
                              <StyledTableCell component="th" scope="row">
                                {team.divRank}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(2,auto)",
                                  gap: "0.5rem",
                                }}
                              >
                                <Avatar
                                  src={`/${team.teamSitesOnly.teamTricode}.png`}
                                  alt="Image"
                                  width={30}
                                  height={30}
                                />
                                {team.teamSitesOnly.teamKey}
                                <br></br>
                                {team.teamSitesOnly.teamNickname}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.win}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.loss}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.gamesBehind}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {(Number(team.winPct) * 100).toFixed(1)}%
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.lastTenWin}-{team.lastTenLoss}{" "}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {" "}
                                {team.streak}{" "}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            {" "}
                            <Avatar
                              src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          </StyledTableCell>
                          <StyledTableCell> Central Eastern</StyledTableCell>
                          <StyledTableCell align="right">Wins</StyledTableCell>
                          <StyledTableCell align="right">Loses</StyledTableCell>
                          <StyledTableCell align="right">GB</StyledTableCell>
                          <StyledTableCell align="right">
                            Pct(%)
                          </StyledTableCell>
                          <StyledTableCell align="right">L10</StyledTableCell>
                          <StyledTableCell align="right">
                            Streak
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.standingsArray.league.standard.conference.east
                          .slice(5, 10)
                          .map((team) => (
                            <StyledTableRow key={team.teamId}>
                              <StyledTableCell component="th" scope="row">
                                {team.divRank}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(2,auto)",
                                  gap: "0.5rem",
                                }}
                              >
                                <Avatar
                                  src={`/${team.teamSitesOnly.teamTricode}.png`}
                                  alt="Image"
                                  width={30}
                                  height={30}
                                />
                                {team.teamSitesOnly.teamKey}
                                <br></br>
                                {team.teamSitesOnly.teamNickname}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.win}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.loss}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.gamesBehind}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {(Number(team.winPct) * 100).toFixed(1)}%
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.lastTenWin}-{team.lastTenLoss}{" "}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {" "}
                                {team.streak}{" "}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            {" "}
                            <Avatar
                              src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          </StyledTableCell>
                          <StyledTableCell> Atlantic Western </StyledTableCell>
                          <StyledTableCell align="right">Wins</StyledTableCell>
                          <StyledTableCell align="right">Loses</StyledTableCell>
                          <StyledTableCell align="right">GB</StyledTableCell>
                          <StyledTableCell align="right">
                            Pct(%)
                          </StyledTableCell>
                          <StyledTableCell align="right">L10</StyledTableCell>
                          <StyledTableCell align="right">
                            Streak
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.standingsArray.league.standard.conference.west
                          .slice(11, 15)
                          .map((team) => (
                            <StyledTableRow key={team.teamId}>
                              <StyledTableCell component="th" scope="row">
                                {team.divRank}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(2,auto)",
                                  gap: "0.5rem",
                                }}
                              >
                                <Avatar
                                  src={`/${team.teamSitesOnly.teamTricode}.png`}
                                  alt="Image"
                                  width={30}
                                  height={30}
                                />
                                {team.teamSitesOnly.teamKey}
                                <br></br>
                                {team.teamSitesOnly.teamNickname}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.win}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.loss}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.gamesBehind}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {(Number(team.winPct) * 100).toFixed(1)}%
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.lastTenWin}-{team.lastTenLoss}{" "}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {" "}
                                {team.streak}{" "}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            {" "}
                            <Avatar
                              src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          </StyledTableCell>
                          <StyledTableCell> Atlantic Eastern</StyledTableCell>
                          <StyledTableCell align="right">Wins</StyledTableCell>
                          <StyledTableCell align="right">Loses</StyledTableCell>
                          <StyledTableCell align="right">GB</StyledTableCell>
                          <StyledTableCell align="right">
                            Pct(%)
                          </StyledTableCell>
                          <StyledTableCell align="right">L10</StyledTableCell>
                          <StyledTableCell align="right">
                            Streak
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.standingsArray.league.standard.conference.east
                          .slice(11, 15)
                          .map((team) => (
                            <StyledTableRow key={team.teamId}>
                              <StyledTableCell component="th" scope="row">
                                {team.divRank}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(2,auto)",
                                  gap: "0.5rem",
                                }}
                              >
                                <Avatar
                                  src={`/${team.teamSitesOnly.teamTricode}.png`}
                                  alt="Image"
                                  width={30}
                                  height={30}
                                />
                                {team.teamSitesOnly.teamKey}
                                <br></br>
                                {team.teamSitesOnly.teamNickname}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.win}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.loss}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.gamesBehind}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {(Number(team.winPct) * 100).toFixed(1)}%
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {team.lastTenWin}-{team.lastTenLoss}{" "}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {" "}
                                {team.streak}{" "}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </div>
      </TabContext>
    </>
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

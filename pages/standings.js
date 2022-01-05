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

// const StandingsStyles = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;

//   h3 {
//     background-color: ${lightGray};
//     color: ${ourGray};
//     text-align: center;
//     padding: 20px;
//   }

//   li {
//     background-color: ${ourGray};
//     color: ${lightGray};
//     text-align: center;
//     padding: 5px;
//     font-size: 0.8rem;
//   }

//   ul {
//     list-style-type: none;
//   }

//   span {
//     padding-left: 15px;
//   }
// `;

// const HeadingStandingsStyles = styled.div`
//   background-color: ${lightGray};
//   color: ${ourGray};
//   h2 {
//     background-color: ${ourGray};
//     color: ${lightGray};
//     text-align: center;
//     padding: 20px;
//   }
// `;

export default function Standings(props) {
  getStandings();
  return (
    <>
      <Head>
        <title>NBA Standings</title>
      </Head>

      <div>
        <h2
          data-cy="standings-page-content-h2"
          style={{ display: "grid", justifyContent: "center" }}
        >
          NBA Standings 2020/2021
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,auto)",
            gap: "3rem",
            padding: "3rem",
          }}
        >
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right">Eastern Conference</StyledTableCell>
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
                            style={{width:"1.5rem",height:"1.5rem"}}
                          />{" "}
                          {team.teamSitesOnly.teamKey}
                          <br></br>
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
          </div>

          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="left">Western Conference</StyledTableCell>
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
                        <StyledTableCell
                          component="th"
                          scope="row"
                        >{team.confRank}</StyledTableCell>
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
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
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

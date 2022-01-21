import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const axios = require('axios');
const paddBott = '20px';
const ourGray =  "#051c2d";
const lightGray = '#E9E4E4';

const BoxscoreHeadingStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 0.8em;
  background-color: ${ourGray};
  color: ${lightGray};
`;

const TeamsParentStyles = styled(Paper)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin:1rem;
  borderRadius: 1rem;
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default function BoxScore(props) {
  const [boxscore, setBoxscore] = useState(null);
  const [stats, setStats] = useState(null);
  const gameDate = props.gameDate;

  const gameId = props.gameId;
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://data.nba.net/prod/v1/${gameDate}/${gameId}_boxscore.json`,
      params: {},
      headers: {},
    };
    axios
      .request(options)
      .then(function (response) {
        const boxscoreObject = response.data.basicGameData;
        const statsObject = response.data.stats;
          setStats(statsObject);
          console.log(`statsObject`,statsObject)
          console.log(`boxscoreObject`,boxscoreObject)
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
      <div css={loaderStyles}>
        <Image src="/Loader.gif" alt="Image" width={100} height={100} />
        <p>Searching for the stats...</p>
      </div>
    );
    
    function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
      createData('Lakers', 20, 16, 24, 18),
      createData('Pacers', 23, 9, 27, 18),
    ];

  return (
    <>
      <Head>
        <title>Box score</title>
      </Head>
      <BoxscoreHeadingStyles>
        Place:
        {'    '}
        {boxscore.arena.name},{'    '}
        {boxscore.arena.city}
        <br />
        Local time and date: {'    '}
        {boxscore.homeStartTime.slice(0, 2)}:
        {boxscore.homeStartTime.slice(2, 4)},{'    '}
        {boxscore.homeStartDate.slice(6, 8)}.
        {boxscore.homeStartDate.slice(4, 6)}.
        {boxscore.homeStartDate.slice(0, 4)}
        <br />
        Attendance: {boxscore.attendance}
      </BoxscoreHeadingStyles>
      <TeamsParentStyles elevation={5}>
        <TeamsStyles>
        <Stack direction="row" spacing={2} style={{marginLeft:"2rem"}}>
          <div>
          <Image
            src={`/${boxscore.vTeam.triCode}.png`}
            alt="Image"
            width={100}
            height={100}
          />
          </div>
          <div style={{margin:"1rem 0.5rem 0"}}>
          <h3 style={{fontSize:"1.3rem",}}>{boxscore.vTeam.score}</h3>
      </div>
      </Stack>
          <br />
            <span  style={{fontSize:"1.1rem"}}>
            {boxscore.vTeam.triCode}
      </span>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
            ({boxscore.vTeam.win}
            -
            {boxscore.vTeam.loss})
          </Typography>
        </TeamsStyles>
        
        <div style={{display:"grid",justifyContent: "center",marginTop:"1rem"}}>
        <p style={{fontSize:"1.4rem",}}>vs</p>
        <p style={{fontSize:"0.8rem",color:"grey"}}>FINAL</p>
        </div>
        <TeamsStyles>
        <Stack direction="row" spacing={2} style={{marginRight:"2rem"}}>
        <div style={{margin:"1rem 0.5rem 0"}}>
        <h3 style={{fontSize:"1.3rem",}}>{boxscore.hTeam.score}</h3>
      </div>
       
      <div>
          <Image
            src={`/${boxscore.hTeam.triCode}.png`}
            alt="Image"
            width={100}
            height={100}
          />
          </div>
          </Stack>
          <br />
          <span style={{fontSize:"1.1rem"}}>
          {boxscore.hTeam.triCode}
          </span>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
           ({boxscore.hTeam.win}
            -
            {boxscore.hTeam.loss}
           )
          </Typography>
        </TeamsStyles>
      </TeamsParentStyles>
      <Paper style={{margin:"1rem",borderRadius: "5rem"}}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Box Score</TableCell>
            <TableCell align="right">1st</TableCell>
            <TableCell align="right">2nd</TableCell>
            <TableCell align="right">3rd</TableCell>
            <TableCell align="right">4th</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[boxscore].map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.hTeam.triCode}
              </TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">  {boxscore.hTeam.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {[boxscore].map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.vTeam.triCode}
              </TableCell>
              <TableCell align="right">  - </TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">  {boxscore.vTeam.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Paper>

      <Paper style={{margin:"1rem",borderRadius: "5rem"}}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team Stats</TableCell>
            <TableCell align="right">fastBreakPoints</TableCell>
            <TableCell align="right">pointsInPaint</TableCell>
            <TableCell align="right">secondChancePoints</TableCell>
            <TableCell align="right">pointsOffTurnovers</TableCell>
            <TableCell align="right">biggestLead</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {[boxscore].map((row) => (
            <TableRow
              key={row.hTeam}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.hTeam.triCode}
              </TableCell>
              <TableCell align="right">  {stats.hTeam.fastBreakPoints} </TableCell>
              <TableCell align="right"> {stats.hTeam.pointsInPaint}</TableCell>
              <TableCell align="right"> {stats.hTeam.secondChancePoints}</TableCell>
              <TableCell align="right"> {stats.hTeam.pointsOffTurnovers}</TableCell>
              <TableCell align="right">  {stats.hTeam.biggestLead}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {[boxscore].map((row) => (
            <TableRow
              key={row.vTeam}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.vTeam.triCode}
              </TableCell>
              <TableCell align="right">  {stats.vTeam.fastBreakPoints} </TableCell>
              <TableCell align="right"> {stats.vTeam.pointsInPaint}</TableCell>
              <TableCell align="right"> {stats.vTeam.secondChancePoints}</TableCell>
              <TableCell align="right"> {stats.vTeam.pointsOffTurnovers}</TableCell>
              <TableCell align="right">  {stats.vTeam.biggestLead}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Paper>
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

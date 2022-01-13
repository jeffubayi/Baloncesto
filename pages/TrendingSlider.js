// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';

// export default function TitlebarImageList() { const [value, setValue] = React.useState("1");
//   const [standings, setStandings] = React.useState([]);
//   const axios = require("axios");
//   const today = new Date()
//     .toISOString()
//     .slice(0, 10);

//   const newDateWithoutDashes = today.replace(/-/g, '');

//   async function getStandings() {

//     axios
//       .get(`https://data.nba.net/10s/prod/v2/${newDateWithoutDashes}/scoreboard.json`)
//       .then((response) => {
//         const standArray = response.data.games;
//         console.log(`standScores==`, standArray);
//         setStandings(standArray);
//       });
//   }

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   React.useEffect(() => getStandings(), []);

//   return (
//     <ImageList sx={{ width: "auto", height: 500 ,gridTemplateColumns: "repeat(1, 1fr)",borderRadius:"0.5rem"}}>
//       {standings?.slice(0, 1).map((item) => (
//         <ImageListItem key={item.gameId}>
//           <img
//             src={`/${item.vTeam.triCode}.png`}
//             srcSet={`/${item.vTeam.triCode}.png`}
//             alt={item.vTeam.triCode}
//             loading="lazy"
//           />
//           <ImageListItemBar
//           sx={{ width: "auto", height: "auto" ,gridTemplateColumns: "repeat(1, 1fr)",borderRadius:"0.5rem",whiteSpace:"wrap"}}
//             title={item.vTeam.triCode}
//           />
//         </ImageListItem>
//       ))}
//       {standings?.slice(0, 1).map((item) => (
//         <ImageListItem key={item.gameId}>
//           <img
//             src={`/${item.hTeam.triCode}.png`}
//             srcSet={`/${item.hTeam.triCode}.png`}
//             alt={item.vTeam.triCode}
//             loading="lazy"
//           />
//           <ImageListItemBar
//           sx={{ width: "auto", height: "auto" ,gridTemplateColumns: "repeat(1, 1fr)",borderRadius:"0.5rem",whiteSpace:"wrap"}}
//             title={item.hTeam.triCode}
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   );
// }

// const itemData = [
//   {
//     img: 'https://www.nbcsports.com/sites/rsnunited/files/article/hero/DeMar%20DeRozan%20Happy%20USAT.jpg',
//     title: 'Demar derozen with a consecutive buzzer beater',
//     rows: 1,
//     cols: 1,
//     featured: true,
//   },
//   {
//     img: 'https://images.daznservices.com/di/library/sporting_news/ef/7e/stephen-curry-ftr_dszr3571jsi41japmvd1mx6gm.jpeg?t=856218702&quality=100&w=1280&h=720',
//     title: 'Steph curry breaks the record to become best in 3 pointers',
//     rows: 1,
//     cols: 1,
//     featured: true,
//   },

// ];

import React from "react";
import YouTube from "react-youtube";

const opts = {
  height: "500",
  width: "900",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

export default function TrendingSlider() {
  return (
    <div>
      <YouTube videoId="bI41jWKPAmU" opts={opts} />
    </div>
  );
}

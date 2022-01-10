import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PinnedSubheaderList() {
  const [stats, setStats] = React.useState([]);
  const axios = require("axios");

  async function getStats() {
    axios
      .get("http://stats-prod.nba.com")
      .then((response) => {
        const standArray = response.data;
        console.log(`stats==`, standArray);
        setStats(standArray);
      });
  }

  React.useEffect(() => getStats(), []);

  function getHeading(sectionId) {
    switch (sectionId) {
      case 0:
        return "Points Per Game";
        break;
      case 1:
        return  "Rebounds Per Game";
        break;
      case 2:
        return  "Assists Per Game";
        break;
      case 3:
        return  "Field Goal Percentage";
        break;
      case 4:
        return  "Three Pointers made";
        break;
      case 5:
        return  "Blocks Per Game";
        break;
      case 6:
        return  "Steals Per Game";
    }

  }
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 1115,
        borderRadius: "0.5rem",
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4 ,5 ,6].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader  style={{color:"black"}} >{`${getHeading(sectionId)}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText style={{color:"grey"}}  primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}


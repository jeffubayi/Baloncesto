import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import getStandings from "../components/standings";

export default function StandingList(props) {
  getStandings();
  return (
    <div
      style={{
        margin: "1rem",
      }}
    >

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          height: 400,
          borderRadius:"0.5rem",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0, 1].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              {sectionId === 0 ? (
                <ListSubheader>Eastern Conference</ListSubheader>
              ) : (
                <ListSubheader>Western Conference</ListSubheader>
              )}
            </ul>
          </li>
        ))}
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

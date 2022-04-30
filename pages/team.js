//
import * as React from "react";
import { Box, CardMedia, Card, IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";
import InfoIcon from "@mui/icons-material/Info";
import { CircularProgress, Typography, Grid, CardContent } from "@mui/material";

export default function TitlebarImageList() {
  const [teams, setTeams] = React.useState([]);
  const axios = require("axios");
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  async function getTeams() {
    axios
      .get("https://data.nba.net/prod/v1/2021/teams.json")
      .then((response) => {
        const teamArray = response.data.league;
        console.log(`teams ==`, teamArray);
        setTeams(teamArray);
      });
  }

  React.useEffect(() => getTeams(), []);

  return (
    <>
      <Head>
        <title>NBA | Teams</title>
      </Head>
      {isSmallWindow ? (
        <ImageList row={1} sx={{ width: "auto", height: "auto" }}>
          {teams.sacramento ? (
            teams.sacramento
              .filter((sac) => !sac.urlName.startsWith("utah"))
              .map((item) => (
                <Card
                  sx={{
                    display: "flex",
                    borderRadius: "0.4rem",
                    boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
                  }}
                  key={item.teamId}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                      >
                        {item.fullName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ fontSize: "0.5rem" }}
                      >
                        {item.divName}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                       <CardMedia component="img" image={`/${item.tricode}.png`} />
                    </Box>
                  </Box>
                 
                </Card>
              ))
          ) : (
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
          )}
        </ImageList>
      ) : (
        <div style={{ margin: "1rem" }}>
          <ImageList
            style={{
              width: "100%",
              height: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
            }}
          >
            {teams.sacramento ? (
              teams.sacramento
                .filter((sac) => !sac.urlName.startsWith("utah"))
                .map((item) => (
                  <Card
                    sx={{
                      display: "flex",
                      borderRadius: "0.4rem",
                      boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
                    }}
                    key={item.teamId}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h5"
                          sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                        >
                          {item.fullName}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          sx={{ fontSize: "0.5rem" }}
                        >
                          {item.divName}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      ></Box>
                    </Box>
                    <CardMedia component="img" image={`/${item.tricode}.png`} />
                  </Card>
                ))
            ) : (
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
            )}
          </ImageList>{" "}
        </div>
      )}
    </>
  );
}

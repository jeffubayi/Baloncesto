import * as React from "react";
import { Box, CardMedia, Card, IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";
import { CircularProgress, Typography, Grid, CardContent } from "@mui/material";

export default function TitlebarImageList() {
  const [nbaPlayer, setNbaPlayer] = React.useState();
  const axios = require("axios");
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  async function GetPlayers() {
    const options = {
      method: "GET",
      url: `https://data.nba.net/data/10s/prod/v1/2021/players.json`,
      params: {},
      headers: {},
    };
    const players = await axios
      .request(options)
      .then(function (response) {
        const playerArray = response.data.league.standard;
        return playerArray;
      })
      .catch(function (error) {
        console.error(error);
      });
    setNbaPlayer(players);
  }

  React.useEffect(() => GetPlayers(), []);

  return (
    <>
      <Head>
        <title>NBA | Players</title>
      </Head>
      {isSmallWindow ? (
        <ImageList row={1} sx={{ width: "auto", height: "auto" }}>
          {nbaPlayer ? (
            nbaPlayer?.map(
              ({ personId, temporaryDisplayName, jersey, teamSitesOnly }) => (
                <Card
                  sx={{
                    display: "flex",
                    borderRadius: "0.4rem",
                    boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
                  }}
                  key={personId}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                      >
                        {temporaryDisplayName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ fontSize: "0.5rem" }}
                      >
                        {jersey},{""} {teamSitesOnly?.posFull}
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
                      <CardMedia
                        component="img"
                        image={`https://cdn.nba.com/headshots/nba/latest/1040x760/${personId}.png`}
                      />
                    </Box>
                  </Box>
                </Card>
              )
            )
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
            {nbaPlayer ? (
              nbaPlayer?.map(
                ({ personId, temporaryDisplayName, jersey, teamSitesOnly }) => (
                  <Card
                    sx={{
                      display: "flex",
                      borderRadius: "0.4rem",
                      boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
                    }}
                    key={personId}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h5"
                          sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                        >
                          {temporaryDisplayName}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          sx={{ fontSize: "0.5rem" }}
                        >
                          {jersey},{""} {teamSitesOnly?.posFull}
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
                    <CardMedia component="img" image={`https://cdn.nba.com/headshots/nba/latest/1040x760/${personId}.png`} />
                  </Card>
                )
              )
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

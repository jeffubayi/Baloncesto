import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GroupsIcon from "@mui/icons-material/Groups";
import Stack from "@mui/material/Stack";
import ScoreCard from "../pages/scorecard";
import { ThemeProvider } from "@mui/system";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const axios = require("axios");

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 40, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
}));

export default function Layout(props) {
  const router = useRouter();
  const theme = useTheme();
  const [currentScores, setCurrentScores] = React.useState();
  const [value, setValue] = React.useState("news");
  const isSmallWindow = useMediaQuery(`(max-width:768px)`);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const redirect = (newValue) => {
    if (newValue === 0) {
      router.push(`/`);
    } else if (newValue === 1) {
      router.push(`/scores`);
    } else if (newValue === 2) {
      router.push(`/standings`);
    } else if (newValue === 3) {
      router.push(`/team`);
    }
  };

  async function GetLastNightScores() {
    const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
      .toISOString()
      .slice(0, 10);

    const yesterdayWithoutDashes = yesterday.replace(/-/g, "");

    const options = {
      method: "GET",
      url: `https://data.nba.net/10s/prod/v1/${yesterdayWithoutDashes}/scoreboard.json`,
      params: {},
      headers: {},
    };
    const scoresArray = await axios
      .request(options)
      .then(function (response) {
        const scArray = response.data.games;
        return scArray;
      })
      .catch(function (error) {
        console.error(error);
      });
    setCurrentScores(scoresArray);
  }

  React.useEffect(() => {
    GetLastNightScores();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <MuiAppBar sx={{ backgroundColor: "#051c2d" }} elevation={0}>
          <StyledToolbar>
            {!isSmallWindow && (
              <div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={open}
                  onClose={handleDrawerClose}
                >
                  <List>
                    <ListItem
                      button
                      onClick={() => window.location.assign("/")}
                    >
                      <ListItemIcon>
                        <NewspaperIcon />
                      </ListItemIcon>
                      <ListItemText primary="News" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => window.location.assign("/scores")}
                    >
                      <ListItemIcon>
                        <SportsBasketballIcon />
                      </ListItemIcon>
                      <ListItemText primary="Scores" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => window.location.assign("/standings")}
                    >
                      <ListItemIcon>
                        <FormatListNumberedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Standings" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => window.location.assign("/team")}
                    >
                      <ListItemIcon>
                        <GroupsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Teams" />
                    </ListItem>
                  </List>
                </Drawer>
              </div>
            )}
            <Box>
              <a>
                <svg
                  height="40"
                  viewBox="0 0 51 30"
                  width="102"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="m20.09 29.196h-3.35v-28.466h5.184l3.468 23.482c-.518-5.581-1.196-14.592-1.196-19.336v-4.146h3.349v28.466h-4.745l-3.19-22.806c.28 5.103.479 11.203.479 14.632v8.173m9.37.001v-28.466h4.744c3.15 0 5.103 1.714 5.103 5.701v4.186c0 2.592-.798 3.907-1.914 4.585 1.116.718 1.914 1.993 1.914 4.186v4.146c0 3.907-2.073 5.662-5.103 5.662zm3.827-24.878v9.409h.478c1.356 0 1.715-.518 1.715-2.073v-5.422c0-1.316-.399-1.914-1.555-1.914zm0 12.519v8.77h.638c1.196 0 1.555-.677 1.555-2.033v-4.824c0-1.395-.44-1.913-1.715-1.913zm13.192 7.016h-2.392l-.32 5.343h-3.866l2.79-28.466h5.422l2.712 28.466h-4.027l-.32-5.343zm-2.233-3.229h2.034l-.32-5.223c-.119-2.073-.438-8.651-.677-12.2h-.16l-.558 12.2zm-34.14-20.624h-7.007a3.1 3.1 0 0 0 -3.098 3.098v23.728a3.103 3.103 0 0 0 3.098 3.102h7.002a3.109 3.109 0 0 0 3.105-3.102v-23.728a3.103 3.103 0 0 0 -3.1-3.098"
                      fill="#fffffe"
                    ></path>
                    <path
                      d="m8.367 5.486.007.102c.214.124.322.226.538.364.571.36 1.275 1 1.186 3.203.16.48.231 1.424.38 1.727.297.59.496.974.583 1.531 0 0 .085.867.197.93.591.134.42.192.507.293.092.119.433.113.433.431.118.158.206.323.272.494v-11.463a2.37 2.37 0 0 0 -2.365-2.368h-2.264c.364.13.57.282.689.524.292.025.64.68.098 1.649.24.16.053.398-.119.675-.05.089-.105.247-.266.236-.205.433-.454.852-.641.878-.057.07-.098.256-.013.344.276.123.612.293.778.45m4.103 10.628a2.11 2.11 0 0 1 -1.965 1.33 2.11 2.11 0 0 1 -2.111-2.11c0-.995.684-1.83 1.613-2.053-.243-.61-.757-1.597-.91-1.92-.144-.322-.492-2.33-.567-2.727-.017-.087-.911.519-.913.556-.052.05-.67 1.666-.696 1.753-.013.055-.014.27-.014.27s.304.038.479.569c.173.53.7 2.463.7 2.463s-.142.148-.148.14c.667 2.232.434 3.193.733 3.848.376.922.478.801.8 1.577.232.565.49 2.788.576 2.886.36.457.554.813.554 1.07 0 .26-.305 1.025-.194 1.471.068.263.103.85.225.962 0 0 .112.221.057.32-.016.033-.048.084-.033.125.198.7.84 1.896-.199 2.522h.022a2.353 2.353 0 0 0 1.991-2.34z"
                      fill="#b52532"
                    ></path>
                    <path
                      d="m9.804 26.371c-.38-.34-.126-.483-.142-.617-.25-1.037-1.074-1.664-.648-2.006-.105-.342-.319-.772-.311-.771-1.283-.737-2.376-1.934-2.561-2.11-.225-.244-.609-.49-.68-.688-.309-.283-1.821-2.428-2.173-3.218l-.614-.087c-.28-1.14-1.212-2.097-1.235-3.24-.008-.433.196-1.359.272-1.543.075-.188.432-.495.432-.495v-.306c-1.339.038-.954-.099-1.184-.62-.162-.36-.046-.44.012-.69.18-.737.777-1.875 1.023-2.392.076-.261.334-.89.334-.89.998-2.032 1.371-1.883 2.556-1.998l.058-.084c1.188-.052.993-.141 1.16-1.285-.172.074-.224-.359-.224-.359-.094-.65.18-.527.31-.54.029-1.07.138-1.408.91-1.703h-4a2.369 2.369 0 0 0 -2.369 2.371v23.727c0 1.309 1.06 2.37 2.37 2.37h7.005c-.802-.434-.328-1.259-.301-2.825"
                      fill="#253b73"
                    ></path>
                  </g>
                </svg>
              </a>
            </Box>
            <Box component="div" sx={{ overflow: "auto" }}>
              <Stack direction="row" spacing={1}>
                {currentScores?.map((scores) => (
                  <ScoreCard
                    hTeamName={scores.hTeam.triCode}
                    hTeamScores={scores.hTeam.score}
                    vTeamName={scores.vTeam.triCode}
                    vTeamScores={scores.vTeam.score}
                    gameId={scores.gameId}
                    gameTime={scores.isRecapArticleAvail}
                  />
                ))}
              </Stack>
            </Box>
          </StyledToolbar>
        </MuiAppBar>
        <Toolbar id="back-to-top-anchor" />
        <Box
          component="main"
          sx={{
            backgroundColor: "#f5f5f5",
            width: "100vw",
            py: "1rem",
            px: "0.3rem",
          }}
        >
          {props.children}
        </Box>

        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Toolbar />
        {isSmallWindow && (
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              px: "0.8rem",
              py: "0.3rem",
            }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                redirect(newValue);
              }}
            >
              <BottomNavigationAction label="News" icon={<NewspaperIcon />} />
              <BottomNavigationAction
                label="Scores"
                icon={<SportsBasketballIcon />}
              />
              <BottomNavigationAction
                label="Standings"
                icon={<FormatListNumberedIcon />}
              />
              <BottomNavigationAction label="Teams" icon={<GroupsIcon />} />
            </BottomNavigation>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  );
}

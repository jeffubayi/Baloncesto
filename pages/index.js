import { css } from "@emotion/react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import getGeneralNewsFromLastTwoDays from "../components/news";
import getSpecialNewsFromLastTwoDays from "../components/personalizednews";
import getLastNightScores from "../components/yesterdayscores";
import { setDateCookieClientSide } from "../util/cookies";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { useState } from "react";
import TrendingSlider from "./TrendingSlider";
import Paper from "@mui/material/Paper";
import StandingList from "./StandingList";
import TrendingNews from "./TrendingNews";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: "transform 2s",
}));

const StyledBox = styled(Box)`
  width: auto;
  margin: 0 2rem 1rem;

  @media (min-width: 600px) {
    width: "auto";
    margin: 0 2rem 1rem;
  }

  @media (min-width: 1300px) {
    margin: 0 8rem 1rem;
  }
`;

const StyledDiv = styled.div`
  padding: 0.4rem;
  cursor: pointer;
  display: grid;
  gridtemplatecolumns: repeat(1, auto);
  gap: 1rem;

  @media (min-width: 600px) {
    display: grid;
    gridtemplatecolumns: repeat(3, auto);
    gap: 1rem;
  }
`;

const ourGray = "#1d2d35";
const lightGray = "#E9E4E4";

export default function Home(props) {
  const newsArray = props.newsArray;
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const yesterdayWithoutDashes = yesterday.replace(/-/g, "");

  setDateCookieClientSide(yesterdayWithoutDashes);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 4,
    },
  };

  const findGameWinner = () => {
    if (
      props.scoresArray.scores.vTeam.triCode >
      props.scoresArray.scores.hTeam.triCode
    ) {
      return true;
    } else false;
  };

  return (
    <>
    <div style={{width:"100vw",  backgroundColor: "#051c2d",padding:"0.4rem"}}>
      <Carousel responsive={responsive} ssr={true} infinite={false}>
      <Card sx={{ minWidth: 275,textAlign: "center",margin:" 0 0.5rem 0", borderRadius: "0.6rem",}}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {new Date(yesterday).toLocaleString('en-us', {  weekday: 'long' })} Night
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent:"center"}}>
        <Button  style={{textTransform:"capitalize"}} variant="outlined" onClick={() => window.location.assign("/scores")} size="small">view scores</Button>
      </CardActions>
    </Card>

        {props.scoresArray.map((scores) => (
          // Here we use div instead of li tag
          // because Carousel adds another li tag
          // by itself. If we set this tag to li,
          // it would cause the conflict.
   
          <Link href={`/${scores.gameId}`}>
            
            <Card
              style={{
                borderRadius: "0.6rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "repeat(2,auto)",
                cursor: "pointer",
                padding: "0.2rem",
                height: 120,
                width:260
              }}
              key={scores.gameId}
            >
              <div
                style={{
                  display: "grid",
                  gap: "0.4rem",
                  gridTemplateRows: "repeat(2,auto)",
                  marginRight: "0.5rem",
                }}
              >
                <Avatar
                  src={`/${scores.hTeam.triCode}.png`}
                  alt="Image"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    marginTop: "0.5rem",
                  }}
                />
                <Avatar
                  src={`/${scores.vTeam.triCode}.png`}
                  alt="Image"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    marginBottom: "0.7rem",
                  }}
                />
              </div>
              <CardContent>
                <div
                  style={{
                    display: "grid",
                    gap: "0.4rem",
                    gridTemplateColumns: "repeat(2,2fr 2fr 2fr)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: "0.6rem",
                    }}
                  >
                    <Typography gutterBottom variant="subtitle2" component="p">
                      {scores.hTeam.triCode}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="p">
                      {scores.vTeam.triCode}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "0.6rem",
                      paddingRight: "0.5rem",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {scores.hTeam.score}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {scores.vTeam.score}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {scores.isRecapArticleAvail ? (
                      <div style={{ margin: "1rem", textAlign: "center" }}>
                        <Badge badgeContent={"FINAL"} style={{color:"grey"}}/>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
      </div>
      <StyledBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <TrendingSlider />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <StandingList />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <TrendingNews />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <h6 style={{ color: "grey", marginLeft: "0.7rem" }}>
              Trending News
            </h6>
            <div
              style={{
                padding: "0.4rem",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "repeat(3,auto)",
                gap: "1rem",
              }}
            >
              <Grid container spacing={3}>
                {newsArray.slice(3, 9).map((news) => (
                  // It is better to use as key one of the
                  // object properties that has unique
                  // character. Hence we used _id prop,
                  // which was pre-defined by API provider.
                  <Link href={news.link}>
                    <Grid item xs={6} md={6} lg={4}>
                      <Card sx={{ maxWidth: 345, borderRadius: "0.5rem" }}>
                        <CardMedia
                          component="img"
                          height="194"
                          image={news.media}
                          alt="Paella dish"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {news.title.substring(0, 80)}
                          </Typography>
                        </CardContent>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>
                              {news.summary.substring(0, 230)}...
                            </Typography>
                          </CardContent>
                        </Collapse>
                      </Card>
                    </Grid>
                  </Link>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </StyledBox>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getSessionByToken, getUsersFavTeams, getUserByToken } = await import(
    "../util/database"
  );

  const scoresArray = await getLastNightScores();

  const session = await getSessionByToken(context.req.cookies.session);

  const user = await getUserByToken(session);

  if (!session || session.userId !== user.userId || user === "undefined") {
    const newsArray = await getGeneralNewsFromLastTwoDays();

    return {
      props: {
        newsArray: newsArray || [],
        scoresArray: scoresArray || [],
      },
    };
  } else {
    const favoriteTeamsArray = await getUsersFavTeams(user.userId);

    const favTeams = favoriteTeamsArray.map((team) => team.teamName);
    const favTeamsInOneString = favTeams.join();
    const queryString = favTeamsInOneString.replace(",", " ");

    const userId = user.userId;

    const newsArray = await getSpecialNewsFromLastTwoDays(queryString);

    return {
      props: {
        newsArray: newsArray || [],
        scoresArray: scoresArray || [],
        userId: userId,
      },
    };
  }
}

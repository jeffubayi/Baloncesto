import { NextApiResponse } from "next";
const axios = require("axios");

export default async function handler(res: NextApiResponse) {
  const options = {
    method: "GET",
    url: `https://data.nba.net/data/10s/prod/v1/2021/players.json`,
    params: {},
    headers: {},
  };
  const players = await axios
    .request(options)
    .then(function (response: any) {
      const playerArray = response.data.league.standard;
      return playerArray;
    })
    .catch(function (error: any) {
      console.error(error);
    });
  res.send({
    players: players,
  });
}

import { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gameDate = req.body.gameDate;
  const gameId = req.body.gameDate;
  const scoresArray = await axios
    .request(`https://data.nba.net/prod/v1/${gameDate}/${gameId}_boxscore.json`)
    .then(function (response: any) {
      const scArray = response.data.basicGameData;
      res.status(200).send({ scArray });
      return scArray;
    })
    .catch(function (error: any) {
      res.status(500).send({ message: `${error}` });
    });

  res.send({
    BoxScores: scoresArray,
  });
}

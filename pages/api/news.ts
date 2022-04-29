import { NextApiResponse } from "next";
const axios = require("axios");

export default async function handler(
  res: NextApiResponse
) {
  const options = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: {
      q: "nba news",
      lang: "en",
      sources:
        "nba.com, espn.com, bleacherreport.com, foxsports.com, hoopshype.com, realgm.com, sports.yahoo.com, nbadraft.net, prosportsdaily.com",
      page_size: 70,
    },
    headers: {
      "x-rapidapi-key": "1059d1e8fcmshfbea3f707e923ffp11cf21jsnf22363d410bc",
      "x-rapidapi-host": "free-news.p.rapidapi.com",
    },
  };
  const newsDataArray = await axios
    .request(options)
    .then(function (response: any) {
      const newsArray = response.data.articles;
      return newsArray;
      console.log(newsArray);
    })
    .catch(function (error: any) {
      res.status(500).send({ message: `${error}` });
    });

  res.send({
    news: newsDataArray,
  });
}

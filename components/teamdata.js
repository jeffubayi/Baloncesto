export default async function getTeamInfoFromApi(teamTricode) {
  const axios = require('axios').default;

  const options = {
    method: 'GET',
    url: 'https://data.nba.net/10s/prod/2020/teams_config.json',
    params: {},
    headers: {},
  };
  const team = await axios
    .request(options)
    .then(function (response) {

      const allTeams = response.data.teams.config;

      const teamObject = allTeams.find((obj) => {
        return obj.tricode === teamTricode;
      });


      return teamObject;
    })
    .catch(function (error) {
      console.error(error);
    });
  return team;
}

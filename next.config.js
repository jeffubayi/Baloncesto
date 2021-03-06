const withPWA = require("next-pwa");

module.exports = {
  images: {
    domains: [
      'www.nba.com',
      'img.bleacherreport.net',
      'a.espncdn.com',
      'a1.espncdn.com',
      'a2.espncdn.com',
      'a3.espncdn.com',
      'a4.espncdn.com',
      'b.fssta.com',
      's.espncdn.com',
      'nba.com',
      'a57.foxsports.com',
      'media.bleacherreport.com',
      'cdn.nba.com',
      's.yimg.com',
      'images.daznservices.com',
      'ak-static.cms.nba.com',
      'abc7ny.com',
      'cdn.dribbble.com',
      'c.tenor.com',
    ],
  },
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

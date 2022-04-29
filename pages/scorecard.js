import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

export default function ScoreBoard({
  hTeamName,
  hTeamScores,
  vTeamName,
  vTeamScores,
  gameId,
  gameTime,
}) {
  return (
    <Link href={`/${gameId}`}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "0.2rem",
          boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
          border:"1px solid #fff",
          p:1
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            src={`/${hTeamName}.png`}
            alt="Image"
            style={{ width: "0.7rem", height: "0.7rem" }}
          />
          <Box
            sx={{
              color: "#fff",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 13,
            }}
          >
            {hTeamName}
          </Box>
          <Box
            sx={{
              color:
                hTeamScores >= vTeamScores ? "#90EE90" : "#fff",
              display: "block",
              fontWeight: "bold",
              
              mx: 0.5,
              fontSize: 13,
            }}
          >
            {hTeamScores}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Avatar
            src={`/${vTeamName}.png`}
            alt="Image"
            style={{ width: "0.7rem", height: "0.7rem" }}
          />
          <Box
            sx={{
              color: "#fff",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 13,
            }}
          >
            {vTeamName}
          </Box>

          <Box
            sx={{
              color:
                vTeamScores >= hTeamScores ? "#90EE90" : "#fff",

              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 13,
            }}
          >
            {vTeamScores}
          </Box>
        </Stack>
        <Box
          sx={{
            color: "#fff",
            display: "block",
            fontSize: 11,
          }}
        >
          {gameTime ? "Final" : "Live"}
        </Box>
      </Box>
    </Link>
  );
}

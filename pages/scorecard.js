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
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 1,
          minWidth: 170,
          cursor: "pointer",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            src={`/${hTeamName}.png`}
            alt="Image"
            style={{ width: "1rem", height: "1rem" }}
          />
          <Box
            sx={{
              color: "text.primary",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 17,
            }}
          >
            {hTeamName}
          </Box>
          <Box
            sx={{
              color:
                hTeamScores >= vTeamScores ? "success.dark" : "text.secondary",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 17,
            }}
          >
            {hTeamScores}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Avatar
            src={`/${vTeamName}.png`}
            alt="Image"
            style={{ width: "1rem", height: "1rem" }}
          />
          <Box
            sx={{
              color: "text.primary",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 17,
            }}
          >
            {vTeamName}
          </Box>

          <Box
            sx={{
              color:
                vTeamScores >= hTeamScores ? "success.dark" : "text.secondary",

              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 17,
            }}
          >
            {vTeamScores}
          </Box>
        </Stack>
        <Box
          sx={{
            color: "text.secondary",
            display: "block",
            fontSize: 12,
          }}
        >
          {gameTime ? "Final" : "Live"}
        </Box>
      </Box>
    </Link>
  );
}

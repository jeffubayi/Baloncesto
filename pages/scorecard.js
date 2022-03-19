
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

export default function ScoreBoard({hTeamName,hTeamScores,vTeamName,vTeamScores}) {
  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 170,
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
              color: "text.secondary",
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
              color: "success.dark",
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
           Final
        </Box>
      </Box>
    </div>
  );
}

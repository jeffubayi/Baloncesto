import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

export default function TodayBoard() {
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);
  return (
    <Link href={`/scores`}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "0.2rem",
          boxShadow: "rgb(157 168 189 / 10%) 0px 4px 8px",
          border: "1px solid #fff",
          p: 1,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              color: "#fff",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 13,
            }}
          >
            Game Scores
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              color: "#fff",
              display: "block",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 13,
            }}
          >
            {yesterday}
          </Box>
        </Stack>
        <Box
          sx={{
            color: "#fff",
            display: "block",
            fontSize: 10,
          }}
        >
          See All Games
        </Box>
      </Box>
    </Link>
  );
}

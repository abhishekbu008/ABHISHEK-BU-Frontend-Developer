import { Card as MuiCard, CardContent, Typography } from "@mui/material";

function Card({ contents }) {
  return (
    <MuiCard>
      <CardContent>
        {contents.map((content) => (
          <Typography key={content.key}>
            {content.key}: {JSON.stringify(content.value)}
          </Typography>
        ))}
      </CardContent>
    </MuiCard>
  );
}

export default Card;

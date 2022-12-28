import { Card as MuiCard, CardContent } from "@mui/material";

function Card({ children }) {
  return (
    <MuiCard>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}

export default Card;

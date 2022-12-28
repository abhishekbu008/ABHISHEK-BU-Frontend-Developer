import { Typography } from "@mui/material";

function CapsuleContent({ children }) {
  return (
    <div>
      {Object.keys(children).map((c) => (
        <div
          key={c}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{c}</Typography>:{"   "}
          <Typography variant="h6">{JSON.stringify(children[c])}</Typography>
        </div>
      ))}
    </div>
  );
}

export default CapsuleContent;

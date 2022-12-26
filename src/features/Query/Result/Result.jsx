import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Card, CustomDialog } from "../../../components";

function Result({ results = [], ...restProps }) {
  const contents = [];
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (results instanceof Array) {
    results.forEach((result) => {
      const content = [];
      for (let k in result) {
        const keyVal = {};
        keyVal.key = k;
        keyVal.value = result[k];
        content.push(keyVal);
      }
      contents.push(content);
    });
  }

  const handleClick = (content) => {
    const id = content.find((c) => c.key === "id");
    const result = results.find((r) => r.id === id.value);
    setSelected(result);
    setDialogOpen(true);
  };

  const handleModalClose = () => {
    setDialogOpen(false);
  };

  const actions = [{ text: "Close", onClick: handleModalClose }];

  return (
    <div {...restProps}>
      <Typography marginY={8} fontSize={40} textAlign="center">
        Results
      </Typography>
      {contents.map((content, i) => (
        <Paper
          key={JSON.stringify(content)}
          onClick={() => handleClick(content)}
        >
          <Card contents={content} />
        </Paper>
      ))}
      {selected && (
        <CustomDialog
          open={dialogOpen}
          handleClose={handleModalClose}
          title={selected.capsule_serial}
          actions={actions}
          content={selected}
        />
      )}
    </div>
  );
}

export default Result;

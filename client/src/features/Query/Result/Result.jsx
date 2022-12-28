import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CustomDialog } from "../../../components";
import CapsuleContent from "../CapsuleContent/CapsuleContent";
import { resultSelected, resultClosed } from "../querySlice";

function Result({ results = [], ...restProps }) {
  const dispatch = useDispatch();
  const selectedResult = useSelector((state) => state.query.selectedResult);
  const resultModalOpen = useSelector((state) => state.query.resultModalOpen);

  const handleClick = (result) => {
    dispatch(resultSelected(result));
  };

  const handleModalClose = () => {
    dispatch(resultClosed());
  };

  const actions = [{ text: "Close", onClick: handleModalClose }];

  return (
    <div {...restProps}>
      <Typography marginY={8} fontSize={40} textAlign="center">
        Results
      </Typography>
      {results.map((result, i) => (
        <Paper
          key={i}
          onClick={() => handleClick(result)}
          sx={{ cursor: "pointer" }}
        >
          <Card>
            <CapsuleContent>{result}</CapsuleContent>
          </Card>
        </Paper>
      ))}

      {selectedResult && (
        <CustomDialog
          open={resultModalOpen}
          handleClose={handleModalClose}
          title={selectedResult.capsule_serial}
          actions={actions}
          content={<CapsuleContent>{selectedResult}</CapsuleContent>}
        />
      )}
    </div>
  );
}

export default Result;

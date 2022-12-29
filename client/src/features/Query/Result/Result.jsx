import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../components";
import ModalDialog from "../../../components/ModalDialog/ModalDialog";
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
        <Card
          key={i}
          onClick={() => handleClick(result)}
          className="mb-4 cursor-pointer"
        >
          <CapsuleContent>{result}</CapsuleContent>
        </Card>
      ))}

      {selectedResult && (
        <ModalDialog
          open={resultModalOpen}
          title={selectedResult.capsule_serial}
          content={<CapsuleContent>{selectedResult}</CapsuleContent>}
          onClose={handleModalClose}
          id="capsule"
          actions={actions}
        />
      )}
    </div>
  );
}

export default Result;

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


  return (
    <div {...restProps}>
      <div
        className="md:grid md:gap-8 w-full"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))" }}
      >
        {results.map((result, i) => (
          <Card
            key={i}
            onClick={() => handleClick(result)}
            className="mb-4 cursor-pointer"
          >
            <CapsuleContent>{result}</CapsuleContent>
          </Card>
        ))}
      </div>

      {selectedResult && (
        <ModalDialog
          open={resultModalOpen}
          title={selectedResult.capsule_serial}
          content={<CapsuleContent>{selectedResult}</CapsuleContent>}
          onClose={handleModalClose}
          id="capsule"
        />
      )}
    </div>
  );
}

export default Result;

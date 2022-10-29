import { useState, Fragment } from "react";
import Accordion from "./Accordion";
import SourceForm from "./SourceForm";
import Modal from "../UI/Modal";
import AddIcon from "@mui/icons-material/Add";

const SingleSubtitle = (props) => {
  const [sourceModalShown, setSourceModalShown] = useState(false);
  const showSourceModal = () => {
    setSourceModalShown(true);
  };
  const hideSourceModal = () => {
    setSourceModalShown(false);
  };
  const addSourceHandler = (sourceData) => {
    props.onAdd(sourceData);
    setSourceModalShown(false);
  };

  const addSourceIcon = (
    <div className="flex justify-end">
      <button className="rounded-full h-12 fle" onClick={showSourceModal}>
        <AddIcon />
      </button>
    </div>
  );
  const displayedSources = props.sources.map((source) => {
    return (
      <div>
        <div>{source.title} </div>
        <div>{source.type}</div>
      </div>
    );
  });
  return (
    <Fragment>
      {sourceModalShown && (
        <Modal onClick={hideSourceModal}>
          <SourceForm
            onCancel={hideSourceModal}
            onConfirm={addSourceHandler}
          ></SourceForm>
        </Modal>
      )}
      <Accordion title={props.title}>
        {addSourceIcon} {displayedSources}
      </Accordion>
    </Fragment>
  );
};
export default SingleSubtitle;

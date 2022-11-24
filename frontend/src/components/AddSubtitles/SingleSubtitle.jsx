import { useState, Fragment } from "react";
import SourceForm from "./SourceForm";
import Modal from "../UI/Modal";
import AddIcon from "@mui/icons-material/Add";
import Subtitle from "../CourseSubtitles/Subtitle";

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
      <button className="rounded-full h-12 flex" onClick={showSourceModal}>
        <AddIcon />
      </button>
    </div>
  );
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
      <Subtitle
        onSourceEdit={props.onSourceEdit}
        onSubtitleEdit={props.onSubtitleEdit}
        onSubtitleRemove={props.onSubtitleRemove}
        subtitleHeader={props.title}
        sources={props.sources}
        icon={addSourceIcon}
        introVideoUrl={props.introVideoUrl}
        shortDescription={props.shortDescription}
      ></Subtitle>
    </Fragment>
  );
};
export default SingleSubtitle;

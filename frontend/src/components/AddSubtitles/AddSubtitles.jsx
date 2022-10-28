import { Fragment, useState } from "react";
import Accordion from "./Accordion";
import SecondaryButton from "../SecondaryButton";
import Modal from "../UI/Modal";
import SubtitleForm from "./SubtitleForm";
const AddSubtitles = (props) => {
  const [subtitles, setSubtitles] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const showModal = () => {
    setModalShown(true);
  };
  const hideModal = () => {
    setModalShown(false);
  };
  const addSubtitleHandler = (subtitleData) => {
    //logic for the URL and the short Description not handled yet
    const newAccordion = (
      <div className="mb-2">
        <Accordion title={subtitleData.title}></Accordion>
      </div>
    );
    setSubtitles((prevSubtitles) => {
      return [...prevSubtitles, newAccordion];
    });
    setModalShown(false);
  };
  return (
    <Fragment>
      {modalShown && (
        <Modal onClick={hideModal}>
          <SubtitleForm
            onCancel={hideModal}
            onConfirm={addSubtitleHandler}
          ></SubtitleForm>
        </Modal>
      )}
      <div className="flex space-x-2 ">
        <div className="flex-col min-w-[80%]">{subtitles}</div>
        <div>
          <SecondaryButton
            onClick={showModal}
            text="Add Subtitle"
          ></SecondaryButton>
        </div>
      </div>
    </Fragment>
  );
};
export default AddSubtitles;

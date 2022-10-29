import { Fragment, useState } from "react";

import SecondaryButton from "../SecondaryButton";
import Modal from "../UI/Modal";
import SubtitleForm from "./SubtitleForm";
import SingleSubtitle from "./SingleSubtitle";
const AddSubtitles = (props) => {
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleModalShown, setSubtitleModalShown] = useState(false);

  const onAddSourceHandler = (subtitleId, data) => {
    var newSubtitles = [];
    for (var i = 0; i < subtitles.length; i++) {
      if (subtitles[i].id === subtitleId) {
        subtitles[i].sources.push(data)
        newSubtitles.push(subtitles[i])
        continue;
      }
      newSubtitles.push(subtitles[i]);
    }
    setSubtitles(newSubtitles);
  };
  const displayedSubtitles = subtitles.map((subtitle) => {
    //still didnt handle the description and the video
    const subtitleTitle = subtitle.title;
    const sources = subtitle.sources; 
    return (
      <SingleSubtitle
        onAdd={onAddSourceHandler.bind(null, subtitle.id)}
        title={subtitleTitle}
        sources={sources}
      >
      </SingleSubtitle>
    );
  });
  const showSubtitleModal = () => {
    setSubtitleModalShown(true);
  };
  const hideSubtitleModal = () => {
    setSubtitleModalShown(false);
  };

  const addSubtitleHandler = (subtitleData) => {
    //logic for the URL and the short Description not handled yet

    const newSubtitle = {
      id: subtitles.length,
      title: subtitleData.title,
      videoURL: subtitleData.videoURL,
      description: subtitleData.description,
      sources: []
    };

    setSubtitles((prevSubtitles) => {
      return [...prevSubtitles, newSubtitle];
    });
    setSubtitleModalShown(false);
  };

  return (
    <Fragment>
      {subtitleModalShown && (
        <Modal onClick={hideSubtitleModal}>
          <SubtitleForm
            onCancel={hideSubtitleModal}
            onConfirm={addSubtitleHandler}
          ></SubtitleForm>
        </Modal>
      )}

      <div className="flex space-x-2 ">
        <div className="flex-col min-w-[80%]">{displayedSubtitles}</div>
        <div>
          <SecondaryButton
            onClick={showSubtitleModal}
            text="Add Subtitle"
          ></SecondaryButton>
        </div>
      </div>
    </Fragment>
  );
};
export default AddSubtitles;

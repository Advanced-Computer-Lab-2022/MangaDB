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
        subtitles[i].sources.push(data);
        newSubtitles.push(subtitles[i]);
        continue;
      }
      newSubtitles.push(subtitles[i]);
    }
    setSubtitles(newSubtitles);
  };
  const displayedSubtitles = subtitles.map((subtitle) => {
    //still didnt handle the description and the video
    const subtitleTitle = subtitle.subtitle;
    const sources = subtitle.sources;
    return (
      <SingleSubtitle
        onAdd={onAddSourceHandler.bind(null, subtitle.id)}
        title={subtitleTitle}
        sources={sources}
      ></SingleSubtitle>
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
      subtitle: subtitleData.title,
      introductionVideo: subtitleData.videoURL,
      description: subtitleData.description,
      sources: [],
    };

    setSubtitles((prevSubtitles) => {
      return [...prevSubtitles, newSubtitle];
    });
    setSubtitleModalShown(false);
  };
  const submitHandler = () => {
    props.onConfirm(subtitles);
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

      <section aria-labelledby="notes-title">
        <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
          <div className="divide-y divide-gray-300">
            <div className="bg-gray-100 px-4 py-5 sm:px-6 flex items-center ">
              <h2
                id="notes-title"
                className="text-lg font-bold text-gray-900 flex-1"
              >
                Course Content
              </h2>
              <div>
                <SecondaryButton
                  onClick={showSubtitleModal}
                  text="Add Subtitle"
                ></SecondaryButton>
              </div>
            </div>
            <div className="ml-4 px-4 py-6 sm:px-6">
              <div className="flex space-x-2 justify-center">
                <div className="flex-col min-w-[80%]">{displayedSubtitles}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-end mt-4 mr-9">
        <SecondaryButton
          onClick={submitHandler}
          text="Submit"
        ></SecondaryButton>
      </div>
    </Fragment>
  );
};
export default AddSubtitles;

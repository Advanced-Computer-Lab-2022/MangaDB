import { Fragment, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import SubtitleForm from "./SubtitleForm";
import SingleSubtitle from "./SingleSubtitle";
import Modal from "../UI/Modal";
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
  const onSourceDataEdithandler = (subtitleId, sourceId, newData) => {
    var newSubtitles = [];
    for (var i = 0; i < subtitles.length; i++) {
      if (subtitles[i].id === subtitleId) {
        newSubtitles.push(subtitles[i]);
        for (var j = 0; j < newSubtitles[i].sources.length; j++) {
          if (j === +sourceId) {
            newSubtitles[i].sources[j] = newData;
          }
        }
        continue;
      }
      newSubtitles.push(subtitles[i]);
    }
    setSubtitles(newSubtitles);
  };
  const onRemoveSourceHandler = (subtitleId, sourceId) => {
    console.log(subtitleId, sourceId);
    const newSubtitles = [...subtitles];
    newSubtitles[subtitleId].sources.splice(sourceId, 1);
    setSubtitles(newSubtitles);
  };

  const onSubtitleDataEditHandler = (subtitleId, newData) => {
    var newSubtitles = [];
    for (var i = 0; i < subtitles.length; i++) {
      if (subtitles[i].id === subtitleId) {
        subtitles[i].subtitle = newData.title;
        subtitles[i].description = newData.shortDescription;
        subtitles[i].introductionVideo = newData.introVideoUrl;
        newSubtitles.push(subtitles[i]);
        continue;
      }
      newSubtitles.push(subtitles[i]);
    }
    setSubtitles(newSubtitles);
  };

  const onRemoveSubtitle = (subtitleId) => {
    var newSubtitles = [];
    for (var i = 0; i < subtitles.length; i++) {
      if (subtitles[i].id === subtitleId) {
        continue;
      }
      newSubtitles.push(subtitles[i]);
    }
    setSubtitles(newSubtitles);
  };

  const displayedSubtitles = subtitles.map((subtitle) => {
    const SubtitleIntroUrl = subtitle.introductionVideo;
    const description = subtitle.description;
    const subtitleTitle = subtitle.subtitle;
    const sources = subtitle.sources;
    return (
      <SingleSubtitle
        onRemoveSourceHandler={onRemoveSourceHandler.bind(null, subtitle.id)}
        onSourceEdit={onSourceDataEdithandler.bind(null, subtitle.id)}
        onAdd={onAddSourceHandler.bind(null, subtitle.id)}
        onSubtitleEdit={onSubtitleDataEditHandler.bind(null, subtitle.id)}
        onSubtitleRemove={onRemoveSubtitle.bind(null, subtitle.id)}
        title={subtitleTitle}
        sources={sources}
        shortDescription={description}
        introVideoUrl={SubtitleIntroUrl}
      />
    );
  });
  const showSubtitleModal = () => {
    setSubtitleModalShown(true);
  };
  const hideSubtitleModal = () => {
    setSubtitleModalShown(false);
  };

  const addSubtitleHandler = (subtitleData) => {
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
    <div className="mx-8 my-4 rounded-md p-6">
      <div className="bg-white shadow sm:overflow-hidden">
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
            <div className="flex-col min-w-[80%]">
              {displayedSubtitles}
              {subtitleModalShown && (
                <SubtitleForm
                  onCancel={hideSubtitleModal}
                  onConfirm={addSubtitleHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <SecondaryButton
          className="w-20"
          onClick={submitHandler}
          text="Next"
        />
      </div>
    </div>
  );
};
export default AddSubtitles;

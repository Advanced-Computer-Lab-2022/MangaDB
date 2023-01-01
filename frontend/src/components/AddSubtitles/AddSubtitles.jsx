import {  useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import SubtitleForm from "./SubtitleForm";
import SingleSubtitle from "./SingleSubtitle";
const AddSubtitles = (props) => {
  const [emptySubtitles, setEmptySubtitles] = useState(false);
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleModalShown, setSubtitleModalShown] = useState(false);
  const onAddSourceHandler = (subtitleId, data) => {
    var newSubtitles = [];
    for (var i = 0; i < subtitles.length; i++) {
      if (subtitles[i].id === subtitleId) {
        console.log(data)
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
    const description = subtitle.introductionVideoDescription;
    const subtitleTitle = subtitle.description;
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
    setEmptySubtitles(false);

    setSubtitleModalShown(true);
  };
  const hideSubtitleModal = () => {
    setSubtitleModalShown(false);
  };

  const addSubtitleHandler = (subtitleData) => {
    const newSubtitle = {
      id: subtitles.length,
      description: subtitleData.title,
      introductionVideo: subtitleData.videoURL,
      introductionVideoDescription: subtitleData.description,
      sources: [],
    };

    setSubtitles((prevSubtitles) => {
      return [...prevSubtitles, newSubtitle];
    });
    setSubtitleModalShown(false);
  };
  const submitHandler = () => {
    if(subtitles.length === 0){
      setEmptySubtitles(true);
      return;
    }
    else{
      setEmptySubtitles(false);
    }
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
        <div>
        
      </div>
      <div
        class={
          emptySubtitles
            ? "px-4 py-3 mt-3 text-red-900 bg-red-50 border rounded-md"
            : "hidden"
        }
      >
        <div class="flex justify-between flex-wrap">
          <div class="w-0 flex-1 flex">
            <div class="mr-3 pt-1">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-md mt-[5px] leading-6 font-medium">Please add atleast one subtitle </h4>
            </div>
          </div>
        </div>
      </div>

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
          text="Submit"
        />
      </div>
    </div>
  );
};
export default AddSubtitles;

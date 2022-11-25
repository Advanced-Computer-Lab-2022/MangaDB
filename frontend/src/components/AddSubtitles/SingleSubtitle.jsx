import { Fragment } from "react";
import Subtitle from "../CourseSubtitles/Subtitle";

const SingleSubtitle = (props) => {
  const addSourceHandler = (sourceData) => {
    props.onAdd(sourceData);
  };

  return (
    <Fragment>
      <Subtitle
        onAdd={addSourceHandler}
        onSourceEdit={props.onSourceEdit}
        onSubtitleEdit={props.onSubtitleEdit}
        onSubtitleRemove={props.onSubtitleRemove}
        subtitleHeader={props.title}
        sources={props.sources}
        introVideoUrl={props.introVideoUrl}
        shortDescription={props.shortDescription}
      ></Subtitle>
    </Fragment>
  );
};
export default SingleSubtitle;

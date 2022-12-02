import React from "react";
import SubtitleAccordion from "./SubtitleAccordion";

const CourseContent = (props) => {
  var subtitles 
  if (props.content) {
     subtitles = props.content.map((subtitle) => {
      return (
        <SubtitleAccordion
          onClick={props.onClick}
          title={subtitle.description}
          duration={subtitle.subtitleDuration}
          sources={subtitle.sources}
        />
      );
    });
  }

  const durationInHours = Math.round(+props.courseDuration / 60);

  return (
    <div className="md:w-7/12 shadow-lg mx-10 mb-2">
      <div className="bg-gray-100 px-4 py-4 text-xl font-semibold rounded-t-md flex justify-between ">
        <div>Course Content</div>
        <div className="bg-gray-200 px-4 rounded-full shadow-md font-medium mr-2">
          {durationInHours} hrs
        </div>
      </div>
      <div className="py-2 px-8">{subtitles}</div>
    </div>
  );
};

export default CourseContent;

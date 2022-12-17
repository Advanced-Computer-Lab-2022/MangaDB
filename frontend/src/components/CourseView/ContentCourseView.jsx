import React from "react";
import SubtitleAccordionCourseView from "./SubtitleAccordionCourseView";

const ContentCourseView = (props) => {
  var subtitles;
  var description;
  var sourceIndex = 0;
  var lastIndex = 0;
  if (props.content) {
    subtitles = props.content.map((subtitle, index) => {
      description = `${index + 1}. `.concat(subtitle.description);
      sourceIndex = sourceIndex + lastIndex;
      lastIndex = subtitle.sources.length;
      return (
        <SubtitleAccordionCourseView
          onClick={props.onClick}
          title={description}
          duration={subtitle.subtitleDuration}
          sources={subtitle.sources}
          sourceIndex={sourceIndex}
        />
      );
    });
  }
  const durationInHours = Math.round(+props.courseDuration / 60);
  return (
    <div className="md:h-[91.5vh] border-2 overflow-y-auto">
      <div className="bg-gray-100 px-4 py-4 text-xl font-semibold flex justify-between ">
        <div>Course Content</div>
        <div className="bg-gray-200 px-4 rounded-full shadow-md font-medium mr-2">
          {durationInHours} hrs
        </div>
      </div>
      <div className="py-2 px-8">{subtitles}</div>
    </div>
  );
};

export default ContentCourseView;
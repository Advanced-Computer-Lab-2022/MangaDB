import { useRef } from "react";
import { AccordionBody } from "@material-tailwind/react";

const SubtitleInfo = (props) => {
  const title = useRef();
  const url = useRef(); //get element by id
  const shortDescription = useRef();
  const titleChangeHandler = (event) => {
    const changedSubtitleData = {
      title: event.target.value,
      shortDescription: shortDescription.current.value,
      introVideoUrl: url.current.value,
    };
    props.onSubtitleEdit(changedSubtitleData);
  };
  const urlChangeHandler = (event) => {
    const changedSubtitleData = {
      title: title.current.value,
      shortDescription: shortDescription.current.value,
      introVideoUrl: event.target.value,
    };
    props.onSubtitleEdit(changedSubtitleData);
  };
  const shortDescriptionChangeHandler = (event) => {
    const changedSubtitleData = {
      title: title.current.value,
      shortDescription: event.target.value,
      introVideoUrl: url.current.value,
    };
    props.onSubtitleEdit(changedSubtitleData);
  };
  return (
    <AccordionBody className="opacity-0 transition ease-out duration-150">
      <div className="flex-col space-y-3 items-center">
        <div className="first control">
          <label className="block" htmlFor="section-title">
            Title
          </label>
          <input
            ref={title}
            onChange={titleChangeHandler}
            defaultValue={props.title}
            id="section-title"
            className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
          ></input>
        </div>
        <div className="second control">
          <label className="block" htmlFor="video-URL">
           Intro Video URL
          </label>
          <input
            ref={url} 
            onChange={urlChangeHandler}
            defaultValue={props.introVideoUrl}
            id="video_URL"
            className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
          ></input>
        </div>
        <div className="third-control">
          <label className="block" htmlFor="short-description">
            Short Description
          </label>
          <input
            ref={shortDescription}
            onChange={shortDescriptionChangeHandler}
            defaultValue={props.shortDescription}
            id="short-description"
            className="w-full h-28 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
          ></input>
        </div>
      </div>
    </AccordionBody>
  );
};
export default SubtitleInfo;

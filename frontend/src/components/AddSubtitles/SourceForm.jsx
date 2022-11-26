import { Fragment, useEffect, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import Video from "../Video/Video";
import PrimaryButton from "../PrimaryButton";
import RadioTypes from "./RadioTypes";

const SourceForm = (props) => {
  const titleRef = useRef();
  const [validLink, setValidLink] = useState(false);
  const [sourceLink, setSourceLink] = useState("");
  const [sourceType, setSourceType] = useState("Video");
  const [sourceDuration, setSourceDuration] = useState(0);
  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const link = sourceLink;
    var type;
    if (sourceType === "Quiz") type = "Quiz";
    else type = "Video";
    const sourceData = {
      description: title,
      sourceType: type,
      link,
      duration: sourceDuration,
    };
    props.onConfirm(sourceData);
  };
  const typeChangeHandler = (type) => {
    //send to a changehandler the new type to toggle between the 2 forms
    props.onTypeChange(type.name);
    setSourceType(type.name);
  };
  const getDuration = (duration) => {
    if (sourceDuration !== duration) {
      setSourceDuration(duration);
    }
  };
  const linkChangeHandler = (event) => {
    setSourceLink(event.target.value);
  };

  //validate the link the instructor entered
  function validateYouTubeUrl(url) {
    if (url !== undefined || url !== "") {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length === 11) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    setValidLink(validateYouTubeUrl(sourceLink));
  }, [sourceLink]);

  return (
    <Fragment>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Source-Info</div>
        <div className="flex justify-end">
          <button
            onClick={props.onCancel}
            className="hover:text-red-600 text-xl"
          >
            x
          </button>
        </div>
      </div>
      <Divider variant="middle" />
      <div>
        <form onSubmit={submitHandler}>
          <div className="first control">
            <label className="block" htmlFor="source-title">
              Source Title
            </label>
            <input
              ref={titleRef}
              id="source-title"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>
          <div className="flex gap-10">
            <RadioTypes
              type={sourceType}
              onChange={typeChangeHandler}
            ></RadioTypes>
          </div>
          <div className="third-control">
            <label className="block" htmlFor="link">
              Link
            </label>
            <input
              value={sourceLink}
              onChange={linkChangeHandler}
              id="link"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
    focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>

          <div className="controls flex justify-end space-x-2 mt-2">
            <PrimaryButton
              className=" rounded-md  "
              text="Confirm"
              type="submit"
            ></PrimaryButton>
          </div>
        </form>
        {validLink && (
          <Video
            isVisible={false}
            getSourceDuration={getDuration}
            link={sourceLink}
          ></Video>
        )}
      </div>
    </Fragment>
  );
};
export default SourceForm;

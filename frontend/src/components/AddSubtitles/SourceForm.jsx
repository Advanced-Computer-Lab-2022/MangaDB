import { useEffect, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import Video from "../Video/Video";
import PrimaryButton from "../PrimaryButton";
import RadioTypes from "./RadioTypes";
import CreateExamManager from "./CreateQuestion/CreateExamManager";

const SourceForm = (props) => {
  const titleRef = useRef();
  const [validLink, setValidLink] = useState(false);
  const [showExamForm, setShowExamForm] = useState(false);
  const [sourceLink, setSourceLink] = useState("");
  const [sourceType, setSourceType] = useState("Video");
  const [sourceDuration, setSourceDuration] = useState(0);
  const containerRef = useRef(null);

  const [examState, setExamState] = useState([]);

  const onSaveQuestionHandler = (Data) => {
    var newExamState = [...examState];
    newExamState.push(Data);
    setExamState(newExamState);
  };

  const onQuestionChangeHandler = (selectedQuestion, Data) => {
    //selectedQuestion will be corrected in the Manager component
    var newExamState = [...examState];
    newExamState[selectedQuestion] = Data;
    setExamState(newExamState);
  };
  const onQuestionRemoveHandler = (selectedQuestion) => {
    //selectedQuestion will be corrected in the Manager component
    var newExamState = [...examState];
    newExamState.splice(selectedQuestion, 1);
    setExamState(newExamState);
  };

  //this useEffect is done to fix the styling of the accordion container
  useEffect(() => {
    containerRef.current.parentElement.parentElement.classList.add(
      "subtitleInfo"
    );
    containerRef.current.parentElement.parentElement.children[0].classList.remove(
      "py-4"
    );
    containerRef.current.parentElement.parentElement.children[0].classList.add(
      "my-1"
    );
    if (!props.isOpened) {
      containerRef.current.parentElement.parentElement.children[0].classList.add(
        "h-0"
      );
    } else {
      containerRef.current.parentElement.parentElement.children[0].classList.remove(
        "h-0"
      );
    }
  }, [props.isOpened]);

  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const link = sourceLink;
    var sourceData;
    var type;
    if (sourceType === "Quiz") {
      type = "Quiz";
      sourceData = {
        description: title,
        sourceType: type,
        duration: examState.length,
        exam: examState,
      };
    } else {
      type = "Video";
      sourceData = {
        description: title,
        sourceType: type,
        link,
        duration: sourceDuration,
      };
    }

    props.onConfirm(sourceData);
  };
  const typeChangeHandler = (type) => {
    //send to a changehandler the new type to toggle between the 2 forms
    if (type.name === "Video") {
      setShowExamForm(false);
    } else {
      setShowExamForm(true);
    }
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

  //toggle the form based on the type
  var displayedForm;
  if (showExamForm) {
    displayedForm = (
      <CreateExamManager
        onQuestionChangeHandler={onQuestionChangeHandler}
        examState={examState}
        onSaveQuestionHandler={onSaveQuestionHandler}
        onQuestionRemoveHandler={onQuestionRemoveHandler}
      ></CreateExamManager>
    );
  } else {
    displayedForm = (
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
    );
  }

  return (
    <div ref={containerRef}>
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
          {displayedForm}
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
    </div>
  );
};
export default SourceForm;

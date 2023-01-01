import { useEffect, useRef, useState } from "react";
import Video from "../Video/Video";
import PrimaryButton from "../UI/PrimaryButton";
import CreateExamManager from "./CreateQuestion/CreateExamManager";
import TertiaryButton from "../UI/TertiaryButton";
const SourceForm = (props) => {
  const titleRef = useRef();
  const [validLink, setValidLink] = useState(false);
  const [showExamForm, setShowExamForm] = useState(false);
  const [sourceLink, setSourceLink] = useState("");
  const [sourceType, setSourceType] = useState("Video");
  const [sourceDuration, setSourceDuration] = useState(0);
  const containerRef = useRef(null);

  const [emptySourseTitle, setEmptySourseTitle] = useState(false);
  const [emptySourseLink, setEmptySourseLink] = useState(false);
  const [validSourceLink, setValidSourceLink] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

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
    var currentWarningMessage = "";
    if (!validateYouTubeUrl(sourceLink) && sourceType === "Video") {
      setValidSourceLink(false);
      currentWarningMessage = "Please enter a valid youtube link ";
    } else {
      setValidSourceLink(true);
    }
    if (titleRef.current.value === "") {
      setEmptySourseTitle(true);
      currentWarningMessage = "Please fill the following fields ";
    } else {
      setEmptySourseTitle(false);
    }
    if (sourceLink === "" && sourceType === "Video") {
      setEmptySourseLink(true);
      currentWarningMessage = "Please fill the following fields ";
    } else {
      setEmptySourseLink(false);
    }
    
    if (currentWarningMessage !== "") {
      setWarningMessage(currentWarningMessage);
      return;
    }
    const title = titleRef.current.value;
    const link = sourceLink;
    var sourceData;
    var type;
    if (sourceType === "Quiz") {
      type = "Quiz";
      sourceData = {
        description: title,
        sourceType: type,
        sourceDuration: examState.length,
        exam: examState,
      };
    } else {
      type = "Video";
      sourceData = {
        description: title,
        sourceType: type,
        link,
        sourceDuration: +sourceDuration,
      };
    }

    props.onConfirm(sourceData);
  };
  const typeChangeHandler = (event) => {
    //send to a changehandler the new type to toggle between the 2 forms
    if (event.target.innerHTML === "Video") {
      setShowExamForm(false);
    } else {
      setShowExamForm(true);
    }
    setSourceType(event.target.innerHTML);
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
        Link <span className="text-red-500">*</span>
        </label>
        <input
          value={sourceLink}
          onChange={linkChangeHandler}
          id="link"
          className={"w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(emptySourseTitle || !validSourceLink ? "border-red-500" : "")}

        ></input>
      </div>
    );
  }

  return (
    <div className=" px-20" ref={containerRef}>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-lg font-semibold">
          Source-Info
        </div>
        <div className="flex justify-end">
          <button
            onClick={props.onCancel}
            className="hover:text-red-600 text-xl"
          >
            x
          </button>
        </div>
      </div>

      <div>
        
      </div>
      <div
        class={
          emptySourseLink || emptySourseTitle || !validSourceLink
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
              <h4 class="text-md mt-[5px] leading-6 font-medium">{warningMessage}</h4>
            </div>
          </div>
        </div>
      </div>


      <form onSubmit={submitHandler}>
        <div className="space-y-4">
          <div className="first control">
            <label className="block" htmlFor="source-title">
            Source Title <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleRef}
              id="source-title"
              className={"w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(emptySourseTitle ? "border-red-500" : "")}
            />
          </div>
          <div className="flex gap-2">
            {/* <RadioTypes
              type={sourceType}
              onChange={typeChangeHandler}
            ></RadioTypes> */}
            <TertiaryButton
              type="button"
              state={sourceType}
              onClick={typeChangeHandler}
              text="Video"
            />
            <TertiaryButton
              type="button"
              state={sourceType}
              onClick={typeChangeHandler}
              text="Quiz"
            />
          </div>
          {displayedForm}
          <div className="controls flex justify-end space-x-2 mt-2">
            <PrimaryButton
              className=" rounded-md "
              text="Confirm"
              type="submit"
            ></PrimaryButton>
          </div>
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
  );
};
export default SourceForm;

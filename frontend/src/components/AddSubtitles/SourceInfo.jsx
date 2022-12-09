import { useRef, useState, useEffect } from "react";
import RadioTypes from "./RadioTypes";
import CreateExamManager from "./CreateQuestion/CreateExamManager";
import Video from "../Video/Video";
import TertiaryButton from "../UI/TertiaryButton";
const SourceInfo = (props) => {
  var source = props.source;
  var defaultShowFlag = source.sourceType === "Quiz" ? true : false;
  var defaultlinkValue = source.link ? source.link : "";
  var defaultExamState = source.exam ? source.exam : [];
  const titleRef = useRef();
  const [sourceType, setSourceType] = useState(source.sourceType);
  const [showExamForm, setShowExamForm] = useState(defaultShowFlag);
  const [examState, setExamState] = useState(defaultExamState);
  const [sourceDuration, setSourceDuration] = useState(source.duration);
  const containerRef = useRef(null);

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
      containerRef.current.parentElement.parentElement.children[0].classList.remove(
        "h-full"
      );
    } else {
      containerRef.current.parentElement.parentElement.children[0].classList.add(
        "h-full"
      );
      containerRef.current.parentElement.parentElement.children[0].classList.remove(
        "h-0"
      );
    }
  }, [props.isOpened]);

  // functions to handle the change of the questions and the exam state
  const onQuestionChangeHandler = (selectedQuestion, Data) => {
    //selectedQuestion will be corrected in the Manager component
    var newExamState = [...examState];
    newExamState[selectedQuestion] = Data;
    if (sourceType === "Video") {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: newExamState,
        sourceDuration: +sourceDuration,
      };

      props.onSourceEdit(newSourceData);
    } else {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: newExamState,
        sourceDuration: +newExamState.length,
      };

      props.onSourceEdit(newSourceData);
    }

    setExamState(newExamState);
  };

  const onQuestionRemoveHandler = (selectedQuestion) => {
    //selectedQuestion will be corrected in the Manager component
    var newExamState = [...examState];
    newExamState.splice(selectedQuestion, 1);
    if (sourceType === "Video") {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: newExamState,
        sourceDuration: +sourceDuration,
      };

      props.onSourceEdit(newSourceData);
    } else {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: newExamState,
        sourceDuration: +newExamState.length,
      };

      props.onSourceEdit(newSourceData);
    }

    setExamState(newExamState);
  };

  const onSaveQuestionHandler = (Data) => {
    var newExamState = [...examState];
    newExamState.push(Data);
    if (sourceType === "Video") {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: newExamState,
        sourceDuration: +sourceDuration,
      };

      props.onSourceEdit(newSourceData);
    } else {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: newExamState,
        sourceDuration: +newExamState.length,
      };

      props.onSourceEdit(newSourceData);
    }

    setExamState(newExamState);
  };

  //fields onChange functions
  const typeChangeHandler = (event) => {
    if (event.target.innerHTML === "Video") {
      setShowExamForm(false);
    } else {
      setShowExamForm(true);
    }
    if (event.target.innerHTML === "Video") {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: event.target.innerHTML,
        link: defaultlinkValue,
        exam: examState,
        sourceDuration: +sourceDuration,
      };
      props.onSourceEdit(newSourceData);
    } else {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: event.target.innerHTML,
        link: defaultlinkValue,
        exam: examState,
        sourceDuration: +examState.length,
      };
      props.onSourceEdit(newSourceData);
    }

    setSourceType(event.target.innerHTML);
  };

  const titleChangeHandler = (event) => {
    if (sourceType === "Video") {
      const newSourceData = {
        description: event.target.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: examState,
        sourceDuration: +sourceDuration,
      };
      props.onSourceEdit(newSourceData);
    } else {
      const newSourceData = {
        description: event.target.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: examState,
        sourceDuration: +examState.length,
      };
      props.onSourceEdit(newSourceData);
    }
  };

  const linkChangeHandler = (event) => {
    if (sourceType === "Video") {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: event.target.value,
        exam: examState,
        sourceDuration: +sourceDuration,
      };
      props.onSourceEdit(newSourceData);
    } else {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: event.target.value,
        exam: examState,
        sourceDuration: +examState.length,
      };
      props.onSourceEdit(newSourceData);
    }
  };

  const getDuration = (duration) => {
    if (sourceDuration !== duration) {
      const newSourceData = {
        description: titleRef.current.value,
        sourceType: sourceType,
        link: defaultlinkValue,
        exam: examState,
        sourceDuration: +duration,
      };
      props.onSourceEdit(newSourceData);
      setSourceDuration(duration);
    }
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

  var valid = validateYouTubeUrl(defaultlinkValue);

  useEffect(() => {
    if (sourceType === "Video") {
      if (!valid) {
        const newSourceData = {
          description: titleRef.current.value,
          sourceType: sourceType,
          link: defaultlinkValue,
          exam: examState,
          sourceDuration: +0,
        };
        props.onSourceEdit(newSourceData);
        setSourceDuration(0);
      } else {
        const newSourceData = {
          description: titleRef.current.value,
          sourceType: sourceType,
          link: defaultlinkValue,
          exam: examState,
          sourceDuration: +sourceDuration,
        };
        props.onSourceEdit(newSourceData);
      }
    }
  }, [sourceType, examState, valid]);
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
          value={defaultlinkValue}
          onChange={linkChangeHandler}
          id="link"
          className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
 focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
        ></input>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-4 mt-4 px-10">
      <div className="first control">
        <label className="block" htmlFor="source-title">
          Source Title
        </label>
        <input
          onChange={titleChangeHandler}
          ref={titleRef}
          defaultValue={source.description}
          id="source-title"
          className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
        ></input>
      </div>
      <div className="flex gap-2">
        {/* <RadioTypes
          type={source.sourceType}
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
      {valid && (
        <Video
          isVisible={false}
          getSourceDuration={getDuration}
          link={defaultlinkValue}
        ></Video>
      )}
    </div>
  );
};
export default SourceInfo;

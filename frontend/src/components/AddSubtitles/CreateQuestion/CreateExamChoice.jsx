import { useState, Fragment } from "react";
import Divider from "@mui/material/Divider";
const CreateExamChoice = (props) => {
  const [valid, setValid] = useState(false);
  const [visited, setVisited] = useState(false);
  const [currentlyFocused, setCurrentlyFocused] = useState(false);
  const defaultChoiceState = props.description ? props.description : "";
  const [choiceState, setChoiceState] = useState(defaultChoiceState);
  const onFocusHandler = () => {
    setVisited(true);
    setCurrentlyFocused(true);
  };
  const onBlurHandler = () => {
    if (choiceState === "") {
      setValid(false);
    }
    setValid(true);
    setCurrentlyFocused(false);
  };
  const choiceChangeHandler = (event) => {
    setChoiceState(event.target.value);
  };

  var displayedDescription;
  if (currentlyFocused) {
    displayedDescription = (
      <input
        id={props.choiceId}
        value={choiceState}
        onFocus={onFocusHandler}
        onChange={choiceChangeHandler}
        onBlur={onBlurHandler}
        className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue text-gray-500"
        defaultValue={choiceState}
      ></input>
    );
  } else {
    displayedDescription = (
      <p
       
        className="text-sm text-gray-500 truncate"
      >
        {   choiceState === "" ? "click to edit choice" : choiceState}
      </p>
    );
  }

  var errormessage;
  
  //if both valid and visited are false dont print anything (don't show an error message)
  //   if (visited && !valid && !currentlyFocused ) {
  //     errormessage = (
  //       <p className="text-sm text-red-500 truncate">
  //         "Choice Cannot be left empty"
  //       </p>
  //     );
  //   }

  return (
    <Fragment>
      {errormessage}
      <label
        onClick={onFocusHandler}
        onBlur={onBlurHandler}
        htmlFor={props.choiceId}
        key={props.choiceId}
        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 "
      >
        <div className="flex-shrink-0">{props.img}</div>
        <Divider variant="middle" orientation="vertical"></Divider>
        <div className="flex-1 min-w-0">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{props.name}</p>
          {displayedDescription}
        </div>
      </label>
    </Fragment>
  );
};
export default CreateExamChoice;

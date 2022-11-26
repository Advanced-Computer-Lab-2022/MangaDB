import { useState, Fragment } from "react";
import SecondaryButton from "../../SecondaryButton";
import CreateExamChoices from "./CreateExamChoices";
import Divider from "@mui/material/Divider";
import QuestionSolution from "./QuestionSolution";


const defaultChoicesState = [
  {
    choiceId: "1",
    description: "",
  },
  {
    choiceId: "2",
    description: "",
  },
  {
    choiceId: "3",
    description: "",
  },
  {
    choiceId: "4",
    description: "",
  },
];
const CreateQuestionForm = (props) => {
  const titleDefaultState = props.title ? props.title : "";
  const defaultChoice = props.choices ? props.choices : defaultChoicesState;
  const [questionState, setQuestionState] = useState(titleDefaultState);
  const [choicesState, setChoicesState] = useState(defaultChoice);
  const [solutionState, setSolutionState] = useState();
  const submitHandler = (event) => {
    event.preventDefault();
    //Can modify the Question format to match the backend here..
    var QuestionData = {
      QuestionDescription: questionState,
      choices: choicesState,
      solution: solutionState,
    };
    props.onSubmit(QuestionData);
  };
  const solutionOnChangeHandler = (data) => {
    setSolutionState(data);
  };

  const onChoiceChangeHandler = (choiceId, newData) => {
    var newChoiceState = [];
    for (var i = 0; i < choicesState.length; i++) {
      if (choicesState[i].choiceId === choiceId) {
        var temp = {
          choiceId: choiceId,
          description: newData,
        };

        newChoiceState.push(temp);
      } else {
        newChoiceState.push(choicesState[i]);
      }
    }
    setChoicesState(newChoiceState);
  };

  const titleChangeHandler = (event) => {
    setQuestionState(event.target.value);
  };

  return (
    <Fragment>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Question-Info</div>
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
          <div className="mt-2 mb-4">
            <label className="block" htmlFor="question-title">
              Question Title
            </label>
            <input
              onChange={titleChangeHandler}
              id="question-title"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>
          <div className="mt-2">
            <CreateExamChoices
              choices={choicesState}
              onChange={onChoiceChangeHandler}
            ></CreateExamChoices>
          </div>
          <div className="mt-4">
            <QuestionSolution
              onChange={solutionOnChangeHandler}
              currentSolution={solutionState}
            ></QuestionSolution>
          </div>
          <div className="controls flex justify-end space-x-2 mt-2">
            <SecondaryButton
              className=" rounded-md  "
              text="Save Question"
              type="submit"
            ></SecondaryButton>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default CreateQuestionForm;

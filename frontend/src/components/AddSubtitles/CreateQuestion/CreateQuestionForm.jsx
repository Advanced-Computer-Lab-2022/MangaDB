import { useState, Fragment } from "react";
import SecondaryButton from "../../SecondaryButton";
import CreateExamChoices from "./CreateExamChoices";
import Divider from "@mui/material/Divider";

const CreateQuestionForm = (props) => {
  const titleDefaultState = props.title? props.title :""
  const [questionState,setQuestionState] = useState(titleDefaultState)
  const [choicesState,setChoicesState] = useState([])
  const submitHandler = (event) => {
    event.preventDefault();
    
    
  };
 
  const choiceChangeHandler=(newData) => {
    setChoicesState(newData);
  }

  const titleChangeHandler = (event) => {
    setQuestionState(event.target.value);
  }


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
            <CreateExamChoices></CreateExamChoices>
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

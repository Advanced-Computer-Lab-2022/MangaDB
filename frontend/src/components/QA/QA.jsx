import { useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";

const QA = (props) => {
  const [question, setQuestion] = useState("");
  const questionChangeHandler = (event) => {
    setQuestion(event.target.value);
  };
  const onClickHandler = () => {
    props.onSubmitQA(question);
    setQuestion("");
  };
  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-xl">Ask A Question</div>
      </div>

      <textarea
        onChange={questionChangeHandler}
        className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
          focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
      />
      <div className="flex justify-end mb-4">
        <SecondaryButton text="Submit" onClick={onClickHandler} />
      </div>
      <div>
        <div className=" font-semibold text-xl">Your Previous Questions:</div>
      </div>
    </div>
  );
};
export default QA;

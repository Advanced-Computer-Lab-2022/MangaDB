import { useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import QuestionSelector from "./QuestionSelector";
import QuestionCard from "./QuestionCard";
const QA = (props) => {
  const [question, setQuestion] = useState("");
  const questionChangeHandler = (event) => {
    setQuestion(event.target.value);
  };
  const onClickHandler = () => {
    props.addQuestionHandler(question);
    setQuestion("");
  };
  const displayedQuestions = props.QA.map((QA) => {
    if (props.QAFilter.name === "All") {
      if (QA.answer) {
        return (
          <QuestionCard
            status="Answered"
            date={QA.date}
            question={QA.question}
            answer={QA.answer}
          ></QuestionCard>
        );
      } else {
        return (
          <QuestionCard
            status="Pending"
            date={QA.date}
            question={QA.question}
          ></QuestionCard>
        );
      }
    } else {
      if (QA.answer) {
        return (
          <QuestionCard
            status="Answered"
            date={QA.date}
            question={QA.question}
            answer={QA.answer}
          ></QuestionCard>
        );
      } else {
        return <div className="w-0 h-0 overflow-hidden"></div>;
      }
    }
  });
  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-xl">Ask A Question</div>
        <div className="w-[25vw]">
          <QuestionSelector
            selected={props.QAFilter}
            changeQuestionFilterHandler={props.changeQuestionFilterHandler}
          />
        </div>
      </div>

      <textarea
        value={question}
        onChange={questionChangeHandler}
        className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
          focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
      />
      <div className="flex justify-end mb-4">
        <SecondaryButton text="Submit" onClick={onClickHandler} />
      </div>
      <div>
        <div className=" font-semibold text-xl">Your Previous Questions:</div>
        <div className="mt-2"> {displayedQuestions}</div>
      </div>
    </div>
  );
};
export default QA;

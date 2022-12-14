import Exam from "./Exam";
import Alert from "../UI/Alert";
import { useState, Fragment } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import PrimaryButton from "../UI/PrimaryButton";
const ExamManager = (props) => {
  const [checkResults, setCheckResults] = useState(false);
  const checkResultsClickHandler = () => {
    setCheckResults(true);
  };

  const examQuestionsWithAnswers = props.exam;
  const studentAnswers = props.studentAnswers;
  var solvedBefore = true;
  if (!studentAnswers) {
    solvedBefore = false;
  }
  var message;
  var correct = [];
  var wrong = [];

  if (solvedBefore) {
    if (props.grade / examQuestionsWithAnswers.length < 0.5) {
      message = `You can always do better , you got ${props.grade} out of ${examQuestionsWithAnswers.length}, review the course content to broaden your knowledge`;
    } else if (
      props.grade / examQuestionsWithAnswers.length >= 0.5 &&
      props.grade / examQuestionsWithAnswers.length <= 0.8
    ) {
      message = `You Passed, but there is always better , you got ${props.grade} out of ${examQuestionsWithAnswers.length}`;
    } else {
      message = `Good Job, you got ${props.grade} out of ${examQuestionsWithAnswers.length}`;
    }
    for (var i = 0; i < examQuestionsWithAnswers.length; i++) {
      if (examQuestionsWithAnswers[i].solution === studentAnswers[i]) {
        correct.push(examQuestionsWithAnswers[i].question);
      } else {
        wrong.push(examQuestionsWithAnswers[i].question);
      }
    }
  }
  return (
    <Fragment>
      {solvedBefore && !checkResults && (
        <div className="overflow-scroll">
          <Alert message={message}></Alert>
          {correct.length !== 0 && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    What you got right
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {correct.map((question) => {
                        return <li>{question}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {wrong.length !== 0 && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There were 2 errors with your submission
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {wrong.map((question) => {
                        return <li>{question}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!solvedBefore && checkResults && (
        <Exam
          exam={examQuestionsWithAnswers}
          studentAnswers={studentAnswers}
          solvedBefore={solvedBefore}
          onSolveExamHandler={props.onSolveExamHandler}
        ></Exam>
      )}
    </Fragment>
  );
};
export default ExamManager;

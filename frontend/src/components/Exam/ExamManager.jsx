import Exam from "./Exam";
import Alert from "../UI/Alert";
import { useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import SecondaryButton from "../UI/SecondaryButton";
import { Typography } from "@material-tailwind/react";
import { DualRing } from "react-awesome-spinners";

const ExamManager = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [checkResults, setCheckResults] = useState(false);
  const [startExam, setStartExam] = useState(false);
  const checkResultsClickHandler = () => {
    setCheckResults(true);
  };
  const startExamClickHandler = () => {
    setStartExam(true);
  };
  const onSolveExamHandler = (exam) => {
    props.onSolveExamHandler(exam);
    setStartExam(false);
    setLoading(true);
  };

  useImperativeHandle(ref, () => ({
    refreshManager() {
      setStartExam(false);
      setCheckResults(false);
      setLoading(false);
    },
  }));

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
      message = (
        <p>
          You can always do better , you got{" "}
          <strong>
            {props.grade} out of {examQuestionsWithAnswers.length}
          </strong>
          , review the course content to broaden your knowledge
        </p>
      );
    } else if (
      props.grade / examQuestionsWithAnswers.length >= 0.5 &&
      props.grade / examQuestionsWithAnswers.length <= 0.8
    ) {
      message = (
        <p>
          You Passed, but there is always better , you got
          <strong>
            {props.grade} out of {examQuestionsWithAnswers.length}
          </strong>
        </p>
      );
    } else {
      message = (
        <p>
          Good Job, you got{" "}
          <strong>
            {props.grade} out of {examQuestionsWithAnswers.length}
          </strong>
        </p>
      );
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
      {loading && (
        <div className="justify-center items-center flex w-2/3 ">
          <DualRing size="200" />
        </div>
      )}
      {solvedBefore && !checkResults &&!loading && (
        <div className="overflow-y-scroll relative">
          <Alert>{message}</Alert>
          {correct.length !== 0 && (
            <div className="rounded-md bg-green-50 p-4 mt-2">
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
          {wrong.length !== 0 &&!loading && (
            <div className="rounded-md bg-red-50 p-4 mt-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    What you Got wrong
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
          <SecondaryButton
            className="absolute right-2 bottom-2"
            onClick={checkResultsClickHandler}
          >
            Check Results
          </SecondaryButton>
        </div>
      )}
      {(checkResults || startExam) &&!loading && (
        <Exam
          next={props.next}
          exam={examQuestionsWithAnswers}
          studentAnswers={studentAnswers}
          solvedBefore={solvedBefore}
          onSolveExamHandler={onSolveExamHandler}
        ></Exam>
      )}
      {!solvedBefore && !startExam &&!loading && (
        <Fragment>
          <Alert>
            <Typography variant="h5">{`This exam consists of ${examQuestionsWithAnswers.length} Multiple Choice Questions, Each Question Has 4 Choices`}</Typography>
          </Alert>
          <div className="rounded-md bg-gray-100 p-4 mt-2">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm  font-semibold text-black-800">
                  Hints befort You Start The Exam
                </h3>
                <div className="mt-2 text-sm text-black-700">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li> Read The Choices Before Reading The Question. </li>
                    <li>
                      Read The Question Thoughly, Before Deciding What To
                      Choose.
                    </li>
                    <li>
                      If You Aren't Sure About That Question Now, You Can Skip
                      That Question And Visit It Later.
                    </li>
                    <li>
                      Before Submitting, Revisit The Questions To Make Sure You
                      Are Correct.
                    </li>
                    <li>
                      If You Are Completely Unsure About The Answer, Solve By
                      Elimination Of Choices.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-end mr-4 mt-2">
            <SecondaryButton
              text="Start Exam"
              onClick={startExamClickHandler}
            ></SecondaryButton>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
});
export default ExamManager;

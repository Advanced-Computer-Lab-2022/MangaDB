import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ExamChoices = (props) => {
  //check if the student solved this question ..
  var studentSolved = false;
  if (props.studentAnswers) {
    studentSolved = true;
  } else {
    studentSolved = false;
  }

  //get the exact correct answer
  var correctAnswer;
  for (var i = 0; i < props.choices.length; i++) {
    if (props.choices[i].choiceID === props.correct.answer) {
      correctAnswer = props.choices[i];
    }
  }

  //get the student answer
  var studentAnswer;
  if (studentSolved) {
    for (var j = 0; j < props.choices.length; j++) {
      if (props.choices[j].choiceID === props.studentAnswers.answer) {
        studentAnswer = props.choices[j];
      }
    }
  }
  //check if the student solved the question correctly
  var solvedCorrectly = studentAnswer === correctAnswer ? true : false;

  return (
    <RadioGroup disabled={true}>
      <div className="space-y-4">
        {props.choices.map((choice) => (
          <RadioGroup.Option
            key={choice.name}
            value={choice}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                choice.choiceID === studentAnswer.choiceID
                  ? solvedCorrectly
                    ? "ring-2 ring-green-600"
                    : "ring-2 ring-red-600"
                  : choice.choiceID === correctAnswer.choiceID
                  ? "ring-2 ring-green-600"
                  : "",
                "relative block bg-white border rounded-lg shadow-sm px-6 py-4 sm:flex sm:justify-between focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label
                      as="p"
                      className="font-medium text-gray-900"
                    >
                      {choice.choiceID}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="div" className="text-gray-500">
                      {choice.description}
                    </RadioGroup.Description>
                  </div>
                </div>
                <RadioGroup.Description
                  as="div"
                  className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                >
                  <div className="mt-2">
                    {choice.choiceID === studentAnswer.choiceID ? (
                      solvedCorrectly ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="rgba(0,200,0,0.9)"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="rgba(200,0,0,1)"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 "

                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </RadioGroup.Description>
                <div
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-indigo-500" : "border-transparent",
                    "absolute -inset-px rounded-lg pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ExamChoices;

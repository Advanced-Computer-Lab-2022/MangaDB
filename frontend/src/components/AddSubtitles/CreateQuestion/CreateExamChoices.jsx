import { useState } from "react";
import CreateExamChoice from "./CreateExamChoice";
const choiceA = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    class="bi bi-1-square"
    viewBox="0 0 16 16"
  >
    <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
  </svg>
);

const choiceB = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    class="bi bi-2-square"
    viewBox="0 0 16 16"
  >
    <path d="M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z" />
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
  </svg>
);

const choiceC = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    class="bi bi-3-square"
    viewBox="0 0 16 16"
  >
    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z" />
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
  </svg>
);

const choiceD = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    class="bi bi-4-square"
    viewBox="0 0 16 16"
  >
    <path d="M7.519 5.057c.22-.352.439-.703.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z" />
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
  </svg>
);

const defaultChoicesState = [
  {
    choiceId: "1",
    description: "",
    img: choiceA,
  },
  {
    choiceId: "2",
    description: "",
    img: choiceB,
  },
  {
    choiceId: "3",
    description: "",
    img: choiceC,
  },
  {
    choiceId: "4",
    description: "",
    img: choiceD,
  },
];
const CreateExamChoices = (props) => {
  const [choicesState, setChoicesState] = useState(defaultChoicesState);
  const onChoiceChangeHandler = (choiceId, newData) => {
    var newChoiceState = [];
    for (var i = 0; i < choicesState.length; i++) {
      if (choicesState[i].choiceId === choiceId) {
        var temp = {
          choiceId: choiceId,
          description: newData,
          img: choicesState[i].img,
        };

        newChoiceState.push(temp);
      } else {
        newChoiceState.push(choicesState[i]);
      }
    }
    props.onChoiceChangeHandler(newChoiceState);
    setChoicesState(newChoiceState);
  };
  var diplayedChoices = choicesState.map((choice, index) => {
    return (
      <CreateExamChoice
        onChoiceChangeHandler={onChoiceChangeHandler.bind(
          null,
          choice.choiceId
        )}
        choiceId={choice.id}
        name={"Choice Number" + (index + 1)}
        description={choice.description}
        img={choice.img}
      ></CreateExamChoice>
    );
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {diplayedChoices}
    </div>
  );
};
export default CreateExamChoices;

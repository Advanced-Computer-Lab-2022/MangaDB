import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ExamChoices = (props) => {
  const onChangeHandler = (event) => {
    props.onSaveChoice(event);
  };
  return (
    <RadioGroup value={props.selected} onChange={onChangeHandler}>
      <div className="space-y-4">
        {props.choices.map((choice) => (
          <RadioGroup.Option
            key={choice.name}
            value={choice}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "ring-2 ring-indigo-500" : "",
                "relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
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

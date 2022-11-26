import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const Choices = [
  { id: 1, name: "First Choice" },
  { id: 2, name: "Second Choice" },
  { id: 3, name: "Third Choice" },
  { id: 4, name: "Fourth Choice" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const QuestionSolution = (props) => {
  const onChangeHandler = (event) => {
    props.onChange(event);
  };
  const DefaultSelected = props.currentSolution
    ? props.currentSolution
    : Choices[0];
  return (
    <Listbox value={DefaultSelected} onChange={onChangeHandler}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Question Solution
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-darkBlue-500 focus:border-darkBlue-500 sm:text-sm">
              <span className="block truncate">{DefaultSelected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-10 w-full bg-white shadow-lg  rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {Choices.map((choice) => (
                  <Listbox.Option
                    key={choice.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-8 pr-4"
                      )
                    }
                    value={choice}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {choice.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-darkBlue-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
export default QuestionSolution;

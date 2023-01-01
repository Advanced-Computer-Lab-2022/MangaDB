import { React, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const options = [
    { id: 1, name: "Computer Hardware" },
    { id: 2, name: "Data Structures" },
    { id: 3, name: "Computer Architecture" },
    { id: 4, name: "Programming Fundamentals" },
    { id: 5, name: "Computer Organization" },
    { id: 6, name: "Machine Learning" },
    { id: 7, name: "Web Development" },
  ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CourseSubjectSelector = (props) => {
  return (
    <Listbox value={props.selected} onChange={props.selectedChangeHandler}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="bg-white relative w-full h-[1.875rem] border border-gray-300 rounded-md  text-black hover:bg-gray-200 shadow-sm pl-3 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primaryBlue focus:border-primaryBlue sm:text-sm">
              <span className="block truncate">{props.selected.name}</span>
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
              <Listbox.Options className="absolute z-10 w-full bg-white shadow-lg max-h-60  py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((options) => (
                  <Listbox.Option
                    key={options.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-primaryBlue" : "text-gray-900",
                        "cursor-pointer select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={options}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {options.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-primaryBlue",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
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

export default CourseSubjectSelector;

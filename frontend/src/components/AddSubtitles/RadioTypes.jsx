import { useState } from "react";
import { RadioGroup} from "@headlessui/react";

const options = [
  { name: "video", available: true },
  { name: "file", available: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RadioTypes = (props) => {
  const [checked, setChecked] = useState(options[0]);

const changeHandler  = (event) => {
    props.onChange(event)
    setChecked(event);
}
  return (
    <div>
      <RadioGroup value={checked} onChange={changeHandler} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose a source type
        </RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.available
                    ? "cursor-pointer focus:outline-none"
                    : "opacity-25 cursor-not-allowed",
                  active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                  checked
                    ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
export default RadioTypes;

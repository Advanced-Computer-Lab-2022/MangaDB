import { useState } from "react";
const SubjectFilter = (props) => {
  const [checked, setChecked] = useState([]);
  const changeHandler = (event) => {
    var newChecked = [];
    if (!checked.includes(+event.target.id))
      newChecked = [...checked, +event.target.id];
    else {
      for (var i = 0; i < checked.length; i++) {
        if (checked[i] !== +event.target.id) {
          newChecked = newChecked.concat(checked[i]);
        }
      }
    }
    props.onChange(newChecked);
    setChecked(newChecked);
  };
  var options = props.options.map((option) => {
    return (
      <li key={option.id}>
        <div className="flex items-center">
          <input
            id={option.id}
            type="checkbox" 
            value=""
            checked={checked.includes(option.id)? true:false }
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={changeHandler}
          ></input>
          <label
            htmlFor={option.id}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {option.name}
          </label>
        </div>
      </li>
    );
  });
  return (
        <div
          id="dropdownDefaultCheckbox"
          className=" z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
        >
          <ul
            className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownCheckboxButton"
          >
            {options}
          </ul>
        </div>
  
  );
};
export default SubjectFilter;

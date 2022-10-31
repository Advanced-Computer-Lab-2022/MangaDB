const SubjectFilter = (props) => {
    var checked= props.defaultState ? props.defaultState : []
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
    checked=newChecked;
  };
  var options = props.options.map((option) => {
    return (
      <li key={option.id}>
        <div className="items-center">
          <button
            id={option.id}
            value=""
            checked={checked.includes(option.id) ? true : false}
            className={`w-fit px-3 rounded-full transition ease-in-out duration-150 ${
              checked.includes(option.id)
                ? " bg-darkBlue text-white"
                : " bg-lightBlue "
            }  border-gray-300 focus:ring-primaryBlue accent-darkBlue`}
            onClick={changeHandler}
          >
            {option.name}
          </button>
        </div>
      </li>
    );
  });
  return (
    <div
      id="dropdownDefaultCheckbox"
      className="text-lg font-semibold"
      data-popper-reference-hidden=""
      data-popper-escaped=""
      data-popper-placement="bottom"
    >
      Subjects
      <ul
        className="flex flex-wrap justify-center gap-x-4 gap-y-5 place-items-center my-4"
        aria-labelledby="dropdownCheckboxButton"
      >
        {options}
      </ul>
    </div>
  );
};
export default SubjectFilter;

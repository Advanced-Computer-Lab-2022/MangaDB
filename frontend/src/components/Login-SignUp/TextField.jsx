export default function TextField(props) {
  return (
    <div className="relative">
      <label for={props.label}>
        <p class={"font-medium  pb-2 text-slate-700"}>
          {props.label} {props.required ? "*" : ""}
        </p>
        <div className="relative">
          <input
            ref={props.FieldRef}
            type="text"
            className={"w-full py-3 border   border-slate-200 pl-12 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow "
              .concat(props.warning ? " border-red-200 " : " ")
              .concat(props.className)
              }
            placeholder={!props.placeholder ? props.label : props.placeholder}
          />
        </div>
      </label>
      <div class="absolute bottom-3  flex items-center ">
        {props.icon ? (
          <img src={props.icon} className="h-7 w-7 ml-3 text-gray-400 "></img>
        ) : null}
        {props.icon2}
      </div>
    </div>
  );
}

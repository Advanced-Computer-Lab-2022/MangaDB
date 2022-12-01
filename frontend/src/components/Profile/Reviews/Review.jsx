import { StarIcon } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Review = (props) => {
  return (
    <div className="flex items-center py-4 divide-x-2 flex-grow rounded-lg border-gray-300 border-2 ">
      <div className="text-center flex-row items-center justify-center w-1/3">
        <p className="font-medium text-gray-900">{props.author}</p>
        <time className=" border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
          {props.date}
        </time>
      </div>

      <div className="flex items-center xl:col-span-1 justify-center px-12 w-1/3">
        <div className="flex items-center ">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                props.rating > rating ? "text-yellow-400" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="ml-3 text-sm text-gray-700 ">{props.rating}</p>
      </div>

      <div className="space-y-6 text-sm text-gray-500 w-1/3 text-center">{props.content}</div>
    </div>
  );
};
export default Review;

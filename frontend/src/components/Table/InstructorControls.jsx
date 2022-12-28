import { Fragment, useState } from "react";
import Search from "../UI/Search/Search";
import SecondaryButton from "../UI/SecondaryButton";
import TertiaryButton from "../UI/TertiaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const icon = <TuneOutlinedIcon className="ml-2" />;

const InstructorControls = (props) => {
  const [active, setActive] = useState(false);

  const myCoursesClickHandler = () => {
    setActive(prev => !prev)
    props.onCoursesClick();
  };
  return (
    <Fragment>
      <div className="flex md:justify-between justify-center my-4">
        <div className="flex space-x-4 md:ml-4">
          <div className="">
            <Search
              prevmyCoursesState={props.prevmyCoursesState}
              prevSearchState={props.prevSearchState}
              onChange={props.onChange}
            />
          </div>
          <div className="mt-2">
            <SecondaryButton
              onClick={props.onShowFilters}
              text="Filter"
              icon={icon}
            />
          </div>
        </div>
        <div className="mt-[6px] mr-4 hidden md:block">
          <TertiaryButton
            onClick={myCoursesClickHandler}
            text="My Courses"
            state={active ? "My Courses" : ""}
          />
        </div>
      </div>
      <div className="flex justify-center mb-2 md:hidden">
        <TertiaryButton
          className="w-[80vw]"
          onClick={myCoursesClickHandler}
          text="My Courses"
          state={active ? "My Courses" : ""}
        />
      </div>
    </Fragment>
  );
};
export default InstructorControls;

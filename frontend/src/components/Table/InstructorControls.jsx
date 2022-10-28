import { Fragment } from "react";
import Search from "../Search";
import SecondaryButton from "../SecondaryButton";
import TertiaryButton from "../TertiaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const icon = <TuneOutlinedIcon className="ml-2" />;

const InstructorControls = () => {
  return (
    <Fragment>
      <div className="hidden md:grid grid-cols-8 gap-y-4 items-center my-4">
        <div className="col-span-4 md:ml-10 lg:ml-16 xl:ml-20">
          <Search />
        </div>
        <div className="col-span-2 md:mr-10 lg:mr-24 xl:mr-32 justify-self-center">
          <SecondaryButton text="Filter" icon={icon}></SecondaryButton>
        </div>
        <div className="col-span-2 justify-self-center">
          <TertiaryButton text="My Courses" />
        </div>
      </div>
      <div className="md:hidden my-4">
        <div className="flex justify-center mb-3">
          <Search className="ml-4" />
          <SecondaryButton
            className="mr-4"
            text="Filter"
            icon={icon}
          ></SecondaryButton>
        </div>
        <div className="flex justify-center">
          <TertiaryButton className="w-full mx-5" text="My Courses" />
        </div>
      </div>
    </Fragment>
  );
};
export default InstructorControls;

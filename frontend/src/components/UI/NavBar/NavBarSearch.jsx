import React, { useState } from "react";
import logo from "../../../Assets/Images/Logo.svg";
import CountryManager from "./CountryManager";
import PrimaryButton from "../PrimaryButton";
import { Divider } from "@mui/material";
import HomeNavBar from "./HomeNavBar";
import MyCoursesNavBar from "./MyCoursesNavBar";
import FAQsNavBar from "./FAQsNavBar";
import CartNavBar from "./CartNavBar";
import ProfileNavBar from "./ProfileNavBar";
import RequestCourseNavBar from "./RequestCourseNavBar";
import SignInNavBar from "./SignInNavBar";
import DashboardNavBar from "./DashboardNavBar";
import AddCourseNavBar from "./AddCourseNavBar";
import AddUserNavBar from "./AddUserNavBar";
import RequestedCoursesNavBar from "./RequestedCoursesNavBar";
import SecondaryButton from "../SecondaryButton";
import SearchBar from "../Search/SearchBar";
import LogoutNavBAr from "./LogoutNavBar";

//var navButtons = [{name: "Home", active: true},{name: "My Courses", active: false},{name: "FAQs", active: false},{name: "Cart", active: false},{name: "Profile", active: false}]
var navButtons = [
  { name: "Home", active: true },
  { name: "My Courses", active: false },
  { name: "FAQs", active: false },
  { name: "Logout", active: false },
  { name: "Profile", active: false },
  
];
const NavBarSearch = (props) => {
  const [open, setOpen] = useState(false);

  const openToggleHandler = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 xl:${"shadow-md"} ${
        !open ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="flex py-2 px-8 items-center justify-between">
        <div className="cursor-pointer flex items-center font-semibold text-2xl xl:mb-0 xl:mr-4">
          <span>
            <img className="h-10" src={logo} alt="logo" />
          </span>
          <span className="mt-5">evamp</span>
        </div>
        {open && (
          <div className="mt-2">
            <Divider />
          </div>
        )}
        <div>
          <PrimaryButton
            className="xl:hidden absolute top-5 right-8"
            onClick={openToggleHandler}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            )}
          </PrimaryButton>
        </div>
        <div className="xl:w-[45vw] xl:mr-0 mr-[18vw]">
          <SearchBar className="xl:w-[40vw] w-[50vw]" />
        </div>
        <ul
          className={`xl:flex pb-4 xl:pb-0 xl:items-center space-y-8 xl:space-y-0 xl:space-x-12 my-4 xl:my-0 absolute xl:static bg-white xl:z-auto z-[-1] left-0 w-full xl:w-auto xl:pl-0 pl-9 transition-all duration-300 ease-in-out xl:shadow-none shadow-md ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {navButtons.map((navButton) => {
            if (navButton.name === "Home") {
              return <HomeNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "My Courses") {
              return <MyCoursesNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "FAQs") {
              return <FAQsNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Cart") {
              return <CartNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Profile") {
              return <ProfileNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Request Course") {
              return <RequestCourseNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Sign In") {
              return <SignInNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Dashboard") {
              return <DashboardNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Add Course") {
              return <AddCourseNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Add User") {
              return <AddUserNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Requested Courses") {
              return <RequestedCoursesNavBar active={navButton.active} search={false} />;
            } else if (navButton.name === "Logout") {
              return <LogoutNavBAr active={navButton.active} search={false} />;
            }
          })}
          <li className="cursor-pointer">
            <CountryManager onChange={props.onChange} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarSearch;

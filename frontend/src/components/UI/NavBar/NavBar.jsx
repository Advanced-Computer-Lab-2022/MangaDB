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
import LogoutNavBAr from "./LogoutNavBar";

var navButtons = [
  { name: "Home", active: true },
  { name: "My Courses", active: false },
  { name: "FAQs", active: false },
  { name: "Logout", active: false },
  { name: "Profile", active: false },
  
];

const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const openToggleHandler = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`w-full sticky z-[100] bg-white top-0 left-0 md:${"shadow-md"} ${
        !open ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="md:flex py-2 px-8 items-center justify-between relative z-10">
        <div className="cursor-pointer flex items-center font-semibold text-2xl md:mb-0 bg-white">
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
            className="md:hidden absolute top-5 right-8"
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
        <ul
          className={`md:flex pb-4 md:pb-0 md:items-center pt-4 md:pt-0 space-y-8 md:space-y-0 md:space-x-12 my-4 md:my-0 absolute bg-white md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in-out md:shadow-none shadow-md ${
            open ? "top-14" : "top-[-490px]"
          }`}
        >
          {/* Profile will not appear active */}
          {navButtons.map((navButton) => {
            if (navButton.name === "Home") {
              return <HomeNavBar active={navButton.active} />;
            } else if (navButton.name === "My Courses") {
              return <MyCoursesNavBar active={navButton.active} />;
            } else if (navButton.name === "FAQs") {
              return <FAQsNavBar active={navButton.active} />;
            } else if (navButton.name === "Cart") {
              return <CartNavBar active={navButton.active} />;
            } else if (navButton.name === "Profile") {
              return <ProfileNavBar active={navButton.active} />;
            } else if (navButton.name === "Request Course") {
              return <RequestCourseNavBar active={navButton.active} />;
            } else if (navButton.name === "Sign In") {
              return <SignInNavBar active={navButton.active} />;
            } else if (navButton.name === "Dashboard") {
              return <DashboardNavBar active={navButton.active} />;
            } else if (navButton.name === "Add Course") {
              return <AddCourseNavBar active={navButton.active} />;
            } else if (navButton.name === "Add User") {
              return <AddUserNavBar active={navButton.active} />;
            } else if (navButton.name === "Requested Courses") {
              return <RequestedCoursesNavBar active={navButton.active} />;
            } else if (navButton.name === "Logout") {
              return <LogoutNavBAr active={navButton.active} />;
            }
          })}
          <li className="cursor-pointer">
            <CountryManager onChange={props.onChange} />
          </li>
        </ul>
      </div>
    </div>
    //navBar done without navigation
  );
};

export default NavBar;

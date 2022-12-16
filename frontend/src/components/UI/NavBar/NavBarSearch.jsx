import React, { useState } from "react";
import logo from "../../../Assets/Images/Logo.svg";
import CountryManager from "./CountryManager";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { Divider } from "@mui/material";
import SearchBar from "../Search/SearchBar";

let navButtons = ["Home", "My Courses", "FAQs", "Cart", "Sign In"];

const NavBarSearch = (props) => {
  const [open, setOpen] = useState(false);

  const openToggleHandler = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 md:${"shadow-md"} ${
        !open ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="md:flex py-2 px-8 items-center justify-between">
        <div className="cursor-pointer flex items-center font-semibold text-2xl md:mb-0">
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
          className={`md:flex pb-4 md:pb-0 md:items-center space-y-8 md:space-y-0 md:space-x-12 my-4 md:my-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in-out md:shadow-none shadow-md ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {/* <SearchBar className="w-[20vw]" /> */}
          {navButtons.map((navButton) => {
            if (navButton !== "Cart" && navButton !== "Sign In") {
              return (
                <li>
                  <PrimaryButton text={navButton} />
                </li>
              );
            } else if (navButton === "Cart") {
              return (
                <li>
                  <PrimaryButton className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </PrimaryButton>
                </li>
              );
            } else if (navButton === "Sign In") {
              return (
                <li>
                  <SecondaryButton text={navButton} />
                </li>
              );
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

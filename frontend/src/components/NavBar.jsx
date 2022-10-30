import logo from "../Assets/Images/Logo.svg";
import CountryManager from "./CountryManager";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const NavBar = (props) => {
  return (
    <nav className="bg-white mb-6 border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow-md items-center justify-center">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={logo} className=" md:mb-3 md:h-12 h-10 mb-1" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap mt-4">
            evamp
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <div
            className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow :bg-gray-700 :divide-gray-600"
            id="user-dropdown"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="bottom"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: "translate3d(0px, 15283.2px, 0px)",
            }}
          >
            <ul className="py-1" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white absolute right-72">
            <li>
              <PrimaryButton text="Home" />
            </li>
            <li>
              <PrimaryButton text="My Courses" />
            </li>
            <li>
              <PrimaryButton text="About Us" />
            </li>
            <li>
              <PrimaryButton text="FAQs" />
            </li>
          </ul>
          <div className="flex gap-12 absolute right-6">
          <SecondaryButton text="Sign in" />
          <CountryManager onChange={props.onChange}/>
          </div>
          
        </div>
      </div>
    </nav>
  );
};
export default NavBar;

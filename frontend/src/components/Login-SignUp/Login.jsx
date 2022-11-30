import SecondaryButton from "../SecondaryButton";
import { useRef, useState } from "react";
import PasswordField from "./PasswordField";
import logo from "../../Assets/Images/Logo.svg";
import userIcon from "../../Assets/Images/userIcon.svg";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Login() {
  const PasswordRef = useRef();
  const UserNameRef = useRef();
  const [incorrectData, setIncorrectData] = useState(false);
  const [emptyUserName, setEmptyUserName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [warning, setWarning] = useState("");

const GoogleLogin = (e) => {
   e.preventDefault();
};

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (UserNameRef.current.value === "" || PasswordRef.current.value === "") {
      if (UserNameRef.current.value === "") {
        setEmptyUserName(true);
        setWarning("please fill the following fields");
      }
      if (PasswordRef.current.value === "") {
        setEmptyPassword(true);
        setWarning("please fill the following fields");
      }
      return;
    } else {
      axios
        .post("http://localhost:3000/user/login", {
          userName: UserNameRef.current.value,
          password: PasswordRef.current.value,
        })
        .then((res) => {
          if (res.data.status === "success") {
            /*
            localStorage.setItem("token", res.data.token);
            window.location.href = "/home";
            */
          } else {
            setIncorrectData(true);
          }
        })
        .catch((err) => {
          setIncorrectData(true);
          setEmptyUserName(false);
          setEmptyPassword(false);
          setWarning("Incorrect username or password");
        });
    }

    //handle patch request
  };
  return (
    <div class="mt-[7%]">
      <div class="antialiased ">
        <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <div className="flex justify-center">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src={logo}
                className=" md:mb-3 md:h-12 h-10 mb-1"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap mt-4">
                evamp
              </span>
            </a>
          </div>
          <div
            class={
              incorrectData || emptyUserName || emptyPassword
                ? "p-4 mt-3 text-red-900 bg-red-50 border rounded-md"
                : "hidden"
            }
          >
            <div class="flex justify-between flex-wrap">
              <div class="w-0 flex-1 flex">
                <div class="mr-3 pt-1">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-md mt-[5px] leading-6 font-medium">
                    {warning}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <form action="" class="my-10" >
            <div class="flex flex-col space-y-5">
              <div className="relative">
                <label for="UserName">
                  <p class="font-medium text-slate-700 pb-2">UserName *</p>
                  <div className="relative">
                    <input
                      ref={UserNameRef}
                      type="text"
                      class={"w-full py-3 border pl-12 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow".concat(
                        emptyUserName ? " border-red-200" : ""
                      )}
                      placeholder="Username"
                    />
                  </div>
                </label>
                <div class="absolute left-3 bottom-4 flex items-center">
                  <img src={userIcon} alt="userIcon" className="w-5 h-5" />
                </div>
              </div>
              <div className="relative">
                <PasswordField
                  PasswordRef={PasswordRef}
                  label="Password"
                  warning={emptyPassword}
                />
              </div>
              <p class=" pl-3 ">
                <a
                  href="#"
                  class="text-primaryBlue hover:opacity-70 ease-in-out duration-300 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Forgot Password? </span>
                </a>
              </p>
              <SecondaryButton
                type="submit"
                className="flex space-x-2 items-center justify-center py-3 font-semibold hover: "
                text="Sign In"
                onClick={onSubmitHandler}
              ></SecondaryButton>

              <div className="flex justify-center">
                <h2 className="opacity-50">OR Sign In With</h2>
              </div>
              <button
              onClick={GoogleLogin}
                className="flex space-x-2 items-center justify-center py-3 font-semibold hover:opacity-80  hover:text-black ease-in-out duration-300 border-2 rounded-lg hover:shadow-md text-indigo-500"
                text="Login with Google"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mr-2"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#e53935"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1565c0"
                    d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                GOOGLE
              </button>
            </div>
          </form>
          <p class="text-center">
            Dont't have an account?{" "}
            <a
              href="#"
              class="text-primaryBlue hover:opacity-70 ease-in-out duration-300 font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

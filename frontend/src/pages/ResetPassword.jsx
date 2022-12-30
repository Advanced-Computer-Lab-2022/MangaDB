import SecondaryButton from "../components/UI/SecondaryButton";
import { useRef, useState } from "react";
import { EyeIcon } from "@heroicons/react/solid";
import { EyeOffIcon } from "@heroicons/react/solid";
import PasswordField from "../components/Login-SignUp/PasswordField";
import axios from "axios";

export default function ResetPassword() {
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [warning, setWarning] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      newPasswordRef.current.value !== confirmNewPasswordRef.current.value &&
      newPasswordRef.current.value !== "" &&
      confirmNewPasswordRef.current.value !== ""
    ) {
      setPasswordMatch(false);
      console.log("passwords don't match");
      setWarning("passwords do not match");
    } else {
      setPasswordMatch(false);
      setWarning("");
    }
    if (newPasswordRef.current.value === "") {
      setEmptyPassword(true);
      setWarning("please fill the following fields");
      console.log("empty password");
    } else {
      setEmptyPassword(false);
    }
    if (confirmNewPasswordRef.current.value === "") {
      setEmptyConfirmPassword(true);
      console.log("empty confirm password");
      setWarning("please fill the following fields");
    } else {
      setEmptyConfirmPassword(false);
    }

    if (!warning) {
      console.log("here");
      axios
        .patch(
          "http://localhost:3000/user/resetPassword",
          { password: newPasswordRef },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          //console.log("here");
          localStorage.removeItem("token");
        });
    }

    //handle patch request
  };
  return (
    <div class="mt-[10%]">
      <div class="antialiased ">
        <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 class="text-4xl font-medium">Reset password</h1>
          <p class="text-slate-500 pl-1">
            Fill up the form to reset the password
          </p>
          <div
            class={
              (emptyPassword ||
                emptyConfirmPassword ||
                passwordMatch === false) &&
              warning
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

          <form action="" class="my-10" onSubmit={onSubmitHandler}>
            <div class="flex flex-col space-y-5">
              <PasswordField
                PasswordRef={newPasswordRef}
                label="New Password"
                warning={emptyPassword || passwordMatch === false}
              />
              <PasswordField
                PasswordRef={confirmNewPasswordRef}
                label="Confirm New Password"
                warning={emptyConfirmPassword || passwordMatch === false}
              />
              <SecondaryButton
                type="submit"
                className="flex space-x-2 items-center justify-center py-3"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 justify-self-start"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                }
                text="Reset Password"
              ></SecondaryButton>
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

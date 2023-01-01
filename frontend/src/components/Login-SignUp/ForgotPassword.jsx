import SecondaryButton from "../UI/SecondaryButton";
import { useRef, useState } from "react";
import axios from "axios";
import TextField from "./TextField";
import userIcon from "../../Assets/Images/userIcon.svg";
import {  useSnackbar } from "notistack";

export default function ForgotPassword() {
  const UserNameRef = useRef();
  const [emptyUserName, setEmptyUserName] = useState(false);

  const [warning, setWarning] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(UserNameRef.current.value);
    if (UserNameRef.current.value === "") {
      setEmptyUserName(true);
      setWarning("please fill the following fields");
    } else {
      setEmptyUserName(false);
      setWarning("");

      axios
        .post("http://localhost:3000/user/forgetpassword", {
          userName: UserNameRef.current.value,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          handleClickVariant("success");
        });
    }

    //handle patch request
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    //console.log("here");
    enqueueSnackbar("An Email has been sent to your Email address  ", {
      variant,
    });
  };
  return (
    <div class="mt-[10%]">
      <div class="antialiased ">
        <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 class="text-4xl font-medium flex justify-center">
            Forgot password
          </h1>
          <p class="text-slate-500 pl-1"></p>
          <div
            class={
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
            <div class="flex flex-col space-y-5 ">
              <TextField
                FieldRef={UserNameRef}
                label="Username"
                warning={emptyUserName}
                icon={userIcon}
                admin={true}
                required={true}
              />

              <SecondaryButton
                type="submit"
                className="flex space-x-2 items-center justify-center py-3 mt-5"
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
                text="Send password reset link"
              ></SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

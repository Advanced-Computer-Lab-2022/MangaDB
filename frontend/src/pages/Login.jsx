import SecondaryButton from "../components/UI/SecondaryButton";
import { useRef, useState, useEffect } from "react";
import PasswordField from "../components/Login-SignUp/PasswordField";
import logo from "../Assets/Images/Logo.svg";
import userIcon from "../Assets/Images/userIcon.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

export default function Login() {
  const clientId =
    "135095813449-ftucre9e6lb7qerr29sb6eltsitg48do.apps.googleusercontent.com";
  const [profile, setProfile] = useState([]);
  const PasswordRef = useRef();
  const UserNameRef = useRef();
  const [incorrectData, setIncorrectData] = useState(false);
  const [emptyUserName, setEmptyUserName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const signUpHandler = () => {
    navigate("/signup");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (UserNameRef.current.value === "" || PasswordRef.current.value === "") {
      if (UserNameRef.current.value === "") {
        setEmptyUserName(true);
        setWarning("please fill the following fields");
      } else {
        setEmptyUserName(false);
      }
      if (PasswordRef.current.value === "") {
        setEmptyPassword(true);
        setWarning("please fill the following fields");
      } else {
        setEmptyPassword(false);
      }
      return;
    } else {
      axios
        .post("http://localhost:3000/user/login", {
          userName: UserNameRef.current.value,
          password: PasswordRef.current.value,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          window.location.href = "/home";
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          console.log(res.data.token);
          navigate(`/home`, { state: res.data.token });
        })
        .catch((error) => {
          if (
            +error.message.split(" ")[error.message.split(" ").length - 1] ===
              401 ||
            +error.message.split(" ")[error.message.split(" ").length - 1] ===
              404 ||
            +error.message.split(" ")[error.message.split(" ").length - 1] ===
              500
          ) {
            setIncorrectData(true);
            setEmptyUserName(false);
            setEmptyPassword(false);
            setWarning("Incorrect username or password");
          }
        });
    }
    //handle post request

    //handle patch request
  };

  const forgetPasswordHandler = (e) => {
    e.preventDefault();
    navigate("/forgotPassword");
  };

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log("success", res.profileObj);
    //navigate("/home/1");
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

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
          <form action="" class="my-10">
            <div class="flex flex-col space-y-5">
              <div className="relative">
                <label for="UserName">
                  <p class="font-medium text-slate-700 pb-2">Username *</p>
                  <div className="relative">
                    <input
                      ref={UserNameRef}
                      type="text"
                      class={"w-full py-3 border pl-12 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow".concat(
                        emptyUserName || incorrectData ? " border-red-200" : ""
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
                  warning={emptyPassword || incorrectData}
                />
              </div>
              <p class=" pl-3 ">
                <button
                  onClick={forgetPasswordHandler}
                  class="text-primaryBlue hover:opacity-70 ease-in-out duration-300 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Forgot Password? </span>
                </button>
              </p>
              <SecondaryButton
                type="submit"
                className="flex space-x-2 items-center justify-center py-3 font-semibold hover: "
                text="Sign In"
                onClick={onSubmitHandler}
              ></SecondaryButton>
              <hr className=" opacity-75" />
              <div className="flex justify-center">
                <h2 className="opacity-50">OR</h2>
              </div>

              <GoogleLogin
                className="flex space-x-0 items-center justify-center p-3 font-semibold hover:opacity-80  hover:text-black ease-in-out duration-300 border-2 rounded-lg hover:shadow-md text-indigo-500"
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </div>
          </form>
          <p class="text-center">
            Dont't have an account?{" "}
            <button
              onClick={signUpHandler}
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
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

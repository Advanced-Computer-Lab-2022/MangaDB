import { Fragment, useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  StarIcon,
} from "@heroicons/react/outline";

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: false },
  { name: "Security & Privacy", icon: KeyIcon, current: true },
];

const settings = [
  {
    name: "Public Access",
    description: "Anyone Can See My Email Address",
  },
  {
    name: "Private To My Students",
    description: "Only My Students Can See My Email Address",
  },
  {
    name: "Private To You",
    description: "Only I Can See My Email Address",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PasswordAndPrivacy = (props) => {
  var defaultEmailSelected;
  if (props.selected) {
    for (var i = 0; i < settings.length; i++) {
      if (settings[i].name === props.selected.name) {
        defaultEmailSelected = settings[i];
        break;
      }
    }
  } else {
    defaultEmailSelected = settings[0];
  }
  const [selected, setSelected] = useState(defaultEmailSelected);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emptyCurrentPassword, setEmptyCurrentPassword] = useState(false);
  const [emptyNewPassword, setEmptyNewPassword] = useState(false);
  const [emptyConfirmNewPassword, setEmptyConfirmNewPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [incorrectCurrentPassword, setIncorrectCurrentPassword] =
    useState(false);

  const onClickNewPasswordHandler = () => {
    setShowNewPassword((prev) => {
      return !prev;
    });
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    //console.log("here");
    enqueueSnackbar(
      "Security and privacy information has been updated successfly  ",
      { variant }
    );
  };
  const onClickConfirmPasswordHandler = () => {
    setShowConfirmPassword((prev) => {
      return !prev;
    });
  };
  const onClickCurrentPasswordHandler = () => {
    setShowCurrentPassword((prev) => {
      return !prev;
    });
  };

  const currentPasswordChangedHandler = (event) => {
    setCurrentPassword(event.target.value);
  };
  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSaveHandler = (event) => {
    event.preventDefault();

    var currentWarning = "";
    if (currentPassword === "") {
      setEmptyCurrentPassword(true);
      currentWarning = "Please fill the following fields ";
      console.log("here");
    } else {
      setEmptyCurrentPassword(false);
    }
    if (newPassword === "") {
      setEmptyNewPassword(true);
      currentWarning = "Please fill the following fields ";
    } else {
      setEmptyNewPassword(false);
    }
    if (confirmPassword === "") {
      setEmptyConfirmNewPassword(true);
      currentWarning = "Please fill the following fields ";
    } else {
      setEmptyConfirmNewPassword(false);
    }
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      currentWarning = "Passwords do not match ";
    } else {
      setPasswordMatch(true);
    }

    setWarning(currentWarning);
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === "" ||
      newPassword !== confirmPassword
    ) {
      window.scrollTo(0, 0, "smooth");
      return;
    }

    //can handle validation later..
    var currentWarning = "";
    if (currentPassword === "") {
      setEmptyCurrentPassword(true);
      currentWarning = "Please fill the following fields ";
      console.log("here");
    } else {
      setEmptyCurrentPassword(false);
    }
    if (newPassword === "") {
      setEmptyNewPassword(true);
      currentWarning = "Please fill the following fields ";
    } else {
      setEmptyNewPassword(false);
    }
    if (confirmPassword === "") {
      setEmptyConfirmNewPassword(true);
      currentWarning = "Please fill the following fields ";
    } else {
      setEmptyConfirmNewPassword(false);
    }
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      currentWarning = "Passwords do not match ";
    } else {
      setPasswordMatch(true);
    }

    setWarning(currentWarning);
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === "" ||
      newPassword !== confirmPassword
    ) {
      window.scrollTo(0, 0, "smooth");
      return;
    }
    const saveData = {
      oldPassword: currentPassword,
      password: newPassword,
    };

    axios
      .patch("http://localhost:3000/user/changePassword", saveData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        handleClickVariant("success");
      })
      .catch((err) => {
        if (
          err.message.split(" ")[err.message.split(" ").length - 1] === "401" &&
          currentPassword !== ""
        ) {
          setIncorrectCurrentPassword(true);
          handleIncorrectCurrentPassword();
        }
      });
  };
  const handleIncorrectCurrentPassword = () => {
    setIncorrectCurrentPassword(true);
    setWarning("Incorrect current password");
    window.scrollTo(0, 0, "smooth");
  };

  return (
    <div>
      <Disclosure
        as="div"
        className="relative bg-sky-700 pb-32 overflow-hidden"
      >
        {({ open }) => (
          <Fragment>
            <div
              aria-hidden="true"
              className={classNames(
                open ? "bottom-0" : "inset-y-0",
                "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#0a527b" }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#065d8c" }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#0369a1"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#065d8c"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#0a527b"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#0a4f76"
                  />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header>
          </Fragment>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <div className="space-y-1">
                  {subNavigation.map((item) => (
                    <div
                      key={item.name}
                      onClick={props.changeStageHandler.bind(null, item.name)}
                      className={classNames(
                        item.current
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-teal-500 group-hover:text-teal-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <form
                className="divide-y divide-gray-200 lg:col-span-9"
                onSubmit={onSaveHandler}
              >
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                      Security
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This information is related to your security and privacy.
                    </p>
                  </div>

                  <div
                    class={
                      emptyNewPassword ||
                      emptyCurrentPassword ||
                      emptyConfirmNewPassword ||
                      !passwordMatch ||
                      incorrectCurrentPassword
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

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                      <div>
                        <div class="mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Current Password{" "}
                            <span className="text-red-500">*</span>
                            Current Password{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex relative">
                            {" "}
                            <input
                              onChange={currentPasswordChangedHandler}
                              value={currentPassword}
                              type={showCurrentPassword ? "text" : "password"}
                              id="password"
                              className={"bg-gray-50 border text-sm  text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ".concat(
                                emptyCurrentPassword || incorrectCurrentPassword
                                  ? "border-red-500"
                                  : "border-gray-300"
                              )}
                              required
                            ></input>
                            {showCurrentPassword ? (
                              <VisibilityIcon
                                className="w-6 h-6 mt-2 absolute right-2 cursor-pointer "
                                onClick={onClickCurrentPasswordHandler}
                              ></VisibilityIcon>
                            ) : (
                              <VisibilityOffIcon
                                className="w-6 h-6 mt-2 absolute right-2 cursor-pointer "
                                onClick={onClickCurrentPasswordHandler}
                              ></VisibilityOffIcon>
                            )}
                          </div>
                        </div>
                        <div class="mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            New Password <span className="text-red-500">*</span>
                          </label>
                          <div className="flex relative">
                            {" "}
                            <input
                              onChange={newPasswordChangeHandler}
                              value={newPassword}
                              type={showNewPassword ? "text" : "password"}
                              id="password"
                              className={"bg-gray-50 border text-sm  text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ".concat(
                                emptyNewPassword || !passwordMatch
                                  ? "border-red-500"
                                  : "border-gray-300"
                              )}
                              required
                            ></input>
                            {showNewPassword ? (
                              <VisibilityIcon
                                className="w-6 h-6 mt-2 absolute right-2 cursor-pointer "
                                onClick={onClickNewPasswordHandler}
                              ></VisibilityIcon>
                            ) : (
                              <VisibilityOffIcon
                                className="w-6 h-6 mt-2 absolute right-2 cursor-pointer "
                                onClick={onClickNewPasswordHandler}
                              ></VisibilityOffIcon>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="mb-6">
                        <label
                          for="confirm_password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Confirm password{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex relative">
                          <input
                            onChange={confirmPasswordChangeHandler}
                            value={confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm_password"
                            className={"bg-gray-50 border text-sm  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ".concat(
                              emptyConfirmNewPassword || !passwordMatch
                                ? "border-red-500"
                                : "border-gray-300"
                            )}
                          ></input>
                          {showConfirmPassword ? (
                            <VisibilityIcon
                              className="w-6 h-6 mt-2 absolute right-2 cursor-pointer "
                              onClick={onClickConfirmPasswordHandler}
                            ></VisibilityIcon>
                          ) : (
                            <VisibilityOffIcon
                              className="w-6 h-6 mt-2 absolute right-2 cursor-pointer "
                              onClick={onClickConfirmPasswordHandler}
                            ></VisibilityOffIcon>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                  <SecondaryButton type="submit">Save</SecondaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default PasswordAndPrivacy;

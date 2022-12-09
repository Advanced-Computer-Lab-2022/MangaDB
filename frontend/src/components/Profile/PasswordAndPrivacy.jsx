import { Fragment, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Disclosure, RadioGroup } from "@headlessui/react";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  StarIcon,
} from "@heroicons/react/outline";

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: false },
  { name: "Billing", icon: CreditCardIcon, current: false },
  { name: "Security & Privacy", icon: KeyIcon, current: true },
  { name: "Reviews & Ratings", icon: StarIcon, current: false },
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

  const onClickNewPasswordHandler = () => {
    setShowNewPassword((prev) => {
      return !prev;
    });
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
    //can handle validation later..
    const saveData = {
      password: newPassword,
      emailPrivacy: selected,
    };
    props.onSaveHandler(saveData);
    console.log(saveData);
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

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                      <div>
                        <div class="mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Current Password
                          </label>
                          <div className="flex relative">
                            {" "}
                            <input
                              onChange={currentPasswordChangedHandler}
                              value={currentPassword}
                              type={showCurrentPassword ? "text" : "password"}
                              id="password"
                              className="bg-gray-50 border text-sm border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            New Password
                          </label>
                          <div className="flex relative">
                            {" "}
                            <input
                              onChange={newPasswordChangeHandler}
                              value={newPassword}
                              type={showNewPassword ? "text" : "password"}
                              id="password"
                              className="bg-gray-50 border text-sm border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                          Confirm password
                        </label>
                        <div className="flex relative">
                          <input
                            onChange={confirmPasswordChangeHandler}
                            value={confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm_password"
                            className="bg-gray-50 border text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className=" py-6 px-4 sm:p-6 lg:pb-8">
                  <RadioGroup value={selected} onChange={setSelected}>
                    <h2 className=" text-lg leading-6 font-medium text-gray-900 mb-3">
                      Email Privacy
                    </h2>

                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                      {settings.map((setting, settingIdx) => (
                        <RadioGroup.Option
                          key={setting.name}
                          value={setting}
                          className={({ checked }) =>
                            classNames(
                              settingIdx === 0
                                ? "rounded-tl-md rounded-tr-md"
                                : "",
                              settingIdx === settings.length - 1
                                ? "rounded-bl-md rounded-br-md"
                                : "",
                              checked
                                ? "bg-sky-50 border-sky-200 z-10"
                                : "border-gray-200",
                              "relative border p-4 flex cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span
                                className={classNames(
                                  checked
                                    ? "bg-sky-600 border-transparent"
                                    : "bg-white border-gray-300",
                                  active
                                    ? "ring-2 ring-offset-2 ring-sky-500"
                                    : "",
                                  "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                                )}
                                aria-hidden="true"
                              >
                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                              </span>
                              <div className="ml-3 flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className={classNames(
                                    checked ? "text-sky-900" : "text-gray-900",
                                    "block text-sm font-medium"
                                  )}
                                >
                                  {setting.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={classNames(
                                    checked ? "text-sky-700" : "text-gray-500",
                                    "block text-sm"
                                  )}
                                >
                                  {setting.description}
                                </RadioGroup.Description>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
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

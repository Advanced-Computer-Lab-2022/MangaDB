import { Fragment, useState ,useImperativeHandle,forwardRef} from "react";
import TertiaryButton from "../UI/TertiaryButton";
import countryList from "react-select-country-list";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SecondaryButton from "../UI/SecondaryButton";
import { Disclosure } from "@headlessui/react";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  StarIcon,
  ExclamationIcon
} from "@heroicons/react/outline";

function emailRegex(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: true },
  { name: "Security & Privacy", icon: KeyIcon, current: false },
  { name: "Requests", icon: ExclamationIcon, current: false },  
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const countryLabels = countryList().getLabels();
const countryCodes = countryList().getValues();
var countries = [];
for (var i = 0; i < countryLabels.length; i++) {
  countries[i] = {
    label: countryLabels[i],
    code: countryCodes[i],
  };
}

const PersonalInfoForm = forwardRef ((props,ref) => {
  const defaultGender = props.gender ? props.gender : "Male";
  const defaultEmail = props.email ? props.email : "";
  const defaultBiography = props.biography ? props.biography : "";
  const defaultFirstName = props.firstName ? props.firstName : "";
  const defaultLastName = props.lastName ? props.lastName : "";

  //country not working now wait to fix css and add it to the backend
  //const defaultCountry = props.country ? props.country : "US";
  //const [country, setCountry] = useState("");

  const [selectedGender, setSelectedGender] = useState(defaultGender);
  const [email, setEmail] = useState(defaultEmail);
  const [biography, setBiography] = useState(defaultBiography);
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyFirstName, setEmptyFirstName] = useState(false);
  const [emptyLastName, setEmptyLastName] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [warning, setWarning] = useState("");

  const CountryHandler = (event) => {
    console.log(event.target.outerText.split("("));
  };

  const MaleClickHandler = (event) => {
    setSelectedGender(event.target.innerHTML);
  };

  const FemaleClickHandler = (event) => {
    setSelectedGender(event.target.innerHTML);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const biographyChangeHandler = (event) => {
    setBiography(event.target.value);
  };
  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    handleRender() {
      setBiography(defaultBiography);
      setFirstName(defaultFirstName);
      setLastName(defaultLastName);
      setEmail(defaultEmail);
      setSelectedGender(defaultGender);
    },
  }));

  const onSaveHandler = (event) => {
    event.preventDefault();
    var currentWarning = "";
    if (email === "") {
      setEmptyEmail(true);
      currentWarning = "please fill the following fields ";
    } else {
      setEmptyEmail(false);
    }
    if (firstName === "") {
      setEmptyFirstName(true);
      currentWarning = "please fill the following fields ";
    } else {
      setEmptyFirstName(false);
    }
    if (lastName === "") {
      setEmptyLastName(true);
      currentWarning = "please fill the following fields ";
    } else {
      setEmptyLastName(false);
    }
    if (emailRegex(email) === false && email !== "") {
      setEmailValid(false);
      currentWarning = "please enter a valid email ";
    } else {
      setEmailValid(true);
    }
    setWarning(currentWarning);
    if (currentWarning !== "") {
      window.scrollTo(0, 0, "smooth");
      return;
    }

    const saveData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      biography: biography,
      gender: selectedGender,
    };
    
    
    axios
      .patch("http://localhost:3000/user/updateuser/63a41b632334fd21e6fab392", saveData/*, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "text/json",
        },
      }*/)
      .then((res) => {
        handleClickVariant("success");
      });
    
      
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    //console.log("here");
    enqueueSnackbar("Personal information has been updated successfuly  ", {
      variant,
    });
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
                  {subNavigation.map((item, index) => (
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
                {/* Personal Information section */}
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>
                  <div
                    class={
                      emptyEmail ||
                      emptyFirstName ||
                      emptyLastName ||
                      !emailValid
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
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                          <input
                            value={email}
                            onChange={emailChangeHandler}
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="username"
                            className={"focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0  rounded-md sm:text-sm border-gray-300 ".concat(
                              !emailValid || emptyEmail ? "border-red-300 " : ""
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Biography
                        </label>
                        <div className="mt-1">
                          <textarea
                            value={biography}
                            onChange={biographyChangeHandler}
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={firstNameChangeHandler}
                        value={firstName}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className={"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm ".concat(
                          emptyFirstName ? "border-red-300 " : ""
                        )}
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={lastName}
                        onChange={lastNameChangeHandler}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className={"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm ".concat(
                          emptyLastName ? "border-red-300 " : ""
                        )}
                      />
                    </div>

                    <div className="col-span-12">
                      <label
                        htmlFor="Gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <div className="w-[60vw] md:w-[27vw] flex space-x-2">
                        <TertiaryButton
                          type="button"
                          state={selectedGender}
                          onClick={MaleClickHandler}
                          text="Male"
                          className="md:w-[8.8vw] w-[19vw] text-xs px-1"
                        />
                        <TertiaryButton
                          type="button"
                          state={selectedGender}
                          onClick={FemaleClickHandler}
                          text="Female"
                          className="md:w-[8.8vw] w-[19vw] text-xs px-1"
                        />
                      </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: 300 }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        onChange={CountryHandler}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {option.label} ({option.code})
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
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
});
export default PersonalInfoForm;
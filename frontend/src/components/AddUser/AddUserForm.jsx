import AddUserToggle from "./AddUserToggle";
import Card from "../UI/Card";
import TextField from "../Login-SignUp/TextField";
import SecondaryButton from "../UI/SecondaryButton";
import AddUser from "../../Assets/Images/AddUser.svg";
import { useState, useRef } from "react";
import axios from "axios";
import userIcon from "../../Assets/Images/userIcon.svg";
import PasswordField from "../Login-SignUp/PasswordField";
import { useSnackbar } from "notistack";
import logo from "../../Assets/Images/Logo.svg";
export default function AddUserForm(props) {
  const [type, setType] = useState("ADMIN");
  const UserNameRef = useRef();
  const PasswordRef = useRef();
  const [emptyUserName, setEmptyUserName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const setTypeHandler = (e) => {
    setType(e.target.value.split(" ")[0].toUpperCase());
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    //console.log("here");
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("User has been added successfuly  ", { variant });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const sentData = {
      userName: UserNameRef.current.value,
      password: PasswordRef.current.value,
      role: type,
    };
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
      //console.log(sentData);
      axios
        .post("http://localhost:3000/admin/adduser", sentData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-type": "text/json",
          },
        })
        .then((res) => {
          handleClickVariant("success");
        })
        .catch((error) => {
          if (
            +error.message.split(" ")[error.message.split(" ").length - 1] ===
            400
          ) {
            setEmptyUserName(true);
            setWarning("Username already exists");
          }
        });
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={onSubmitHandler}>
        <Card className="flex flex-col space-y-12 justify-center items-center  outline-primaryBlue  p-16  rounded-3xl">
          <div
            class={
              emptyPassword || emptyUserName
                ? "p-4 mt-3 text-red-900 bg-red-50 border rounded-md"
                : "hidden"
            }
          >
            <div class="flex justify-between flex-wrap">
              <div class=" flex-1 flex">
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
          <AddUserToggle onChange={setTypeHandler} />
          <div className="flex flex-col items-center justify-center space-y-9">
            <TextField
              label="Username"
              required="true"
              className="w-[371px]  outline-primaryBlue"
              FieldRef={UserNameRef}
              icon={userIcon}
              admin="true"
              warning={emptyUserName}
            />
            <PasswordField
              label="Password"
              PasswordRef={PasswordRef}
              className="w-[371px]  outline-primaryBlue"
              required="true"
              admin="true"
              warning={emptyPassword}
            />
          </div>
          <SecondaryButton type="submit">Add User</SecondaryButton>
        </Card>
      </form>
      {
        <img
          src={AddUser}
          alt="Add User"
          className="w-[650px] h-[650px] ml-20"
        />
      }
    </div>
  );
}

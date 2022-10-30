import AddUserToggle from "./AddUserToggle";
import Card from "./UI/Card";
import TextField from "@mui/material/TextField";
import SecondaryButton from "./SecondaryButton";
import AddUser from "../Assets/Images/AddUser.svg";
import { useState } from "react";
import axios from "axios";
const addUserReqBody = {
  userName: "",
  password: "",
  role: "Admin",
};

export default function AddUserForm(props) {
  const [type, setType] = useState("Admin");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const setTypeHandler = (e) => {
    addUserReqBody.userType = e.target.value;
    console.log(addUserReqBody);
    setType(e.target.value);
  };

  const setUserNameHandler = (e) => {
    addUserReqBody.UserName = e.target.value;
    console.log(addUserReqBody);
    setUserName(e.target.value);
  };

  const setPasswordHandler = (e) => {
    addUserReqBody.password = e.target.value;
    console.log(addUserReqBody);
    setPassword(e.target.value);
  };

  const onSubmitHandler = () => {
    axios.post("http://localhost:3000/admin/adduser", JSON.stringify(addUserReqBody))
    .then((res) => {
      console.log(res);
    })
  };

  return (
    <div className="flex justify-center items-center ">
      <form>
        <Card className="flex flex-col space-y-12 justify-center items-center  outline-primaryBlue  p-16  rounded-3xl">
          <AddUserToggle onChange={setTypeHandler} />
          <div className="flex flex-col items-center justify-center space-y-9">
            <TextField
              id="outlined-basic"
              label="UserName"
              variant="outlined"
              className="w-[371px] outline-primaryBlue "
              required
              onChange={setUserNameHandler}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="w-[371px]  outline-primaryBlue"
              required
              onChange={setPasswordHandler}
              type="password"
            />
          </div>
          <button
            className={
              "block text-md py-2 pr-4 pl-3 text-white bg-primaryBlue rounded-lg md:px-3 md:text-white hover:bg-darkBlue hover:text-white hover:ease-in-out duration-300 focus:ease-in-out focus:bg-darkBlue focus:text-gray-700 active:text-gray-700"
            }
            onClick={onSubmitHandler}
          >
            Add User
          </button>
        </Card>
      </form>
      <img src={AddUser} alt="Add User" className="w-[650px] h-[650px] ml-20" />
    </div>
  );
}

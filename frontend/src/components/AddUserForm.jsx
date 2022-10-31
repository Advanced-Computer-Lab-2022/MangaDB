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
  role: "ADMIN",
};

export default function AddUserForm(props) {
  const [type, setType] = useState("ADMIN");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const setTypeHandler = (e) => {
    addUserReqBody.role = e.target.value.toUpperCase().split(" ")[0];
    setType(e.target.value);
  };

  const setUserNameHandler = (e) => {
    addUserReqBody.userName = e.target.value;
    setUserName(e.target.value);
  };

  const setPasswordHandler = (e) => {
    addUserReqBody.password = e.target.value;
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/admin/adduser", addUserReqBody)
      .then((res) => {});
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={onSubmitHandler}>
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
          <SecondaryButton
            type="submit"
          >
            Add User
          </SecondaryButton>
        </Card>
      </form>
      <img src={AddUser} alt="Add User" className="w-[650px] h-[650px] ml-20" />
    </div>
  );
}

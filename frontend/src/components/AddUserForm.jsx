import AddUserToggle from "./AddUserToggle";
import Card from "./UI/Card";
import TextField from "@mui/material/TextField";
import SecondaryButton from "./SecondaryButton";

import AddUser from "../Assets/Images/AddUser.svg";

export default function AddUserForm() {
  return (
    <div className="flex justify-center items-center ">
      <Card className="flex flex-col space-y-16 justify-center items-center  outline-primaryBlue w-[500px] h-[500px] pb-7 rounded-3xl">
        <AddUserToggle />
        <div className="flex flex-col items-center justify-center space-y-9">
          <TextField
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            className="w-[371px] outline-primaryBlue "
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="w-[371px]  outline-primaryBlue"
          />
        </div>
        <SecondaryButton text="Add User" />
      </Card>
      <img src={AddUser} alt="Add User" className="w-[750px] h-[750px] ml-20" />
    </div>
  );
}

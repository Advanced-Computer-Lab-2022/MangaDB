import React from "react";
import PrimaryButton from "../PrimaryButton";
import avatar from "../../../Assets/Images/blueAvatar.png";
import { useNavigate } from "react-router-dom";

const ProfileNavBar = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (props.role === "TRAINEE" || props.role === "CORPORATE") {
      navigate("/profileTrainee");
    } else if (props.role === "INSTRUCTOR") {
      navigate("/profileInstructor");
    }
  };

  return (
    <li>
      <PrimaryButton
        onClick={onClickHandler}
        className="flex space-x-4"
      >
        <span className="md:w-10 w-[22px] rounded-full">
          <img src={avatar} alt="" />
        </span>
        <span className="md:hidden">My Profile</span>
      </PrimaryButton>
    </li>
  );
};

export default ProfileNavBar;

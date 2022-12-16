import React from "react";
import PrimaryButton from "../PrimaryButton";
import avatar from "../../../Assets/Images/blueAvatar.png";

const ProfileNavBar = () => {
  return (
    <li>
      <PrimaryButton className="flex space-x-4">
        <span className="md:w-10 w-[22px] rounded-full">
          <img src={avatar} alt="" />
        </span>
        <span className="md:hidden">My Profile</span>
      </PrimaryButton>
    </li>
  );
};

export default ProfileNavBar;

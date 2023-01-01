import React from "react";
import SecondaryButton from "../SecondaryButton";
import { useNavigate } from "react-router-dom";

const SignInNavBar = (props) => {

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/login');
  };

  return (
    <li>
      <SecondaryButton onClick={onClickHandler} text="Sign In" />
    </li>
  );
};

export default SignInNavBar;

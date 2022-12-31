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
      <SecondaryButton onClick={!props.active ? onClickHandler : null} text="Sign In" />
    </li>
  );
};

export default SignInNavBar;

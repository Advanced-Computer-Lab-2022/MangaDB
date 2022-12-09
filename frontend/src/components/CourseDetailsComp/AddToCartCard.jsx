import React from "react";
import SecondaryButton from "../UI/SecondaryButton";
import reactImage from "../../Assets/Images/react.png";
import { useNavigate } from "react-router-dom";

const AddToCartCard = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if(props.userRegister)
    navigate("/courseview/1", { state: props.id });
  };
  return (
    <div className="md:w-4/12 mx-4 md:mx-0 p-4 shadow-lg bg-white rounded-lg space-y-2 md:absolute md:right-4 md:top-32">
      <img src={reactImage} alt="" />
      <SecondaryButton
        onClick={clickHandler}
        text={props.userRegister ? "Go To Course" : "Add To Cart"}
        className="w-full"
      />
    </div>
  );
};

export default AddToCartCard;

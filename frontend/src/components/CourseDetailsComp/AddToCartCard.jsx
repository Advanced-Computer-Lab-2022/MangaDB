import React, { useEffect } from "react";
import { useState, Fragment } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import reactImage from "../../Assets/Images/react.png";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import Divider from "@mui/material/Divider";
import Video from "../Video/Video";
import { useSnackbar } from "notistack";
import axios from "axios";
const AddToCartCard = (props) => {
  const [ModalShown, setModalShown] = useState(false);
  const [buttonState, setButtonState] = useState(true);
  const [buttonText, setButtonText] = useState("Buy Course");
  const hideModalHandler = () => {
    setModalShown(false);
  };
  const showModalHandler = () => {
    setModalShown(true);
  };
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const role = localStorage.getItem("role");
  const handleClickVariant = (variant) => {
    if (variant === "success") {
      enqueueSnackbar("Course has been requested successfuly", { variant });
    }
  };
  useEffect(() => {
    if (role === "TRAINEE") {
      if (props.userRegister) {
        setButtonText("Go To Course");
      }
    } else if (role === "CORPORATE") {
      console.log(props.requested);
      if (!props.requested && !props.userRegister) {
        setButtonText("Request Access");
      } else if (props.userRegister) {
        setButtonText("Go To Course");
      } else {
        setButtonText("Requested");
        setButtonState(false);
      }
    }
  }, [props.requested, props.userRegister]);
  const clickHandler = () => {
    //handle if user is a guest and navigate to login page
    //case 1: Guest -> Buy Course -> navigate to login
    //case 2: Unregistered Corporate Trainee -> Request Access -> feedback course successfully requested
    //case 3: Unregistered Trainee -> Buy Course -> navigate to stripe
    //case 4: Registered User -> Go To Course -> navigate to course view page
    if (!role) {
      navigate("/login");
    } else if (role === "TRAINEE") {
      if (props.userRegister) {
        navigate("/courseview", { state: props.id });
      } else {
        axios
          .post("http://localhost:3000/invoice/".concat(props.id), {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            localStorage.setItem("courseId", props.id);
            window.location.href = res.data.link;
            localStorage.setItem("invoiceId", res.data.invoiceId);
          });
      }
    } else if (role === "CORPORATE") {
      if (!props.requested && !props.userRegister) {
        axios
          .post(
            "http://localhost:3000/request/access",
            {
              courseId: props.id,
              reason: "I want this course",
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            setButtonState(false);
            handleClickVariant("success");
          });
      } else if (props.userRegister) {
        navigate("/courseview", { state: props.id });
      }
    }
  };

  const displayedVideo = (
    <Fragment>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Overview</div>
        <div className="flex justify-end">
          <button
            className="hover:text-red-600 text-xl"
            onClick={hideModalHandler}
          >
            x
          </button>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="py-4">
        <Video
          isVisible={true}
          playing={false}
          link={props.courseOverview}
        ></Video>
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      {ModalShown && <Modal onClick={hideModalHandler}>{displayedVideo}</Modal>}
      <div className="md:w-4/12 relative mx-4 md:mx-0 p-4 shadow-lg bg-white rounded-lg space-y-2 md:absolute md:right-4 md:top-32">
        <img
          onClick={showModalHandler}
          className="cursor-pointer"
          src={reactImage}
          alt=""
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="currentColor"
          class="bi bi-youtube"
          viewBox="0 0 16 16"
          className="absolute left-[45%] top-[37%]  text-white z-10 cursor-pointer"
          onClick={showModalHandler}
        >
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
        </svg>

        <SecondaryButton
          onClick={buttonState ? clickHandler : null}
          text={buttonText}
          className="w-full "
          disabled={!buttonState}
        />
      </div>
    </Fragment>
  );
};

export default AddToCartCard;

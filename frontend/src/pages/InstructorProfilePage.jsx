import { useState, useEffect, useRef, Fragment } from "react";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import PasswordAndPrivacy from "../components/Profile/PasswordAndPrivacy";
import Billing from "../components/Profile/Billing";
import Reviews from "../components/Profile/Reviews/Reviews";
import axios from "axios";
import NavBar from "../components/UI/NavBar/NavBar";

const InstructorProfilePage = () => {
  const [receivedUserInfo, setReceivedUserInfo] = useState({});
  const [selectedStage, setSelectedStage] = useState(1);
  const [render, setRender] = useState(false);
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode") === null
      ? "US"
      : localStorage.getItem("countryCode")
  );

  const managerRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    setRender(true);
    axios
      .get("http://localhost:3000/user/myProfile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReceivedUserInfo(res.data);
        managerRef.current.handleRender();
      });
  }, [render]);

  const changeStageHandler = (newStageName) => {
    if (newStageName === "Profile") {
      setSelectedStage(1);
    } else if (newStageName === "Billing") {
      setSelectedStage(2);
    } else if (newStageName === "Security & Privacy") {
      setSelectedStage(3);
    } else {
      setSelectedStage(4);
    }
  };

  var displayedStep;
  if (selectedStage === 1) {
    displayedStep = (
      <PersonalInfoForm
        email={receivedUserInfo.email}
        firstName={receivedUserInfo.firstName}
        lastName={receivedUserInfo.lastName}
        gender={receivedUserInfo.gender}
        biography={receivedUserInfo.biography}
        changeStageHandler={changeStageHandler}
        ref={managerRef}
      ></PersonalInfoForm>
    );
  } else if (selectedStage === 3) {
    displayedStep = (
      <PasswordAndPrivacy
        changeStageHandler={changeStageHandler}
        selected={receivedUserInfo.emailPrivacy}
      ></PasswordAndPrivacy>
    );
  }
  return (
    <Fragment>
      <NavBar currentTab="Profile" />
      <div>{displayedStep}</div>
    </Fragment>
  );
};
export default InstructorProfilePage;

import { useState, useEffect, useRef, Fragment } from "react";
import PersonalInfoForm from "../components/TraineeProfile/PersonalInfoForm";
import PasswordAndPrivacy from "../components/TraineeProfile/PasswordAndPrivacy";
import Reqests from "../components/TraineeProfile/Requests";
import axios from "axios";
import NavBar from "../components/UI/NavBar/NavBar";

const TraineeProfilePage = () => {
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
  } else {
    displayedStep = <Reqests changeStageHandler={changeStageHandler}></Reqests>;
  }

  const onChangeHandler = (e) => {
    setCountryCode(e);
    localStorage.setItem("countryCode", e);
  };

  return (
    <Fragment>
      <NavBar onChange={onChangeHandler} currentTab="Profile" />
      <div>{displayedStep}</div>
    </Fragment>
  );
};
export default TraineeProfilePage;

import { useState, useEffect } from "react";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import PasswordAndPrivacy from "../components/Profile/PasswordAndPrivacy";
import Billing from "../components/Profile/Billing";
import Reviews from "../components/Profile/Reviews/Reviews";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
//stub for the userPersonal Info Received
const user = {
  email: "test@example.com",
  firstName: "test test",
  lastName: "test2",
  gender: "Male",
  biography: "biography",
  country: "",
  emailPrivacy: {
    name: "Private To You",
    description: "Only I Can See My Email Address",
  },
  payments: [
    {
      id: 1,
      date: "1/1/2020",
      datetime: "2020-01-01",
      description: "Business Plan - Annual Billing",
      amount: "CA$109.00",
      href: "#",
    },
    {
      id: 2,
      date: "21/01/2020",
      datetime: "2020-01-01",
      description: "Business Plan - Annual Billing",
      amount: "CA$109.00",
      href: "#",
    },
    {
      id: 3,
      date: "1/1/2022",
      datetime: "2020-01-01",
      description: "Business Plan - Annual Billing",
      amount: "CA$109.00",
    },
  ],
};
const reviews = [
  {
    id: 1,
    rating: 5,
    content: "This is a really good course ",
    author: "Omar Moataz",
    date: "May 16, 2021",
  },
  {
    id: 2,
    rating: 5,
    content: "This is a really good course ",
    author: "Omar Moataz",
    date: "May 16, 2021",
  },
  {
    id: 3,
    rating: 4.7,
    content: "This is a really good course ",
    author: "Omar Moataz",
    date: "May 16, 2021",
  },
];

const InstructorProfilePage = () => {
  const [receivedUserInfo, setReceivedUserInfo] = useState(user);
  const [selectedStage, setSelectedStage] = useState(1);
  //gather the userInfo
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    //console.log("here");
    enqueueSnackbar("User has been added successfuly  ", { variant });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/instructor/editProfile" ,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'content-type': 'text/json'
}}).then((res) => {
      setReceivedUserInfo(res.data);
    });
  }, []);

  //function to handle submitting changes to the personal info
  const personalInfoSaveHandler = (data) => {
    console.log(data);
    axios
      .patch("http://localhost:3000/user/updateuser", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'text/json'
  
        },
      })
      .then((res) => {});
  };

  //function to handle the change of password or privacy
  const securityChangeHandler = (data) => {
    axios
      .patch("http://localhost:3000/user/updateuser", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'text/json'
        },
      })
      .then((res) => {});
  };

  //function to change/ add credit card information
  const creditCardChangeHandler = (data) => {
    axios
      .post("http://localhost:3000/instructor/", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'text/json'
        },
      })
      .then((res) => {});
  };

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
  const reviewReportHandler = (reviewId) => {
    //sprint 3
    console.log(reviewId);
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
        onSaveHandler={personalInfoSaveHandler}
        changeStageHandler={changeStageHandler}
      ></PersonalInfoForm>
    );
  } else if (selectedStage === 2) {
    displayedStep = (
      <Billing
        changeStageHandler={changeStageHandler}
        onSaveHandler={creditCardChangeHandler}
        payments={receivedUserInfo.payments}
      ></Billing>
    );
  } else if (selectedStage === 3) {
    displayedStep = (
      <PasswordAndPrivacy
        changeStageHandler={changeStageHandler}
        onSaveHandler={securityChangeHandler}
        selected={receivedUserInfo.emailPrivacy}
      ></PasswordAndPrivacy>
    );
  } else {
    displayedStep = (
      <Reviews
        changeStageHandler={changeStageHandler}
        reviewReportHandler={reviewReportHandler}
        reviews={reviews}
      ></Reviews>
    );
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <div>{displayedStep}</div>
    </SnackbarProvider>
  );
};
export default InstructorProfilePage;

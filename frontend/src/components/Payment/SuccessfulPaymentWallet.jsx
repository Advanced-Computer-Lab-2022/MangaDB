import wallet from "../../Assets/Images/wallet.svg";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SuccessfulPaymentWallet() {
  const navigate = useNavigate();

  useEffect(() => {
    //enroll the user with the token with the course in local storage?
    //call endpoint of payment "enroll"
    axios
      .post(
        "http://localhost:3000/user/enroll",
        {
          invoiceId: localStorage.getItem("invoiceId").toString(),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("invoiceId");
        setTimeout(() => {
         
          navigate(`/coursedetails`, { state: { courseId: localStorage.getItem("courseId") } });

          localStorage.removeItem("courseId");
        }, 5000);
      }, []);
  });
  
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center">
        <Alert
          severity="success"
          color="info"
          className="mt-10 sm:w-fit md:w-[50%] md:whitespace-nowrap"
        >
          Your payment has been done from your wallet successfully!
        </Alert>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-400 text-sm font-semibold ">
          You will be redirected to course page shortly
        </p>
        <CircularProgress disableShrink className="mx-5" />
      </div>
      <div className="flex justify-center">
        <img src={wallet} alt="success" className=" w-1/2 md:h-[580px] " />
      </div>
    </div>
  );
}

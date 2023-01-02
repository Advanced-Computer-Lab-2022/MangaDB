import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fail from "../../Assets/Images/fail.svg";
import axios from "axios";

export default function UnsuccessfulPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(
        "http://localhost:3000/invoice/" + localStorage.getItem("invoiceId"),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("invoiceId");
        setTimeout(() => {
          navigate("/courseDetails", {
            state: { courseId: localStorage.getItem("courseId") },
          });
          localStorage.removeItem("courseId");
        }, 5000);
      });
  }, []);
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center">
        <Alert
          severity="error"
          className="mt-10 sm:w-fit md:w-[50%] md:whitespace-nowrap"
        >
          Your payment has been aborted!
        </Alert>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-400 text-sm font-semibold ">
          You will be redirected to home page shortly
        </p>
        <CircularProgress disableShrink className="mx-5" />
      </div>
      <div className="flex justify-center">
        <img src={fail} alt="success" className=" w-1/2 md:h-[580px] " />
      </div>
    </div>
  );
}

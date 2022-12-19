import axios from "axios";
import { useState, useEffect } from "react";
import ReportsRequestsCard from "./ReportsRequestsCard";
import { useSnackbar } from "notistack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LaptopRoundedIcon from "@mui/icons-material/LaptopRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

export default function ReportsRequestsManager(props) {
  const [data, setData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => {
    //console.log("here");
    // variant could be success, error, warning, info, or default
    if(variant === "success")
      enqueueSnackbar("Status has been updated successfuly", { variant });
      else
      enqueueSnackbar("This user already has access to this course", { variant });
  };

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [problemTypeFilter, setProblemTypeFilter] = useState("all");
  const [problemStatusFilter, setProblemStatusFilter] = useState("all");
  const [requestStatusFilter, setRequestStatusFilter] = useState("all");
  const [requestTypeFilter, setRequestTypeFilter] = useState("all");

  const handleChangeProblemTybe = (event, newValue) => {
    setValue1(newValue);
    switch (newValue) {
      case 0:
        setProblemTypeFilter("all");

        break;
      case 1:
        setProblemTypeFilter("financial");
        break;

      case 2:
        setProblemTypeFilter("technical");
        break;

      case 3:
        setProblemTypeFilter("other");
        break;
    }
  };

  const handleChangeProblemStatus = (event, newValue) => {
    setValue2(newValue);
    switch (newValue) {
      case 0:
        setProblemStatusFilter("all");
        break;
      case 1:
        setProblemStatusFilter("resolved");
        break;
      case 2:
        setProblemStatusFilter("pending");
        break;
      case 3:
        setProblemStatusFilter("unseen");
        break;
    }
  };
  const handleChangeRequestType = (event, newValue) => {
    setValue3(newValue);
    switch (newValue) {
      case 0:
        setRequestTypeFilter("all");
        break;
      case 1:
        setRequestTypeFilter("refund");
        break;
      case 2:
        setRequestTypeFilter("access");
        break;
    }
  };
  const handleChangeRequestStatus = (event, newValue) => {
    setValue4(newValue);
    switch (newValue) {
      case 0:
        setRequestStatusFilter("all");
        break;
      case 1:
        setRequestStatusFilter("accepted");
        break;
      case 2:
        setRequestStatusFilter("rejected");
        break;
      case 3:
        setRequestStatusFilter("pending");
        break;
      case 4:
        setRequestStatusFilter("unseen");
        break;
    }
  };

  const firstAction = (problemId) => {
    if (props.type === "problem") {
      axios
        .patch(`http://localhost:3000/problem/${problemId}`, {
          status: "pending",
          seen: "true",
        },{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          handleClickVariant("success");
          getData();
        });
    } else {
      axios
        .patch(`http://localhost:3000/request/access/${problemId}`, {
          status: "accepted",
          //seen: "true",
        },{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          getData();
          handleClickVariant("success");
        })
        .catch((error) => {
          if (
            +error.message.split(" ")[error.message.split(" ").length - 1] ===400
          ) {
            handleClickVariant("error");
          }
        });
    }
  };

  function getData() {
    if (props.type === "problem") {
      axios
        .get("http://localhost:3000/problem",{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:3000/request",{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function secondAction(problemId) {
    if (props.type === "problem") {
      axios
        .patch(`http://localhost:3000/problem/${problemId}`, {
          status: "resolved",
          seen: "true",
        },{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          getData();
          handleClickVariant("success");
        });
    } else {
      axios
        .patch(`http://localhost:3000/request/${problemId}`, {
          status: "rejected",
          seen: "true",
        },{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          getData();
          handleClickVariant("success");
        });
    }
  }

  function thirdAction(problemId) {
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col space-y-4 ">
      {props.type === "problem" ? (
        <div className="flex justify-around  pt-4">
          <Tabs
            value={value1}
            onChange={handleChangeProblemTybe}
            aria-label="icon label tabs example"
            className="flex justify-center"
          >
            <Tab
              icon={<CheckCircleOutlineRoundedIcon />}
              label="ALL"
              className="justify-center"
            />
            <Tab
              icon={<AttachMoneyRoundedIcon />}
              label="FINANCIAL"
              className="justify-center"
            />
            <Tab icon={<LaptopRoundedIcon />} label="TECHNICAL" />
            <Tab icon={<HelpOutlineRoundedIcon />} label="OTHER" />
          </Tabs>
          <Tabs
            value={value2}
            onChange={handleChangeProblemStatus}
            aria-label="icon label tabs example"
            className="flex justify-center"
          >
            <Tab
              icon={<CheckCircleOutlineRoundedIcon />}
              label="ALL"
              className="justify-center active:text-primaryBlue"
            />
            <Tab
              icon={<ThumbUpAltOutlinedIcon />}
              label="RESOLVED"
              className="justify-center"
            />
            <Tab icon={<HourglassEmptyRoundedIcon />} label="PENDING" />
            <Tab icon={<VisibilityOffOutlinedIcon />} label="UNSEEN" />
          </Tabs>
        </div>
      ) : (
        <div className="flex justify-around pt-4">
          <Tabs
            value={value3}
            onChange={handleChangeRequestType}
            aria-label="icon label tabs example"
            className="flex justify-center"
          >
            <Tab
              icon={<CheckCircleOutlineRoundedIcon />}
              label="ALL"
              className="justify-center active:text-primaryBlue"
            />
            <Tab
              icon={<AttachMoneyRoundedIcon />}
              label="COURSE REFUND"
              className="justify-center"
            />
            <Tab icon={<ImportContactsOutlinedIcon />} label="COURSE ACCESS" />
          </Tabs>
          <Tabs
            value={value4}
            onChange={handleChangeRequestStatus}
            aria-label="icon label tabs example"
            className="flex justify-center"
          >
            <Tab
              icon={<CheckCircleOutlineRoundedIcon />}
              label="ALL"
              className="justify-center active:text-primaryBlue"
            />
            <Tab
              icon={<ThumbUpAltOutlinedIcon />}
              label="ACCEPTED"
              className="justify-center"
            />
            <Tab icon={<ThumbDownAltOutlinedIcon />} label="REJECTED" />
            <Tab icon={<HourglassEmptyRoundedIcon />} label="PENDING" />
            <Tab icon={<VisibilityOffOutlinedIcon />} label="UNSEEN" />
          </Tabs>
        </div>
      )}

      <div className="flex justify-around flex-wrap pt-5">
        {data.map((problem) =>
          (props.type === "problem" &&
            (problem.type === problemTypeFilter ||
              problemTypeFilter === "all") &&
            (problem.status === problemStatusFilter ||
              problemStatusFilter === "all")) ||
          (props.type === "request" &&
            (problem.type === requestTypeFilter ||
              requestTypeFilter === "all") &&
            (problem.status === requestStatusFilter ||
              requestStatusFilter === "all")) ? (
            <ReportsRequestsCard
              date={problem.date.split("T")[0]}
              reason={problem.reason}
              type={problem.type}
              status={problem.status}
              description={problem.description}
              firstActionClickHandler={firstAction.bind(null, problem._id)}
              secondActionClickHandler={secondAction.bind(null, problem._id)}
              thirdActionClickHandler={thirdAction.bind(null, problem._id)}
            ></ReportsRequestsCard>
          ) : null
        )}
      </div>
    </div>
  );
}

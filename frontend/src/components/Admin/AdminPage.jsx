import logo from "../../Assets/Images/Logo.svg";
import { useState } from "react";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ReportsRequestsManager from "./ReportsRequestsManager";
import { SnackbarProvider } from "notistack";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminAddNewUser from "../../pages/AdminAddNewUser";
import InstructorCoursesPage from "../../pages/InstructorCoursesPage";

export default function AdminPage() {
  const [isClickedUsers, setIsClickedUsers] = useState(true);
 
  const [isClickedReportedProblems, setIsClickedReportedProblems] =
    useState(false);
  const [isClickedRequests, setIsClickedRequests] = useState(false);
  const [isClickedCourses, setIsClickedCourses] = useState(false);

  return (
    <SnackbarProvider maxSnack={3}>
      <div class="flex">
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        />

        <div class="min-h-screen sticky top-0  flex flex-row ">
          <div class="flex flex-col w-64 bg-white rounded-r-3xl overflow-hidden">
            <div class="flex items-center justify-center h-20 ">
              <div className=" flex items-center font-semibold text-2xl md:mb-0 bg-white">
                <span>
                  <img className="h-10" src={logo} alt="logo" />
                </span>
                <span className="mt-5 opacity-60">evamp</span>
              </div>
            </div>
            <ul class="flex flex-col py-4 space-y-3  sticky bottom-0">
              <button
                className="relative"
                onClick={() => {
                  setIsClickedUsers(true);
                  setIsClickedCourses(false);
                  setIsClickedRequests(false);
                  setIsClickedReportedProblems(false);
                  
                }}
              >
                {isClickedUsers ? (
                  <span className="h-full w-[1%] bg-slate-600 pl-1 ml-1 absolute left-0 rounded-md"></span>
                ) : (
                  ""
                )}
                <a
                  href="#"
                  class={"flex flex-row items-center h-12 transform  transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 ".concat(
                    isClickedUsers
                      ? "translate-x-4 text-gray-800"
                      : "hover:translate-x-2"
                  )}
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg ">
                    <AccountCircleOutlinedIcon className="cursor-pointer" />
                  </span>
                  <span class="text-sm font-medium">Add Users</span>
                </a>
              </button>

              <button
                className="relative"
                onClick={() => {
                  setIsClickedUsers(false);
                  setIsClickedCourses(true);
                  setIsClickedRequests(false);
                  setIsClickedReportedProblems(false);
                }}
              >
                {isClickedCourses ? (
                  <span className="h-full w-[1%] bg-slate-600 pl-1 ml-1 absolute left-0 rounded-md"></span>
                ) : (
                  ""
                )}
                <a
                  href="#"
                  class={"flex flex-row items-center h-12 transform  transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 ".concat(
                    isClickedCourses
                      ? "translate-x-4 text-gray-800"
                      : "hover:translate-x-2"
                  )}
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg ">
                    <SchoolOutlinedIcon className="cursor-pointer" />
                  </span>
                  <span class="text-sm font-medium">Courses</span>
                </a>
              </button>
              <button
                className="relative"
                onClick={() => {
                  setIsClickedUsers(false);
                  setIsClickedCourses(false);
                  setIsClickedRequests(true);
                  setIsClickedReportedProblems(false);
                }}
              >
                {isClickedRequests ? (
                  <span className="h-full w-[1%] bg-slate-600 pl-1 ml-1 absolute left-0 rounded-md"></span>
                ) : (
                  ""
                )}
                <a
                  href="#"
                  class={"flex flex-row items-center h-12 transform  transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 ".concat(
                    isClickedRequests
                      ? "translate-x-4"
                      : "hover:translate-x-2"
                  )}
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg ">
                    <PsychologyAltOutlinedIcon className="cursor-pointer" />
                  </span>
                  <span class="text-sm font-medium">Requests</span>
                </a>
              </button>
              <button
                className="relative"
                onClick={() => {
                  setIsClickedUsers(false);
                  setIsClickedCourses(false);
                  setIsClickedRequests(false);
                  setIsClickedReportedProblems(true);
                }}
              >
                {isClickedReportedProblems ? (
                  <span className="h-full w-[1%] bg-slate-600 pl-1 ml-1 absolute left-0 rounded-md"></span>
                ) : (
                  ""
                )}
                <a
                  href="#"
                  class={"flex flex-row items-center h-12 transform  transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 ".concat(
                    isClickedReportedProblems
                      ? "translate-x-4 text-gray-800"
                      : "hover:translate-x-2"
                  )}
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg ">
                    <ReportProblemOutlinedIcon className="" />
                  </span>
                  <span class="text-sm font-medium">Reported Problems</span>
                </a>
              </button>
              
            </ul>
          </div>
        </div>
        {isClickedReportedProblems ? (
          <ReportsRequestsManager type="problem" />
        ) : (
          ""
        )}
        {isClickedRequests ? (
          <ReportsRequestsManager type="request" />
        ) : (
          ""
        )}
        {isClickedUsers ? <div className="flex justify-center"><AdminAddNewUser /></div> : ""}
        {isClickedCourses ? <div className=""><InstructorCoursesPage></InstructorCoursesPage></div> : ""}
      </div>
    </SnackbarProvider>
  );
}

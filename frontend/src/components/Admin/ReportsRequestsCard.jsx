import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
export default function ReportsRequestsCard(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div class={"p-2 w-[100%] relative ".concat(props.className)}>
      <div
        class={"bg-white p-4 shadow-lg rounded-lg flex  items-center ".concat(
          props.reason ? "pt-10" : ""
        )}
      >
        <div>
          <div class="flex relative">
            <div className="p-2 w-full ">
              <div className="flex justify-between whitespace-nowrap">
                <h4 class="text-base font-semibold text-gray-700">
                  {props.userName?props.userName:""}
                </h4>
                <p class="text-gray-400 text-sm font-semibold ml-4">{props.date}</p>
              </div>
              <p class="text-gray-400 text-sm">
                {props.courseName?"Course: " + props.courseName:""}
              </p>
              {props.description ? (
                <p class="text-gray-400 text-sm">type: {props.type}</p>
              ) : (
                ""
              )}
              <p class="text-gray-400 text-sm">Status: {props.status}</p>
            </div>
            <span className="h-full w-[1px] absolute right-0 bg-slate-300"></span>
          </div>
        </div>
        <div className="relative">
          <p className="text-sm opacity-60 whitespace-normal   p-4">
            {props.description} {props.reason}
          </p>
        </div>
        <div className="absolute right-5">
          <div className="justify-end relative">
            {props.type === "access" ? (
              <div className="absolute bottom-14 right-2 bg-primaryBlue  rounded-full font-normal text-sm px-4 py-1 whitespace-nowrap">
                Course access
              </div>
            ) : (
              ""
            )}
            {props.type === "refund" ? (
              <div className="absolute bottom-14 right-2 bg-red-500  rounded-full font-normal text-sm px-4 py-1 whitespace-nowrap">
                Course refund
              </div>
            ) : (
              ""
            )}
            <span className="h-full w-[1px] absolute top-0 left-0 bg-slate-300 "></span>
            <button
              aria-describedby={id}
              onClick={handleClick}
              className={"rounded-full ".concat(props.alreadyHandled ?"opacity-50 cursor-default":"hover:bg-gray-50 ease-in-out duration-300 active:opacity-75 cursor-pointer p-2")}
            >
              <MoreVertIcon className=" opacity-50 " />
            </button >
            <Popover
              id={id}
              open={open && !props.alreadyHandled}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }} className="flex flex-col rounded-2xl ">
                <div className="hover:bg-slate-200 rounded-lg active:opacity-70">
                  <button
                    onClick={props.firstActionClickHandler}
                    className=" mx-10 whitespace-nowrap pb-1"
                  >
                    {props.description ? "Mark as pending" : "Accept Request"}
                  </button>
                </div>
                <div className="hover:bg-slate-200 rounded-lg">
                  <button
                    onClick={props.secondActionClickHandler}
                    className=" mx-10 whitespace-nowrap pb-1"
                  >
                    {props.description ? "Mark as resolved" : "Reject Request"}
                  </button>
                </div>
                {!props.description ? (
                  <div className="hover:bg-slate-200 rounded-lg">
                    <button
                      onClick={props.thirdActionClickHandler}
                      className=" mx-10 whitespace-nowrap pb-1"
                    >
                      Pend request
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </Typography>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

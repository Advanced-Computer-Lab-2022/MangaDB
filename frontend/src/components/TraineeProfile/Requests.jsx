import { Fragment, useEffect, useState } from "react";
import { Disclosure, RadioGroup } from "@headlessui/react";
import axios from "axios";
import {
  KeyIcon,
  UserCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import RequestItem from "../CourseView/RequestItem";
const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: false },
  { name: "Security & Privacy", icon: KeyIcon, current: false },
  { name: "Requests", icon: ExclamationIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Requests = (props) => {
const[requests, setRequests] = useState([]);
const userId="63a41b632334fd21e6fab392";


  useEffect(() => {
    axios.get("http://localhost:3000/request").then((res) => {
      console.log(res.data[0].status);
      /*
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i].user === userId){
          setRequests([...requests, res.data[i]]);
        }
      }
      */
      setRequests(res.data);
    });
  }, []);
  return (
    <div>
      <Disclosure
        as="div"
        className="relative bg-sky-700 pb-32 overflow-hidden"
      >
        {({ open }) => (
          <Fragment>
            <div
              aria-hidden="true"
              className={classNames(
                open ? "bottom-0" : "inset-y-0",
                "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#0a527b" }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#065d8c" }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#0369a1"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#065d8c"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#0a527b"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#0a4f76"
                  />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header>
          </Fragment>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <div className="space-y-1">
                  {subNavigation.map((item) => (
                    <div
                      key={item.name}
                      onClick={props.changeStageHandler.bind(null, item.name)}
                      className={classNames(
                        item.current
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-teal-500 group-hover:text-teal-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <form className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                      Requests
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This information is related to your refund & access
                      requests.
                    </p>
                  </div>
                </div>
                {requests.map((request) => {
                  return <div className="mt-2"><RequestItem status={request.status} date={request.date.split("T")[0]} type={request.type} courseName={request.courseName}></RequestItem></div>
                })}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Requests;
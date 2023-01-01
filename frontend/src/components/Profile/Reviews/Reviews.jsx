import { Fragment, useState } from "react";
import AverageSummary from "./AverageSummary";
import ReviewsTable from "./ReviewsTable";
import { Disclosure } from "@headlessui/react";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  StarIcon,
} from "@heroicons/react/outline";

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: false },
  { name: "Billing", icon: CreditCardIcon, current: false },
  { name: "Security & Privacy", icon: KeyIcon, current: false },
  { name: "Reviews & Ratings", icon: StarIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Reviews = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
    const saveData = {};
    props.onSaveHandler(saveData);
  };
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
                  {subNavigation.map((item, index) => (
                    <div
                      key={item.name}
                        onClick={props.changeStageHandler.bind(null,item.name)}
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

              <form
                className="divide-y divide-gray-200 lg:col-span-9"
                onSubmit={onSaveHandler}
              >
                {/* Personal Information section */}
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  {/* <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div> */}
                  <div className="mt-2 flex items-center">
                    <div className="col-span-12 sm:col-span-6 flex items-center">
                      <div className="lg:col-span-4">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                          Average Ratings
                        </h2>
                        <div className="mt-3"><AverageSummary></AverageSummary></div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      Student Reviews
                    </h2>
                  </div>
                  <ReviewsTable reviews={props.reviews}></ReviewsTable>
                </div>
             
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Reviews;

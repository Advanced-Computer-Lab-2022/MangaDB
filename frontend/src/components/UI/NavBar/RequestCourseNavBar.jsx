import React from "react";
import PrimaryButton from "../PrimaryButton";

const RequestCourseNavBar = (props) => {
  return (
    <li>
      <PrimaryButton className={`flex space-x-4 ${props.active ? 'underline decoration-primaryBlue font-medium decoration-4 underline-offset-8' : 'no-underline'}`}>
        <span className={`${props.search ? "xl:hidden" : "md:hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-cart"
          >
            <rect width="256" height="256" fill="none" />
            <circle
              cx="68"
              cy="188"
              r="28"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
              class="bi bi-cart"
            />
            <circle
              cx="68"
              cy="68"
              r="28"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
            />
            <line
              x1="68"
              x2="68"
              y1="96"
              y2="160"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
            />
            <circle
              cx="188.002"
              cy="188"
              r="28"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
              d="M188.00244,160l-.00163-40.11889a48,48,0,0,0-14.05888-33.93918L136,48"
            />
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
              points="136 88 136 48 176 48"
            />
          </svg>
        </span>
        <span>Request Course</span>
      </PrimaryButton>
    </li>
  );
};

export default RequestCourseNavBar;

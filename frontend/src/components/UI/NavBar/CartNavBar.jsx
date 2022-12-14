import React from "react";
import PrimaryButton from "../PrimaryButton";

const CartNavBar = (props) => {
  return (
    <li>
      <PrimaryButton className={`flex space-x-4 ${props.active ? 'underline decoration-primaryBlue font-medium decoration-4 underline-offset-8' : 'no-underline'}`}>
        <span className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {props.active && <div className="md:w-[30px] md:h-1 md:bg-primaryBlue md:absolute md:top-6 md:-left-1"></div>}
        </span>
        <span className="md:hidden">Cart</span>
      </PrimaryButton>
    </li>
  );
};

export default CartNavBar;

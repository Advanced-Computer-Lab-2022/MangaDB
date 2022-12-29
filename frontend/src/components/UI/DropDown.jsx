import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import PrimaryButton from "./PrimaryButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropDown = (props) => {
  const clickHandler = (event) => {
    //show promotion modal
    if (event.target.innerHTML === "Add Promotion") {
      props.openPromotion();
    } else if (event.target.innerHTML === "Report a Problem") {
      //handle the report
      props.openReport();
    } else {
      //handle the view course
      //navigate to course view
    }
  };

  var count = 0;

  const menuItems = props.items.map((menuItem) => {
    count++;
    return (
      <Menu.Item onClick={clickHandler}>
        {({ active }) => (
          <p
            className={classNames(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block px-4 py-2 text-sm hover:cursor-pointer"
            )}
          >
            {menuItem}
          </p>
        )}
      </Menu.Item>
    );
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center">
          <PrimaryButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill={`${props.fill}`}
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </PrimaryButton>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right z-20 absolute right-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{menuItems}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDown;

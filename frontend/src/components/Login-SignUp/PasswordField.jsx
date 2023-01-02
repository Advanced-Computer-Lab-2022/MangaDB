import { useState } from "react";
import { EyeIcon } from "@heroicons/react/solid";
import { EyeOffIcon } from "@heroicons/react/solid";

export default function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label for={props.label}>
        <p class="font-medium text-slate-700 pb-2">{props.label} *</p>
        <div className="relative">
          <input
            ref={props.PasswordRef}
            type={showPassword ? "text" : "password"}
            className={" py-3 border border-slate-200 pl-12 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow ".concat(
              (props.warning ? " border-red-200 " : "").concat(props.admin?"w-[371px]":"w-full")
              

            )}
            placeholder={props.label}
          />

          {showPassword ? (
            <EyeOffIcon
              className="w-6 h-6 opacity-50 absolute top-[25%] left-[90%] hover:cursor-pointer"
              onClick={toggleShowPasswordHandler}
            ></EyeOffIcon>
          ) : (
            <EyeIcon
              className="w-6 h-6 opacity-50 absolute top-[25%] left-[90%] hover:cursor-pointer"
              onClick={toggleShowPasswordHandler}
            ></EyeIcon>
          )}
        </div>
      </label>
      <div class="absolute bottom-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 ml-3 text-gray-400 p-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
        </svg>
      </div>
    </div>
  );
}

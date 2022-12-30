import PrimaryButton from "../PrimaryButton";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutNavBAr(props) {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .post("http://localhost:3000/user/logout", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "content-type": "text/json",
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(localStorage.getItem("token"));
      });

    //navigate("/");
  };
  return (
    <li>
      <PrimaryButton
        className={`flex space-x-4 ${
          props.active
            ? "underline decoration-primaryBlue font-medium decoration-4 underline-offset-8"
            : "no-underline"
        }`}
        onClick={logoutHandler}
      >
        <span className="relative">
          <LogoutIcon />
          {props.active && (
            <div className="md:w-[30px] md:h-1 md:bg-primaryBlue md:absolute md:top-6 md:-left-1"></div>
          )}
        </span>
        <span className="md:hidden">Logout</span>
      </PrimaryButton>
    </li>
  );
}

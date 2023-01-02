import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import PrimaryButton from "../UI/PrimaryButton";
import { useNavigate } from "react-router-dom";

const TraineeWallet = (props) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [balance, setBalance] = useState(0);
  const [symbol, setSymbol] = useState("$");
  //handle the mouseOver and mouseLeave functions..
  const hoverHandler = (e) => {
    axios
    .get("http://localhost:3000/user/wallet" + "?CC=" + localStorage.getItem("countryCode") ,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setBalance(+res.data.wallet)
      setSymbol(res.data.symbol)
    });    setHovered(true);
  };
  const leaveHandler = (e) => {
    setHovered(false);
  };

  const onClickHandler = () => {
    navigate('/myWallet');
  };

  const content = (
    <p>
      Your Current Balance is
      <p className="text-green-400">
        {balance} {symbol}
      </p>
    </p>
  );
  return (
    <li
      onMouseOver={localStorage.getItem("role") === "TRAINEE" ? hoverHandler : null}
      onMouseLeave={localStorage.getItem("role") === "TRAINEE" ? leaveHandler : null}
      className="w-fit"
    >
      <PrimaryButton onClick={localStorage.getItem("role") === "INSTRUCTOR" ? onClickHandler : null}
        className={`flex space-x-4 ${
          props.active
            ? "underline decoration-primaryBlue font-medium decoration-4 underline-offset-8"
            : "no-underline"
        }`}
      >
        <span className="relative">
          <Tooltip
            open={hovered}
            placement="bottom"
            className="text-black border-md text-center p-4 border-white bg-white text-sm font-semibold"
            content={content}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
          </Tooltip>
          {props.active && (
            <div className="md:w-[30px] md:h-1 md:bg-primaryBlue md:absolute md:top-8 md:-left-0"></div>
          )}
        </span>
        <span className="md:hidden mt-1">Wallet</span>
      </PrimaryButton>
    </li>
  );
};
export default TraineeWallet;

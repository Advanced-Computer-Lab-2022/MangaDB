import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
const TraineeWallet = (props) => {
  const [hovered, setHovered] = useState(false);
  const [balance, setBalance] = useState(300);
  const [symbol, setSymbol] = useState("$");
  //handle the mouseOver and mouseLeave functions..
  const hoverHandler = (e) => {
    //endpoint here..
    setHovered(true);
  };
  const leaveHandler = (e) => {
    setHovered(false);
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
    <div
      onMouseOver={hoverHandler}
      onMouseLeave={leaveHandler}
      className="w-fit"
    >
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
    </div>
  );
};
export default TraineeWallet;

import React from "react";
import homeImage from "../Assets/Images/HomePage.svg";
import Search from "../components/Search";

const HomePage = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center p-24">
        <div className="text-5xl leading-[70px] uppercase tracking-widest font-semibold max-w-2xl">
          <p>
            Learn at the comfort of your own{" "}
            <span className="text-primaryBlue">home</span>
          </p>
        </div>
        <div className="">
          <img className="w-96" src={homeImage} />
        </div>
      </div>
      <div className="justify-center max-w-6xl">
        <Search />
      </div>
    </div>
  );
};
export default HomePage;

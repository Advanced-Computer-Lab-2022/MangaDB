import React from "react";
import homeImage from "../Assets/Images/HomePage.svg";
import Search from "../components/Search";
import Animate from "react-smooth/lib/Animate"

const HomePage = () => {
  return (
    <Animate to="1" from="0" attributeName="opacity">
    <div className="">
      <div className="md:flex justify-center items-center md:p-24 p-10">
      <div className="block md:hidden p-10">
          <img className="w-96" src={homeImage} />
        </div>
        <div className="md:text-5xl text-4xl md:leading-[70px] leading-[50px] md:text-left text-center uppercase tracking-widest font-semibold max-w-2xl">
          <p>
            Learn at the comfort of your own{" "}
            <span className="text-primaryBlue">home</span>
          </p>
        </div>
        <div className="md:block hidden">
          <img className="w-96" src={homeImage} />
        </div>
      </div>
      <div className="justify-center max-w-6xl pl-[16%]">
        <Search className="absolute" />
      </div>
    </div>
    </Animate>
  );
};
export default HomePage;

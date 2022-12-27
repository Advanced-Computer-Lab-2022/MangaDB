import React from "react";
import homeImage from "../Assets/Images/HomePage.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Animate from "react-smooth/lib/Animate";
import NavBar from "../components/UI/NavBar/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CourseCard from "../components/Course/CourseCard";
import SearchBar from "../components/UI/Search/SearchBar";
import Cloud from "../components/HomeComponents/Cloud";
import Testomonial from "../components/HomeComponents/Testomonial";
import Incentives from "../components/HomeComponents/Incentives";
import { useLocation } from "react-router-dom";
const HomePage = () => {
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [discountedCourses, setDiscountedCourses] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const location = useLocation();
  const appear = {
    opacity: 0,
    transition: {
      duration: 1,
      yoyo: Infinity,
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/course/mostviewed/?CC=".concat(countryCode))
      .then((res) => {
        setDisplayedCourses(res.data.courses);
        setCurrencySymbol(res.data.symbol);
      });

    axios.get("http://localhost:3000/course/discountedcourses/").then((res) => {
      console.log(res.data);
      setDiscountedCourses(res.data);
    });
  }, [countryCode]);

  //should handle the catch with error state
  const onChangeHandler = (e) => {
    console.log(e);
    setCountryCode(e);
  };
  const courses = displayedCourses.map((course) => {
    return (
      <CourseCard
        id={course._id}
        userId={location.state}
        duration={course.totalMins}
        title={course.courseTitle}
        instructorName={course.instructorName}
        subject={course.subject}
        level={course.level}
        coursePrice={course.coursePrice}
        discountedPrice={course.discountedPrice}
        discount={course.discount}
        rating={course.rating}
        currencySymbol={currencySymbol}
      ></CourseCard>
    );
  });
  const displayedDiscountedCourses = discountedCourses.map((course) => {
    return (
      <CourseCard
        id={course._id}
        userId={location.state}
        duration={course.totalMins}
        title={course.courseTitle}
        instructorName={course.instructorName}
        subject={course.subject}
        level={course.level}
        coursePrice={course.coursePrice}
        discountedPrice={course.discountedPrice}
        discount={course.discount}
        rating={course.rating}
        currencySymbol={currencySymbol}
      ></CourseCard>
    );
  });
  return (
    <Animate to="1" from="0" attributeName="opacity">
      <div data-carousel> </div>
      <NavBar onChange={onChangeHandler}></NavBar>
      <div className="">
        <div className="md:flex justify-center items-center md:p-24 p-10">
          <div className="block md:hidden p-10">
            <img className="w-96" src={homeImage} alt="" />
          </div>
          <div className="md:text-5xl text-4xl md:leading-[70px] leading-[50px] md:text-left text-center uppercase tracking-widest font-semibold max-w-2xl">
            <p>
              Learn at the comfort of your own{" "}
              <span className="text-primaryBlue">home</span>
              <motion.span initial={{ opacity: 1 }} animate={appear}>
                ...
              </motion.span>
            </p>
          </div>
          <div className="md:block hidden">
            <img className="w-96" src={homeImage} alt="" />
          </div>
        </div>
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <div className="mt-12">
          <Cloud></Cloud>
        </div>
        <Testomonial></Testomonial>
        <Incentives></Incentives>
        <div className="font-bold text-2xl mt-8 mb-4 flex justify-start mx-12 w-max">
          Most Popular:
        </div>
        <Carousel
          rewind={true}
          pauseOnHover
          infinite
          autoPlaySpeed={1500}
          autoPlay={true}
          rewindWithAnimation={true}
          itemClass="ml-3"
          draggable={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1240,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: {
                max: 1239,
                min: 850,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: {
                max: 849,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {courses}
        </Carousel>
        <div className="font-bold text-2xl mt-8 mb-4 flex justify-start mx-12 w-max">
          On Sale Right Now!  
        </div>
        <Carousel
          rewind={true}
          pauseOnHover
          infinite
          autoPlaySpeed={1500}
          autoPlay={true}
          rewindWithAnimation={true}
          itemClass="ml-3"
          draggable={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1240,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: {
                max: 1239,
                min: 850,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: {
                max: 849,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {displayedDiscountedCourses}
        </Carousel>
      </div>
    </Animate>
  );
};
export default HomePage;

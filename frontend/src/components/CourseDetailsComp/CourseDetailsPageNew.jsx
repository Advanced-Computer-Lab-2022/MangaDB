import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBar from "../NavBar";
import CourseDetailsCard from "./CourseDetailsCard";
import axios from "axios";
import AddToCartCard from "./AddToCartCard";
import CourseContent from "./CourseContent";

const courseId = "637602ccaf6170543959970d";

const CourseDetailsPageNew = (props) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3000/course/".concat(courseId)).then((res) => {
      setCourseDetails(res.data.course);
      setLoaded(true);
      console.log(res.data.course);
    });
  }, []);

  var requirements = [];

  if (loaded) {
    requirements = courseDetails.requirements.map((requirement) => {
      return <li>{requirement}</li>;
    });
  }
  return (
    <Fragment>
      <NavBar />
      <div className="bg-veryLightBlue py-4 px-6 flex justify-between">
        <CourseDetailsCard
          courseTitle={courseDetails.courseTitle}
          level={courseDetails.level}
          instructorName={courseDetails.instructorName}
          subject={courseDetails.subject}
          courseDescription={courseDetails.courseDescription}
          rating={courseDetails.rating}
          discount={courseDetails.discount}
          coursePrice={courseDetails.coursePrice}
          discountedPrice={courseDetails.discountedPrice}
          currencySymbol="$"
        />
        <AddToCartCard courseImage={courseDetails.courseImage} />
      </div>
      <div className="text-xl font-semibold py-4 mx-10 w-7/12">
        <div className="mb-3">Course Summary</div>
        {/* <div className="ml-10 align-middle">{props.courseSummary}</div> */}
        <div className="ml-10 align-middle font-normal">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          corporis numquam ullam asperiores. Voluptate, repellat tempora officia
          quo quos amet nam sint, quas et facere suscipit praesentium atque a
          libero! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Cupiditate, cumque. Optio maiores consectetur reiciendis similique,
          minima ducimus delectus molestiae eum officia corrupti distinctio
          dignissimos asperiores culpa odio doloribus quia nesciunt?
        </div>
      </div>
      {loaded && (
        <CourseContent
          content={courseDetails.subtitles}
          courseDuration={courseDetails.totalHours}
        />
      )}
      <div className="text-xl font-semibold py-4 mx-10 w-7/12">
        <div className="mb-3">Course Requirements</div>
        <ul className="list-disc font-normal sm:grid sm:grid-cols-2 ml-10 align-middle">
          {requirements.length !== 0 && requirements}
        </ul>
      </div>
    </Fragment>
  );
};

export default CourseDetailsPageNew;

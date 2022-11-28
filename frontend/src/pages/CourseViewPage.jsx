import { useState, useEffect, Fragment } from "react";
import Video from "../components/Video/Video";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import NavBar from "../components/NavBar";
import axios from "axios";

const CourseViewPage = () => {
  //will give the backend the id of the clicked course , then will fetch all the details about that course
  //to fill the subtitle accodion and create an onClick function to change the link of the video playing.
  //at the buttom of the video frame will have a notes trigger which will create a text box at the buttom
  //at the top below the navbar will have a div with the progress and view notes  and some extra controls..
  
  //this page will handle the viewed sources and solving exams and notes areas..
  

  const [viewedLink, setViewedLink] = useState("https://youtu.be/BgP30ML_Tc0");
  const linkChangeHandler = (link) => {
    setViewedLink(link);
  };

  //stub
  var test = [
    {
      description: "this is subtitle1",
      subtitleDuration: "20",
      sources: [
        {
          sourceType: "Video",
          description: "this is Source1",
          link: "https://youtu.be/BgP30ML_Tc0",
        },
        {
          sourceType: "Video",
          description: "this is Source2",
          link: "https://www.youtube.com/watch?v=oAAp3vywa2E",
        },
        {
          sourceType: "Video",
          description: "this is Source3",
          link: "https://www.youtube.com/watch?v=vHuSz4fRM88",
        },
      ],
    },
    {
      description: "this is subtitle2",
      subtitleDuration: "30",
      sources: [
        {
          sourceType: "Video",
          description: "this is Source3",
          link: "https://www.youtube.com/watch?v=KZCsisctSso",
        },
        {
          sourceType: "Video",
          description: "this is Source4",
          link: "https://www.youtube.com/watch?v=07_5PQHCSiM",
        },
        {
          sourceType: "Video",
          description: "this is Source5",
          link: "https://www.youtube.com/watch?v=G1RtAmI0-vc",
        },
      ],
    },
  ];

  return (
    <Fragment>
      <NavBar></NavBar>
      <div classname="Controls progr etc h-8 border-1"> test</div>
      <div className="flex">
        <div className="video frame border-2 ">
          <Video
            height={450}
            width={700}
            isVisible={true}
            link={viewedLink}
          ></Video>
        </div>
          <CourseContent
            courseDuration="35"
            content={test}
            onClick={linkChangeHandler}
          ></CourseContent>
      </div>
      <div className="subtitles"></div>
    </Fragment>
  );
};
export default CourseViewPage;

import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import CourseDetailsCard from "../components/Course/CourseDetailsCard";
import Stars from "../components/UI/Stars";
import Subtitle from "../components/CourseSubtitles/Subtitle";
import SecondaryButton from "../components/SecondaryButton";
import courseImage from "../Assets/Images/react.png";
import NavBar from "../components/NavBar";

const courseId = "635bf4ca56673b3f80ac2e02";

const size = 3;

const sources = [
  { title: "title1" },
  { title: "title2" },
  { title: "title3" },
  { title: "title4" },
];

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];

const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CourseDetailsPage = (props) => {
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/course/".concat(courseId)).then((res) => {
      setCourseDetails(res.data.course);
    });
  }, []);

  console.log(courseDetails);
  /*
  const mapSubtitleToLessons = (subtitle) => {
    var lessons = [];
    lessons = subtitle.sources.map((lesson) => 
    {title:lesson.description}
    );
    return lessons;
  };
*/
  var lessons;
  var courseSubtitles;
  if (courseDetails.subtitles) {
    courseSubtitles = courseDetails.subtitles.map((courseSubtitle) => (
      <Subtitle
        sources={courseSubtitle.sources}
        exercises={courseSubtitle.exercises}
        subtitleHeader={courseSubtitle.subtitle}
      />
    ));
  }

  return (
    <Fragment>
      <NavBar />
      <div className="min-h-full">
        <main className="">
          {/* Page header */}
          <div className="bg-lightBlue py-14 h-full w-full mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 ">
            <CourseDetailsCard {...courseDetails} level="Advanced" />
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <section aria-labelledby="description-title">
                <h1 className="text-xl font-bold text-gray-900">Description</h1>
                <div className="mt-4 text-md font-medium text-gray-900">
                  {courseDetails.courseDescription}
                </div>
              </section>

              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-300">
                    <div className="bg-gray-100 px-4 py-5 sm:px-6 flex items-center ">
                      <h2
                        id="notes-title"
                        className="text-lg font-bold text-gray-900 flex-1"
                      >
                        Course Content
                      </h2>
                      <div className="flex justify-items-end ">
                        <h2 className="shadow-lg  rounded-full p-2 ">
                          {courseDetails.totalHours} hours
                        </h2>
                      </div>
                    </div>
                    <div className="ml-4 px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {courseSubtitles}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-300">
                    <div className="bg-gray-100 px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-bold text-gray-900"
                      >
                        Reviews
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {comments.map((comment) => (
                          <li key={comment.id}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-base">
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {comment.name}
                                  </a>
                                </div>
                                <Stars size={size} />
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{comment.body}</p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">
                                    {comment.date}
                                  </span>{" "}
                                  {/* <span className="text-gray-500 font-medium">
                                  &middot;
                                </span>{" "} */}
                                  {/* <button
                                  type="button"
                                  className="text-gray-900 font-medium"
                                >
                                  Reply
                                </button> */}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <form action="#">
                        <div>
                          <label htmlFor="comment" className="sr-only">
                            About
                          </label>
                          <textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Add a note"
                            defaultValue={""}
                          />
                        </div>
                        <div className="mt-3 flex justify-end">
                          <SecondaryButton text="comment" type="submit" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div> */}
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="fixed top-32 right-4 lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 ">
                {/* Activity Feed */}
                <div className="flow-root w-[450px]">
                  <img src={courseImage} />
                </div>
                <div className="mt-6 flex flex-col justify-stretch">
                  <SecondaryButton text="Add to Cart" />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default CourseDetailsPage;

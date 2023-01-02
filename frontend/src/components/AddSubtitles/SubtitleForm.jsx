import { Fragment, useRef, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";

const SubtitleForm = (props) => {
  const titleRef = useRef();
  const videoRef = useRef();
  const descriptionRef = useRef();

  const [emptySectionTitle, setEmptySectionTitle] = useState(false);
  const [validVideoURL, setValidVideoURL] = useState(true);
  const [warning, setWarning] = useState("");
  function isYoutubeURL(str) {
    var p =
      /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return str.match(p);
  }
  function handleFormValidation() {
    var isValidForm = true;
    if (titleRef.current.value === "") {
      setEmptySectionTitle(true);
      setWarning("please fill the following fields");
      isValidForm = false;
    } else {
      setEmptySectionTitle(false);
      
    }
    if (!isYoutubeURL(videoRef.current.value) && videoRef.current.value !== "") {
      setValidVideoURL(false);
      setWarning("please enter a valid youtube url");
      isValidForm = false;
    } else {
      setValidVideoURL(true);
      
    }

    return isValidForm;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const videoURL = videoRef.current.value;
    const description = descriptionRef.current.value;
    const subtitleData = {
      title: title,
      videoURL: videoURL,
      description: description,
    };
    if (handleFormValidation()) {
      props.onConfirm(subtitleData);
    } else {
      return;
    }
  };
  return (
    <Fragment>
      <div className="grid grid-cols-3 mt-4">
        <div>
          <div
            class={
              emptySectionTitle || !validVideoURL
                ? "p-4 my-3 text-red-900 bg-red-50 border rounded-md "
                : "hidden"
            }
          >
            <div class="flex justify-between flex-wrap">
              <div class="w-0 flex-1 flex">
                <div class="mr-3 pt-1">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-md mt-[5px] leading-6 font-medium">
                    {warning}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-xl font-semibold">
          Section-Info
        </div>
        <div className="flex justify-end font-bold">
          <button
            onClick={props.onCancel}
            className={"hover:text-red-600 text-xl "}
          >
            x
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <div className="space-y-4">
            <div className="first control">
              <label className="block" htmlFor="section-title">
                Section Title <span className="text-red-600"> *</span>
              </label>
              <input
                ref={titleRef}
                id="section-title"
                className={"w-full mt-1 px-3 py-1 bg-white border  rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  emptySectionTitle ? "border-red-200" : "border-slate-300"
                )}
              />
            </div>
            <div className="second control">
              <label className="block" htmlFor="video-URL">
                Video URL (optional)
              </label>
              <input
                ref={videoRef}
                id="video_URL"
                className={"w-full mt-1 px-3 py-1 bg-white border  rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  !validVideoURL ? "border-red-200" : "border-slate-300"
                )}
              />
            </div>
            <div className="third-control">
              <label className="block" htmlFor="short-description">
                Short Description (optional)
              </label>
              <textarea
                ref={descriptionRef}
                id="short-description"
                className="w-full h-28 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              />
            </div>
            <div className="controls flex justify-end">
              <PrimaryButton
                className=" rounded-md  "
                text="Confirm"
                type="submit"
              ></PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default SubtitleForm;

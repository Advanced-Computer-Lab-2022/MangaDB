import { useRef } from "react";
import SecondaryButton from "../SecondaryButton";
import CustomInputField from "../UI/CustomInputField";

const CreateCourseForm = (props) => {
  const titleRef = useRef();
  const subjectRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    var data = {
      courseTitle: titleRef.current.value,
      courseDescription: descriptionRef.current.value,
      //courseSubject : subjectRef.current.value,
      courseImage: imgRef.current.value,
      coursePrice: +priceRef.current.value,
    };
    props.onSave(data);
  };
  return (
    <div className="flex space-x-[16%] h-full justify-center items-center pt-[5%]">
      <form onSubmit={submitHandler} className=" align-middle  rounded-lg ">
        <div className="flex flex-col space-y-5 h-fit py-5   outline-primaryBlue w-[500px]   rounded-5xl">
          <div className="flex flex-col justify-center items-center space-y-5 pr-5">
            <div>
                <input
                ref={titleRef}
                id="course-title"
                label="Course Title"
              />
            </div>
            <div>
                <input
                ref={subjectRef}
                id="course-subject"
                label="Course Subject"
                required
              />
            </div>
            <div>
              <input
                ref={descriptionRef}
                id="course-description"
                label="Course Description"
                required
              />
            </div>
            <div>
              <input
                ref={imgRef}
                id="course-image"
                label="Course Image URL"
              />
            </div>
            <div>
              <input
                ref={priceRef}
                id="course-price"
                label="Course Price"
                required
              />
            </div>
          </div>
          <div className="form-controls flex justify-end pr-10">
            <SecondaryButton type="submit" text="Save"></SecondaryButton>
          </div>
          {/* requirements */}
        </div>
      </form>
      {/* <img src={fillForm} alt="fill form" className="w-1/3 h-1/3 align-middle sm:invisible md:visible" /> */}
    </div>
  );
};
export default CreateCourseForm;

import SecondaryButton from "../SecondaryButton";
import CustomInputField from "../UI/CustomInputField";
import Card from "../UI/Card";
import fillForm from "../../Assets/Images/fillForm.svg";

const CreateCourseForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    //some logic
  };
  return (
    <div className="flex space-x-[16%] h-full justify-center items-center pt-[5%]">
    <form onSubmit={submitHandler} className=" align-middle  rounded-lg ">
      <div className="flex flex-col space-y-5 h-fit py-5   outline-primaryBlue w-[500px]   rounded-5xl">
        <div className="flex flex-col justify-center items-center space-y-5 pr-5">
          <div>
            <CustomInputField id="course-title" label="Course Title" />
          </div>
          <div>
            <CustomInputField
              id="course-subject"
              label="Course Subject"
              required
            />
          </div>
          <div>
            <CustomInputField
              id="course-description"
              label="Course Description"
              required
            />
          </div>
          <div>
            <CustomInputField id="course-image" label="Course Image URL" />
          </div>
          <div>
            <CustomInputField id="course-price" label="Course Price" required />
          </div>
        </div>
        <div className="form-controls flex justify-end pr-10" >
          <SecondaryButton text="Save"></SecondaryButton>
        </div>
        {/* requirements */}
      </div>
    </form>
    <img src={fillForm} alt="fill form" className="w-1/3 h-1/3 align-middle sm:invisible md:visible" />
    </div>
    
  );
};
export default CreateCourseForm;

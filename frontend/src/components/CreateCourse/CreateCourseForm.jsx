import { useRef,useState } from "react";
import SecondaryButton from "../SecondaryButton";
import CustomInputField from "../UI/CustomInputField";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const CreateCourseForm = (props) => {
  const titleRef = useRef();
  const subjectRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();
  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty()
);

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
        <div className="flex flex-col h-fit outline-primaryBlue w-[500px] rounded-5xl">
          <div className="flex flex-col space-y-6 justify-center items-center bg-gray-100 rounded-lg py-2">
            <div>
              <div className="text-lg font-semibold mb-2">Course Title:</div>
              <input
                className="w-96 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                ref={titleRef}
                id="course-title"
                label="Course Title"
              />
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">Course Subject:</div>
              <input
                className="w-96 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                ref={subjectRef}
                id="course-subject"
                label="Course Subject"
                required
              />
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">
                Course Description:
              </div>
              <input
                className="w-96 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                ref={descriptionRef}
                id="course-description"
                label="Course Description"
                required
              />
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">Image URL:</div>
              <input
                className="w-96 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                ref={imgRef}
                id="course-image"
                label="Course Image URL"
              />
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">Course Price:</div>
              <input
                className="w-96 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                ref={priceRef}
                id="course-price"
                label="Course Price"
                placeholder="$"
                required
              />
            </div>
            <div className="form-controls flex justify-center">
              <SecondaryButton className="w-96" type="submit" text="Save"></SecondaryButton>
            </div>
          </div>
          <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
          {/* requirements */}
        </div>
        

      </form>
      {/* <img src={fillForm} alt="fill form" className="w-1/3 h-1/3 align-middle sm:invisible md:visible" /> */}
    </div>
  );
};
export default CreateCourseForm;

import SecondaryButton from "../SecondaryButton";
const CreateCourseForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    //some logic
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label className="block" htmlFor="course-title">
          Course Title
        </label>
        <input
          className="w-20 mt-1 mb-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue "
          id="course-title"
          required
        ></input>
      </div>
      <div>
        <label className="block" htmlFor="course-subject">
          Course Subject
        </label>
        <input
          className="w-20 mt-1 mb-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue "
          id="course-subject"
          required
        ></input>
      </div>
      <div>
        <label className="block" htmlFor="course-description">
          Course Description
        </label>
        <input
          className="w-20 mt-1 mb-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue "
          id="course-description"
          required
        ></input>
      </div>
      <div>
        <label className="block" htmlFor="course-image">
          Course Image URL
        </label>
        <input
          className="w-20 mt-1 mb-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue "
          id="course-image"
        ></input>
      </div>
      <div>
        <label htmlFor="course-description">price</label>
        <input
          className="w-20 mt-1 mb-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue "
          id="course-price"
          required
        ></input>
      </div>
      <div className="form-controls">
        <SecondaryButton text="Save"></SecondaryButton>
      </div>
      {/* requirements */}
    </form>
  );
};
export default CreateCourseForm;

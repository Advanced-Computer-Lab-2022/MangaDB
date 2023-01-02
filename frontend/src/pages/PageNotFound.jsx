import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    const role = localStorage.getItem('role');
    if(role === 'TRAINEE' || role === 'CORPORATE'){
      navigate("/")
    }
    else if (role === 'INSTRUCTOR'){
      navigate('/instructorDashboard');
    }
    else if(role === 'ADMIN') {
      navigate('/admin');
    }
    else{
      navigate('/')
    }

  }
  return (
    <Fragment>
        <div className="h-[48vw] relative overflow-clip -mb-4">
          <img
            className="object-cover"
            alt=""
            src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
          />
        </div>
        <div className="max-w-7xl text-center sm:top-[40%] absolute top-[0] left-[30%] ">
          <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">
            404 error
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Uh oh! I think you’re lost.
          </h1>
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            It looks like the page you’re looking for doesn't exist.
          </p>
          <div className="mt-6">
            <button
              onClick={onClickHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
            >
              Go back home
            </button>
          </div>
        </div>
    </Fragment>
  );
};
export default PageNotFound;

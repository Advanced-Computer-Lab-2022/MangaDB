import { Fragment } from "react";
const UnAuthorizedPage = () => {
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
            403 error
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Uh oh! Unprivileged Access!
          </h1>
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            It looks like you don't have access to that page.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
            >
              Go back home
            </a>
          </div>
        </div>
    </Fragment>
  );
};
export default UnAuthorizedPage;

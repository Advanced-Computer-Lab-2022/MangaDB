import { Alert as AlertUI } from "@material-tailwind/react";
const Alert = (props) => {
  return (
    <AlertUI
      show={true}
      className="bg-lightBlue text-gray-900"
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      {props.message}
      {props.children}
    </AlertUI>
  );
};
export default Alert;

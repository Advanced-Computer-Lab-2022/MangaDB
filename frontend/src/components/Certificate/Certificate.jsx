import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SecondaryButton from "../UI/SecondaryButton";
import { Fragment } from "react";
const Certificate = (props) => {
  const generatePDF2 = () => {
    html2canvas(document.querySelector("#content")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", "a2");
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("Certificate.pdf");
    });
  };
  return (
    <Fragment>
      <div className="p-4" id="content">
        <div className=" m-16 border border-black">
          {
            <div className="flex items-center justify-center mt-8">
              <span>
                <svg
                  className="fill-[#74a0d1] h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 84.98 114.25"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="OBJECTS">
                      <path d="M74.28,114.25H85L64,72.61A38.7,38.7,0,0,0,82.9,39.26v-.88A38.38,38.38,0,0,0,44.52,0H13A12.82,12.82,0,0,0,.17,14.13c0,.12,0,.24,0,.36s.22-.27.62-.7a13.78,13.78,0,0,1,10-4.22H44.52A28.81,28.81,0,0,1,73.33,38.38v.88A30.25,30.25,0,0,1,67.54,57.2a27.29,27.29,0,0,1-8,7.24c-5.63,3.32-12.11,4-18.51,3.48-5.7-.41-12.3-2-13.69-8.39,11.82,0,20.12,0,20.32,0A20.28,20.28,0,0,0,66.36,39.18v-.41A20.33,20.33,0,0,0,46,18.44H11.44A11.83,11.83,0,0,0,0,30.36v83.87H9.57V30.36A2.25,2.25,0,0,1,11.69,28h6.09l-.06,19v67.21H27.3V74.67A13.52,13.52,0,0,0,30.64,76a29.5,29.5,0,0,0,4.89.89l18.79,37.23,10.76.12-18.7-37.1a60,60,0,0,0,8.63-1Zm-47-67.07L27.36,28H46A10.76,10.76,0,0,1,56.79,38.78v.4c0,5.7-4.3,10.44-9.55,10.79H27.3Z" />
                    </g>
                  </g>
                </svg>
              </span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap mt-4">
                evamp
              </span>
            </div>
          }
          <div className="flex">
            <div className=" flex-col items-center m-16">
              <p className="text-3xl font-semibold">Omar Moataz</p>
              <p className="text-sm text-gray-700 mt-4 font-medium">
                has successfully completed the course
              </p>
              <p className="mt-4 text-lg font-medium">
                Introduction To The Theory Of Computation
              </p>
              <p className="text-sm text-gray-700 mt-4 font-medium">
                Offered By
              </p>
              <p className="mt-4 text-lg font-medium">Haytham Osman</p>
              <p className="text-sm text-gray-700 mt-4 font-medium"> On </p>
              <div className="mt-4 text-lg font-medium">January 21, 2022</div>
              <div className="mt-16 flex-col justify-center items-center">
                <p className="text-sm font-medium text-gray-700 ">chairman</p>
                <div className="border border-gray-800 w-1/6 mt-2"></div>
              </div>
              <div className="mt-2 text-lg font-medium">
                Dr. Fayez Ez El Din
              </div>
            </div>
            <div className="flex-col ">
              <div className="w-0 h-0 border-gray-300 border-[100px] border-solid"></div>
              <div className=" w-0 h-0 border-l-[100px] border-l-transparent border-t-[150px] border-t-gray-300 border-r-[100px] border-r-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      <SecondaryButton onClick={generatePDF2}>Download PDF</SecondaryButton>
    </Fragment>
  );
};
export default Certificate;

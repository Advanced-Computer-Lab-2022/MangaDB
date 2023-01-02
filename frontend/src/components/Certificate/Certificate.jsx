import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Fragment } from "react";
import ribbonn from "../../Assets/Images/ribbonn.png";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import axios from "axios";
const Certificate = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    generatePDF2() {
      html2canvas(document.querySelector("#contentt"), {
        logging: true,
        profile: true,
        onclone: function (doc) {
          const hiddenDiv = doc.getElementById("contentt");
          hiddenDiv.style.display = "block";
          hiddenDiv.style.zIndex = "0";
          hiddenDiv.style.position = "fixed";
        },
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", "a1");
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("Certificate.pdf");
      });
    },
    sendEmail() {
      html2canvas(document.querySelector("#contentt"), {
        logging: true,
        profile: true,
        onclone: function (doc) {
          const hiddenDiv = doc.getElementById("contentt");
          hiddenDiv.style.display = "block";
          hiddenDiv.style.zIndex = "0";
          hiddenDiv.style.position = "fixed";
        },
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", "a1");
        pdf.addImage(imgData, "PNG", 0, 0);
        //pdf.save("Certificate.pdf");
        axios.post(
          "http://localhost:3000/user/sendCertificate",
          {
            url: canvas.toDataURL("image/jpeg", 0.5),
            courseId: props._id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      });
    },
  }));

  return (
    <Fragment>
      <div className="p-4 absolute -z-50 w-full" id="contentt">
        <div className=" m-16 border-4 border-transparent border-black outline-4 outline-black z-0 ">
          <div className="flex items-center justify-center mt-8">
            <span className="relative">
              <div className="mt-6">
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
              </div>
            </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap mt-4">
              evamp
            </span>
            <img
              className="w-[300px] h-[200px] absolute "
              src={ribbonn}
              alt=""
            ></img>
          </div>
          <div className="flex">
            <div className=" flex-col items-center m-16">
              <p className="text-3xl font-semibold">{props.studentName}</p>
              <div className="absolute right-20">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="500px"
                  height="500px"
                  viewBox="0 0 731.000000 1280.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      className=" fill-[#FFD700]"
                      d="M3620 12792 c-43 -21 -75 -52 -148 -146 -88 -112 -139 -162 -177
-172 -49 -12 -110 22 -246 137 -93 79 -129 99 -178 99 -61 0 -94 -38 -173
-202 -47 -96 -75 -142 -103 -167 -56 -49 -97 -42 -267 43 -243 123 -287 104
-343 -142 -37 -161 -44 -180 -77 -217 -28 -33 -34 -35 -90 -35 -33 0 -112 13
-178 30 -123 31 -207 38 -242 19 -39 -21 -51 -74 -58 -259 -10 -265 -9 -265
-270 -266 -113 0 -188 -5 -213 -13 -73 -25 -83 -93 -41 -274 32 -135 35 -213
12 -249 -24 -37 -72 -56 -227 -88 -161 -33 -213 -56 -231 -100 -19 -45 -8 -87
61 -233 74 -157 86 -223 49 -270 -14 -17 -79 -56 -175 -103 -164 -80 -215
-121 -215 -172 0 -37 45 -111 129 -212 76 -91 111 -151 111 -192 0 -41 -39
-88 -135 -163 -219 -171 -238 -217 -132 -320 29 -27 91 -80 140 -118 165 -127
166 -165 6 -362 -81 -100 -118 -163 -119 -200 0 -11 9 -34 20 -52 15 -26 52
-48 184 -113 103 -50 173 -90 186 -108 37 -47 25 -113 -50 -271 -41 -87 -65
-150 -68 -182 -4 -44 -2 -51 26 -77 33 -31 96 -52 245 -81 115 -23 178 -51
198 -88 20 -37 15 -109 -15 -242 -27 -120 -33 -200 -16 -232 6 -10 25 -27 43
-36 27 -15 59 -18 212 -18 274 -1 276 -3 286 -263 7 -208 17 -244 75 -268 43
-18 68 -15 236 27 64 16 139 29 167 29 90 0 123 -50 167 -255 35 -164 69 -215
143 -215 37 0 76 15 193 71 87 42 165 73 191 76 68 8 103 -29 183 -194 125
-257 161 -265 374 -90 114 95 158 121 206 121 46 0 87 -35 189 -164 170 -213
210 -213 380 0 102 129 143 164 189 164 48 0 92 -26 206 -121 213 -175 248
-167 373 89 81 165 116 203 184 195 26 -3 104 -34 191 -76 117 -56 156 -71
193 -71 74 0 108 51 143 215 44 205 77 255 167 255 28 0 103 -13 167 -29 168
-42 193 -45 236 -27 58 24 68 61 75 268 5 158 8 180 27 205 39 52 62 57 259
58 154 0 185 3 213 18 60 33 66 93 26 268 -30 133 -35 205 -15 242 20 37 83
65 198 88 149 29 212 50 245 81 28 26 30 33 26 77 -3 32 -27 95 -68 182 -75
158 -87 224 -50 271 13 18 83 58 186 108 132 65 169 87 184 113 11 18 20 41
20 52 -1 37 -38 100 -119 200 -160 197 -159 235 6 362 49 38 111 91 140 118
106 103 87 149 -132 320 -96 75 -135 122 -135 163 0 41 35 101 121 206 88 109
119 161 119 202 0 44 -70 102 -185 153 -121 54 -200 102 -215 132 -23 43 -6
117 59 256 69 146 80 188 61 233 -18 44 -70 67 -233 101 -162 33 -205 52 -230
100 -21 40 -18 79 19 243 40 178 29 243 -43 267 -25 8 -100 13 -213 13 -261 1
-260 1 -270 266 -7 185 -19 238 -58 259 -35 19 -119 12 -242 -19 -236 -60
-282 -41 -324 133 -9 37 -23 97 -32 135 -48 197 -100 213 -330 98 -234 -118
-259 -110 -371 122 -80 164 -113 202 -174 202 -49 0 -85 -20 -178 -99 -136
-115 -197 -149 -246 -137 -37 10 -89 60 -176 171 -43 56 -93 111 -110 124 -32
24 -84 35 -109 23z m461 -885 c251 -44 423 -95 644 -191 734 -318 1310 -970
1529 -1731 84 -294 110 -505 103 -830 -5 -248 -19 -359 -68 -565 -188 -791
-716 -1452 -1444 -1810 -300 -148 -594 -235 -915 -271 -135 -15 -455 -15 -590
0 -315 36 -616 123 -897 260 -517 253 -925 639 -1201 1138 -325 586 -420 1295
-261 1950 93 383 280 762 530 1073 357 446 883 785 1434 925 272 69 411 84
735 80 220 -2 275 -6 401 -28z"
                    />
                    <path
                      className=" fill-[#FFD700]"
                      d="M3460 11674 c-596 -52 -1107 -283 -1529 -689 -323 -311 -563 -729
-670 -1166 -45 -185 -62 -314 -68 -519 -20 -664 221 -1283 687 -1764 408 -422
935 -676 1529 -737 157 -16 462 -6 617 20 264 45 459 108 700 226 677 334
1157 953 1312 1695 37 173 47 280 46 500 0 232 -13 353 -61 555 -229 970
-1030 1707 -2018 1856 -125 19 -440 32 -545 23z"
                    />
                    <path
                      className="fill-red-800"
                      d="M2355 5946 c-128 -64 -193 -86 -260 -86 -28 0 -34 -4 -39 -27 -43
-202 -1105 -5688 -1102 -5691 2 -2 234 150 516 338 282 188 518 344 525 346 7
3 231 -179 500 -406 269 -226 491 -407 495 -403 13 15 343 5740 332 5760 -6
10 -24 31 -40 46 l-29 28 -114 -92 c-181 -146 -271 -176 -374 -128 -64 30
-110 90 -185 243 -36 72 -72 132 -80 134 -8 1 -74 -27 -145 -62z"
                    />
                    <path
                      className="fill-red-800"
                      d="M4705 5874 c-102 -210 -176 -274 -299 -261 -73 7 -117 32 -248 138
-103 83 -113 89 -116 68 -1 -13 58 -1005 133 -2204 74 -1199 153 -2470 175
-2825 22 -355 42 -677 45 -717 l7 -71 519 415 c299 238 526 413 533 410 8 -3
258 -159 556 -347 298 -188 543 -340 545 -339 2 2 -8 58 -22 124 -13 66 -123
602 -244 1190 -354 1721 -597 2906 -638 3105 -21 102 -93 457 -161 790 -68
333 -125 607 -127 609 -2 3 -10 -5 -19 -17 -22 -32 -95 -71 -146 -78 -61 -9
-135 14 -280 87 -65 32 -124 59 -132 59 -9 0 -42 -55 -81 -136z"
                    />
                  </g>
                </svg>
              </div>
              <p className="text-sm text-gray-700 mt-4 font-medium">
                has successfully completed the course
              </p>
              <p className="mt-4 text-lg font-medium">{props.courseTitle}</p>
              <p className="text-sm text-gray-700 mt-4 font-medium">
                Offered By
              </p>
              <p className="mt-4 text-lg font-medium">{props.instructorName}</p>

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
          </div>
        </div>
      </div>

      {/* <SecondaryButton onClick={generatePDF2}>Download PDF</SecondaryButton> */}
    </Fragment>
  );
});
export default Certificate;

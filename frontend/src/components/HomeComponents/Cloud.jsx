import banqueMisr from "../../Assets/Images/banqueMisr.png";
import skaggs from "../../Assets/Images/skaggs.png";
import wuzzuf from "../../Assets/Images/wuzzuf.png";
import NBE from "../../Assets/Images/NBE-logo.svg";
import arabAfrican from "../../Assets/Images/arabAfrican.png";
function Cloudd() {
  return (
    <div className="bg-indigo-200 bg-opacity-25">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold  text-indigo-900">
          The world's most innovative companies use Revamp
        </h2>
        <div className="flex items-center mt-8 lg:mt-10">
          <div className="-mt-4 -ml-8 flex items-center flex-wrap justify-between space-x-16 lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
              <img className="h-20 w-42" src={skaggs} alt="Level" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
              <img className="h-20 w-42 object" src={wuzzuf} alt="Level" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
              <img className="h-20 w-42" src={banqueMisr} alt="Level" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
              <img className="h-20 w-42" src={arabAfrican} alt="Transistor" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
              <img className="h-20 w-42" src={NBE} alt="Workcation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cloudd;

import ProgressPopOver from "./ProgressPopOver";
import ProgressIcon from "./ProgressIcon";
const ProgressManager = (props) => {

  return (
    <div className="flex end items-center justify-center space-x-2">
      <ProgressIcon
        progress={props.progress}
        totalSources={props.totalSources}
      ></ProgressIcon>
      <ProgressPopOver
        progress={props.progress}
        totalSources={props.totalSources}
      ></ProgressPopOver>
    </div>
  );
};
export default ProgressManager;

import ProgressPopOver from "./ProgressPopOver";
import ProgressIcon from "./ProgressIcon";
const ProgressManager = (props) => {
    return(
        <div className="flex end items-center justify-center space-x-2">
            <ProgressIcon></ProgressIcon>
            <ProgressPopOver></ProgressPopOver>
        </div>
    )
}
export default ProgressManager;
import PrimaryButton from "../UI/PrimaryButton"
import Modal from "../UI/Modal";
const DeleteSubtitle = (props) => {
  return (
    <Modal onClick={props.onCancel}>
      <div className="bg-white sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {props.type === "subtitle" ? "Delete Subtitle" : "Delete Source"}
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              {props.type === "subtitle"
                ? " Once you delete this Subtitle, you will lose all data associated with it."
                : " Once you delete this Source, you will lose all data associated with it."}
            </p>
          </div>
          <div className="mt-5 flex justify-end space-x-4">
            <PrimaryButton text="Cancel" onClick={props.onCancel} />
            <button
              type="button"
              onClick={props.onClick}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              {props.type === "subtitle" ? "Delete Subtitle" : "Delete Source"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteSubtitle;

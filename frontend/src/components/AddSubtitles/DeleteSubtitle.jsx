import SecondaryButton from "../SecondaryButton";
import Modal from "../UI/Modal";
const DeleteSubtitle = (props) => {
  return (
    <Modal onClick={props.onCancel}>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Subtitle
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Once you delete this Subtitle, you will lose all data associated
              with it.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={props.onClick}
              className="mb-2 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Delete Subtitle
            </button>
            <SecondaryButton
              text="Cancel"
              onClick={props.onCancel}
            ></SecondaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteSubtitle;

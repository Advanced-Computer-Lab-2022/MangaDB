import Modal from "../UI/Modal";
import PrimaryButton from "../UI/PrimaryButton";
const DeleteNote = (props) => {
  const clickHandler = () => {
    props.onClick();
    props.onCancel();
  }
  return (
    <Modal onClick={props.onCancel}>
      <div className="bg-white sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Note
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
               Once you delete this Note, you will lose all data associated
              with it.
            </p>
          </div>
          <div className="mt-5 flex justify-end space-x-4">
            <PrimaryButton text="Cancel" onClick={props.onCancel} />
            <button
              type="button"
              onClick={clickHandler}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteNote;

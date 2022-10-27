import TableRows from "./TableRows";
import TableHeader from "./TableHeader";
const Table=(props)=> {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:mx-0">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-0 ">
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <TableHeader ></TableHeader>
              </thead>
              <tbody>
               <TableRows rows = {props.rows}></TableRows>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Table;
const TableHeader = (props) => {
  return (
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase tracking-wider"
      >
        Course Title
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase tracking-wider"
      >
        Instructor Name
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase tracking-wider"
      >
        Subject
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase tracking-wider"
      >
        Price
      </th>
      <th scope="col" className="relative px-6 py-3">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  );
};
export default TableHeader;

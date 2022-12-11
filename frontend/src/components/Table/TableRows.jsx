import PrimaryButton from "../UI/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton";
import Stars from "../UI/Stars";

const size = 3;

const TableRows = (props) => {
  const rows = props.rows.map((row, rowIdx) => (
    <tr
      key={row.courseId}
      className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {row.courseTitle}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.instructorName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.subject}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.price}$
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2 items-center">
        <div>
          <Stars size={size} rating={row.rating} />
        </div>
        <div>{row.rating}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.totalHours}
      </td>
      <td className=" whitespace-nowrap text-right text-sm font-medium flex space-x-4">
        <PrimaryButton text="View" />
        {/* <SecondaryButton text="Edit" /> */}
      </td>
    </tr>
  ));
  return rows;
};
export default TableRows;

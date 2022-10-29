import PrimaryButton from "../PrimaryButton";

const TableRows =(props) => {
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
            {row.price}
          </td>
          <td className=" whitespace-nowrap text-right text-sm font-medium">
            <PrimaryButton text="Edit"></PrimaryButton>
          </td>
        </tr>
      ))
      return rows;
}
export default TableRows;
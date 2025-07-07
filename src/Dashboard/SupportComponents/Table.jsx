const Table = ({ tableData }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Sl</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">City</th>
            <th className="p-2 text-left">Gender</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, i) => (
            <tr key={data?._id}>
              <th>{i + 1}</th>
              <td>{data?.userEmail}</td>
              <td>{data?.userName}</td>
              <td>{data?.userRole}</td>
              <td>{data?.city}</td>
              <td>{data?.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

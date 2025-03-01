const Table = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">1</td>
            <td className="p-2">John Doe</td>
            <td className="p-2 text-green-500">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;

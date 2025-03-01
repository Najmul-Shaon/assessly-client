const StatusCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md text-center">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatusCard;

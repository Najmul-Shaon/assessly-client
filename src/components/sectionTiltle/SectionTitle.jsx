
const SectionTitle = ({ header, subHeader }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-normal mt-2 text-center">{subHeader}</p>
      <h1 className="text-3xl text-primaryColor font-bold uppercase mt-2 text-center">{header}</h1>
    </div>
  );
};

export default SectionTitle;

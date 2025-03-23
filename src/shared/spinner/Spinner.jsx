import { Triangle } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center mt-16 min-h-[calc(100vh-436px)]">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#008080"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;

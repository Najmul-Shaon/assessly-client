const NavigationButtons = ({
  currentIndex,
  total,
  selectedOption,
  onNext,
  onSubmit,
}) => {
  return (
    <>
      {currentIndex < total - 1 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onNext}
            disabled={!selectedOption}
            className="px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryDarker btn"
          >
            Next
          </button>
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          onClick={onSubmit}
          disabled={total === 0}
          className="px-6 py-3 bg-accentColor text-white rounded-lg btn hover:bg-accentColor"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default NavigationButtons;

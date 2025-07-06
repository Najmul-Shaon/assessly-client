const Pagination = ({
  pagesSequence,
  currentPage,
  setCurrentPage,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="join flex items-center justify-center mt-6">
      {/* <button className="join-item btn btn-sm">1</button> */}
      {pagesSequence.length > 1 && (
        // pagesSequence?.map((serial) => (
        <button
          onClick={() => handlePrev()}
          className={`join-item btn btn-sm ${
            currentPage === 0 && "btn-disabled"
          }`}
        >
          Prev
        </button>
      )}
      {pagesSequence.length > 1 &&
        pagesSequence?.map((serial) => (
          <button
            key={serial}
            onClick={() => setCurrentPage(serial)}
            className={`join-item btn btn-sm ${
              currentPage === serial && "btn-active"
            }`}
          >
            {serial + 1}
          </button>
        ))}
      {pagesSequence.length > 1 && (
        // pagesSequence?.map((serial) => (
        <button
          onClick={handleNext}
          className={`join-item btn btn-sm ${
            currentPage === pagesSequence.length - 1 && "btn-disabled"
          }`}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;

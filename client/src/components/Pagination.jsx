

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const maxPagesToShow = 10; // Maximum number of pages to show
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return pages;
    } else {
      const half = Math.floor(maxPagesToShow / 2);
      let startPage = currentPage - half;
      if (startPage < 1) startPage = 1;
      let endPage = startPage + maxPagesToShow - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPagesToShow + 1;
      }
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center my-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none"
        >
          Prev
        </button>
      )}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none ${page === currentPage ? 'bg-gray-400' : ''}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination
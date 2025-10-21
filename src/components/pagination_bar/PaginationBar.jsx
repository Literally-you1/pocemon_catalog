import { useEffect } from "react";

function PagintionBar({
  totalCard,
  limit,
  currentPage,
  onChangePage,
  setpage,
  filterArr,
  changePageArr,
}) {
  const totalPages = Math.ceil(totalCard / limit);

  useEffect(() => {
    if (filterArr.isFilter && filterArr.arr.length > 0) {
      const pageArr = addPagination(filterArr.arr, limit);
      changePageArr(pageArr[0]);
    } else if (!filterArr.isFilter) {
      console.log("chngserver");
      onChangePage(
        `https://pokeapi.co/api/v2/ability/?offset=${
          currentPage * limit - limit
        }&limit=${limit}`
      );
    }
  }, [filterArr, limit, changePageArr, currentPage, onChangePage]);

  if (!filterArr.isFilter) {
    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 m-1 border rounded ${
              page === currentPage ? "bg-blue-300" : "bg-gray-100"
            }`}
            onClick={() => {
              setpage(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
    );
  } else {
    const pageArr = addPagination(filterArr.arr, limit);
    return (
      <div className="flex justify-center mt-4">
        {pageArr.map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 m-1 border rounded ${
              index + 1 === currentPage ? "bg-blue-300" : "bg-gray-100"
            }`}
            onClick={() => {
              changePageArr(page);
              setpage(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }
}

function addPagination(arr, limit) {
  const totalItems = arr.length;
  const totalPages = Math.ceil(totalItems / limit);
  const pageArr = [];

  for (let i = 1; i <= totalPages; i++) {
    const start = (i - 1) * limit;
    const end = i * limit;
    pageArr.push(arr.slice(start, end));
  }
  return pageArr;
}
export default PagintionBar;

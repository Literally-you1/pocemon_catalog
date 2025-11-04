import { useSelector } from "react-redux";
function PagintionBar({ totalCard, offset, setpage, limit }) {
  const filterData = useSelector((state) => state.FilterItems);
  const totalItem = filterData.isFilter
    ? filterData.data?.results.length || 1
    : totalCard;

  const totalPages = Math.ceil(totalItem / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const showingPage = createPageArr(currentPage, totalPages);
  console.log(totalPages, totalCard);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => {
          if (currentPage > 1) {
            console.log((currentPage - 2) * limit);
            console.log(currentPage, offset);
            setpage((currentPage - 2) * limit);
            console.log(currentPage);
          }
        }}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg"
      >
        {"<"}
      </button>
      {showingPage.map((page, index) => (
        <p
          key={`${page}${index}`}
          className={`px-3 py-1 m-1 border rounded ${
            page === currentPage ? "bg-blue-300" : "bg-gray-100"
          }`}
          onClick={() => {
            if (!isNaN(+page)) {
              setpage((page - 1) * limit);
            }
          }}
        >
          {page}
        </p>
      ))}
      <button
        onClick={() => {
          if (currentPage < totalPages) {
            setpage(currentPage * limit);
          }
        }}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg"
      >
        {">"}
      </button>
    </div>
  );
}

function createPageArr(currentPage, totalPages) {
  const pageArr = [];

  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pageArr.push(i);
    }
    return pageArr;
  }

  const leftCount = 3;
  const rightCount = 3;

  for (let i = 1; i <= leftCount; i++) {
    pageArr.push(i);
  }

  if (currentPage > leftCount + 1) {
    pageArr.push("...");
    const start = Math.max(leftCount + 1, currentPage - 1);
    const end = Math.min(totalPages - rightCount, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pageArr.includes(i)) {
        pageArr.push(i);
      }
    }
  } else {
    for (let i = leftCount + 1; i <= 4; i++) {
      pageArr.push(i);
    }
  }

  if (currentPage < totalPages - rightCount) {
    if (pageArr[pageArr.length - 1] < totalPages - rightCount) {
      pageArr.push("...");
    }
  }

  for (let i = totalPages - rightCount + 1; i <= totalPages; i++) {
    if (!pageArr.includes(i)) {
      pageArr.push(i);
    }
  }

  return pageArr;
}

export default PagintionBar;

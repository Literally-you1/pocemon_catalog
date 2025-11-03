import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApiUrl } from "../../slices/urlSlice";

export default function ProductList({ serverData, offset, limit }) {
  const filterData = useSelector((state) => state.FilterItems);
  const currentPage = Math.floor(offset / limit) + 1;
  let renderArr = serverData.data.results;

  const dispatch = useDispatch();

  if (filterData.isFilter) {
    renderArr = addPagination(filterData.data.results, limit)[currentPage - 1];
  }

  const navigate = useNavigate();
  console.log(renderArr);
  if (renderArr == undefined || renderArr?.length == 0) {
    return (
      <div>
        <h2>nothing found</h2>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {renderArr.map((item) => (
          <div
            key={item.url}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex items-center justify-center text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.03] transition-transform duration-200  ease-in-out "
            onClick={() => {
              console.log(item.url);
              dispatch(setApiUrl(item.url));
              navigate(`/item`);
            }}
          >
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
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

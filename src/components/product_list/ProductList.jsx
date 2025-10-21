import { useNavigate } from "react-router-dom";

export default function ProductList({ serverData, changeHrefItem }) {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div
        className="
          grid 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-6
        "
      >
        {serverData.map((item) => (
          <div
            key={item.url}
            className="
              bg-white 
              dark:bg-gray-800 
              shadow-md 
              rounded-xl 
              p-4 
              flex 
              items-center 
              justify-center 
              text-center 
              border 
              border-gray-200 
              dark:border-gray-700 
              hover:shadow-lg 
              hover:scale-[1.03] 
              transition-transform 
              duration-200 
              ease-in-out
            "
            onClick={() => {
              changeHrefItem(item.url);
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

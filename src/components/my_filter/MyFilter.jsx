import { useMemo, useState } from "react";

function MyFilter({ changeDataArr }) {
  const [inputValue, setInputValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  useMemo(() => {
    updateFilter(inputValue, sortValue, changeDataArr);
  }, [inputValue, sortValue]);
  return (
    <div>
      <div>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Small input
        </label>
        <input
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option value="def">defolt</option>
          <option value="by">alphabetically</option>
          <option value="against">against the alphabet</option>
        </select>
      </div>
    </div>
  );
}

function updateFilter(inputValue, sortValue, setArr) {
  setArr((obj) => {
    let newArr = [...obj.arrOrig];

    if (inputValue.trim()) {
      const trimmed = inputValue.trim().toLowerCase();
      newArr = newArr.filter((item) =>
        item.name.toLowerCase().includes(trimmed)
      );
    }

    if (sortValue === "by") {
      newArr.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "against") {
      newArr.sort((a, b) => b.name.localeCompare(a.name));
    }

    const isFilterActive = inputValue.trim() || sortValue !== "def";

    return { arr: newArr, arrOrig: obj.arrOrig, isFilter: isFilterActive };
  });
}

export default MyFilter;

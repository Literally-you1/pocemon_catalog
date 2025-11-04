import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterPockemons } from "../../slices/filterArr";
import {
  useGetAllPokemonsQuery,
  useGetAllAbilityQuery,
  useGetAllСategotyQuery,
} from "../../api/pokemonApi";
import Loader from "../loader/Loader";

function MyFilter({ changeNameUrl, cahngeNmaeTypeUrl, setOffset }) {
  const [inputValue, setInputValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const dispatch = useDispatch();

  const { data: allItems, isLoading: isAllItemsLoading } =
    useGetAllPokemonsQuery();
  const { data: allAbility, isLoading: isAllAbilityLoading } =
    useGetAllAbilityQuery();
  const { data: allCategory, isLoading: isAllCategoryLoading } =
    useGetAllСategotyQuery();

  function updateFilter() {
    const filterEdPokemon = (() => {
      let newArr = [...allItems.results];

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

      return {
        data: { results: newArr },
        isFilter: isFilterActive,
        count: allItems.count,
      };
    })();
    dispatch(
      setFilterPockemons({
        data: filterEdPokemon.data,
        isFilter: filterEdPokemon.isFilter,
        count: filterEdPokemon.count,
      })
    );
  }
  // const [urlItemName,setUrlItemName]= useState('');
  // const [urlName,seturlName]= useState('')
  // console.log(urlItemName, urlName);
  // const { data: items, refetch } = useGetPokemonsQuery(
  //   { limit: 20, offset: 0, nameUrl: urlName, name: urlItemName },
  //   { refetchOnMountOrArgChange: true }
  // );

  // useEffect(() => {
  //   refetch();
  //   if (items) {
  //     console.log(items);
  //     if (urlName == "ability") {
  //       let pokemonArr = [];
  //       items.pokemon.map((elem) => {
  //         pokemonArr.push(elem.pokemon);
  //       });
  //       dispatch(
  //         setFilterPockemons({
  //           data: { results: pokemonArr },
  //           isFilter: true,
  //           count: pokemonArr.length,
  //         })
  //       );
  //     }

  //     if (urlName == "item-category") {
  //       dispatch(
  //         setFilterPockemons({
  //           data: { results: items.item },
  //           isFilter: true,
  //           count: items.item.length,
  //         })
  //       );
  //     }
  //   }
  // }, [urlName, urlItemName, items]);

  function changeUrl(type, nameUrl) {
    if (type == "def") {
      cahngeNmaeTypeUrl("");
      changeNameUrl("item");
      setOffset(0);
      return;
    }
    cahngeNmaeTypeUrl(type);
    changeNameUrl(nameUrl);
  }

  useEffect(() => {
    if (!isAllItemsLoading) {
      updateFilter();
    }
  }, [inputValue, sortValue]);

  if (isAllAbilityLoading || isAllCategoryLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

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
      <div>
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          onChange={(e) => changeUrl(e.target.value, "ability")}
        >
          <option key={"ability"} value="def">
            defolt
          </option>
          {allAbility.results.map((item) => {
            return (
              <option key={item.name} value={`${item.name}`}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          onChange={(e) => changeUrl(e.target.value, "item-category")}
        >
          <option key={"category"} value="def">
            defolt
          </option>
          {allCategory.results.map((item) => {
            return (
              <option key={item.name} value={`${item.name}`}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default MyFilter;

import { useEffect, useState } from "react";
import MyFilter from "../components/my_filter/MyFilter";
import ProductList from "../components/product_list/ProductList";
import PagintionBar from "../components/pagination_bar/PaginationBar";
import Loader from "../components/loader/Loader";
import { useGetPokemonsQuery } from "../api/pokemonApi";

const itemLimit = 20;

function Catalog() {
  const [offset, setOffset] = useState(0);
  const [urlName, setUrlName] = useState("item");
  const [urlItemName, setUrlItemName] = useState("");
  const [renderObj, setrenderObj] = useState({});
  console.log(urlItemName);
  console.log(urlName);
  const { data: items, isLoading: isItemsLoading } = useGetPokemonsQuery(
    {
      limit: itemLimit,
      offset: +offset,
      nameUrl: urlName,
      name: urlItemName,
    },
    { refetchOnMountOrArgChange: true }
  );
  console.log(items);
  useEffect(() => {
    if (items) {
      setRenderObj(items, setrenderObj);
    }
  }, [items]);

  console.log(renderObj);
  return (
    <div>
      {isItemsLoading || !items ? (
        <Loader />
      ) : (
        <>
          <MyFilter
            changeNameUrl={setUrlName}
            cahngeNmaeTypeUrl={setUrlItemName}
            setOffset={setOffset}
          />
          <ProductList
            serverData={{ data: renderObj }}
            offset={offset}
            limit={itemLimit}
          />
          <PagintionBar
            totalCard={renderObj.count}
            offset={offset}
            setpage={setOffset}
            limit={itemLimit}
          />
        </>
      )}
    </div>
  );
}

function setRenderObj(dataobj, setrenderObj) {
  if (Object.hasOwn(dataobj, "pokemon")) {
    let pokemonArr = [];
    dataobj.pokemon.map((elem) => {
      pokemonArr.push(elem.pokemon);
    });
    setrenderObj({
      results: pokemonArr,
      count: +pokemonArr.length,
    });

    return;
  }
  if (Object.hasOwn(dataobj, "items")) {
    setrenderObj({
      results: dataobj.items,
      count: +dataobj.items.length,
    });

    return;
  }
  setrenderObj({
    results: dataobj.results,
    count: dataobj.count,
  });
}
export default Catalog;

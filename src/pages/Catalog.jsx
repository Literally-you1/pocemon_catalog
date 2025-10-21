import { useEffect, useState } from "react";
import MyFilter from "../components/my_filter/MyFilter";
import ProductList from "../components/product_list/ProductList";
import useGetData from "../hooks/useGateData";
import PagintionBar from "../components/pagination_bar/PaginationBar";

const mainHref = " https://pokeapi.co/api/v2/ability/";
const itemLimit = 20;

function Catalog({ changeItem, cesh, setCesh }) {
  const [serverData, setServerData] = useState(null);
  const [href, setHref] = useState(mainHref);
  const [filterData, setFilterData] = useState(null);
  const [page, setPage] = useState(1);

  const dataForFilter = useGetData(mainHref + "?limit=400", cesh, setCesh);
  const data = useGetData(href + "?limit=400", cesh, setCesh);

  useEffect(() => {
    if (data != null) {
      setServerData(data.results);
    }
    if (dataForFilter != null) {
      setFilterData({
        arr: dataForFilter.results,
        arrOrig: dataForFilter.results,
        isFilter: false,
      });
    }
  }, [data, dataForFilter]);

  return (
    <div>
      {filterData === null || data === null ? (
        "loading..."
      ) : (
        <>
          <MyFilter changeDataArr={setFilterData} />
          <ProductList
            serverData={serverData.slice(0, itemLimit)}
            changeHrefItem={changeItem}
          />
          <PagintionBar
            totalCard={data.count}
            limit={itemLimit}
            currentPage={page}
            onChangePage={setHref}
            setpage={setPage}
            filterArr={filterData}
            changePageArr={setServerData}
          />
        </>
      )}
    </div>
  );
}

export default Catalog;

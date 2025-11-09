import SearchInput from "./components/My-SearchInput/searchInput.jsx";
import { useEffect, useMemo, useState, createContext } from "react";
import "./App.css";
import Item from "./components/My-item/item.jsx";
import Mymodal from "./components/My-modal/mymodal.jsx";

const ListToDoContext = createContext(null);

function App() {
  const [data, setData] = useState(null);
  const [inputState, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    fetch("../data/data.json")
      .then((res) => res.json())
      .then((body) => setData(body))
      .catch((error) => console.error(error));
  }, []);
  useMemo(() => {
    if (!data) return [];
    if (inputState.trim() === "") setFilterData(data);

    setFilterData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(inputState.toLowerCase()) ||
          item.description.toLowerCase().includes(inputState.toLowerCase()) ||
          item.createdAt.toLowerCase().includes(inputState.toLowerCase())
      )
    );
  }, [data, inputState]);

  return (
    <div className="mt-[100px] mr-auto ml-auto max-w-[80%] app flex flex-col justify-center">
      {data === null ? (
        <div>Loading...</div>
      ) : (
        <div className={`w-full flex flex-col content-center `}>
          <ListToDoContext.Provider value={{ arr: data, changeData: setData }}>
            <Mymodal data={data} changeData={setData}></Mymodal>
            <SearchInput value={inputState} setvalue={setInput} />
            <div className="mt-[10px] max-w-[100%] gap-2 flex-wrap flex flex-col content-center">
              {filterData.map((element) => {
                return (
                  <Item
                    data={element}
                    arr={data}
                    key={element.id}
                    changestate={setData}
                  />
                );
              })}
            </div>
          </ListToDoContext.Provider>
        </div>
      )}
    </div>
  );
}

export default App;
export { ListToDoContext };

import React, { useContext, useState } from "react";
import "./item.css";
import basketLogo from "../../assets/basketLogo.png";
import { ListToDoContext } from "../../App.jsx";
function Item({ data }) {
  const toDoContext = useContext(ListToDoContext);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="rounded-lg bg-[color:rgba(248,243,213,0.88)] p-[6px] border border-cyan-600 flex flex-col justify-start max-w-[85%] min-w-[75%]">
      <div className=" w-full gap-13 justify-between flex flex-row">
        <span className={`text-3xl  `}>{data.id}</span>
        <span
          id="name"
          className={` text-3xl text-[color:rgba(61,105,125,0.88)] ${
            isChecked && "crossed_out"
          }`}
        >
          {data.name}
        </span>
      </div>
      <p
        id="txt"
        className={`${
          isChecked && "crossed_out"
        } text-center text-2xl text-[color:rgba(243,120,61,0.88)] flex justify-center`}
      >
        {data.description}
      </p>
      <div className=" w-full flex flex-row justify-between">
        <input
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="list_checkbox"
          type="checkbox"
        />
        <span>{data.createdAt.replace("T", " ")}</span>
        <img
          onClick={() => {
            deliItem(toDoContext.arr, data, toDoContext.changeData);
          }}
          src={basketLogo}
          alt="basket"
        />
      </div>
    </div>
  );
}
function deliItem(dataArr, elementData, setState) {
  const newArr = dataArr.filter((item) => item.id !== elementData.id);
  setState([...newArr]);
}
export default Item;

import MyButton from "../My-Button/MyButton";
import "./myModal.css";
import { useState } from "react";

function MyModal({ data, changeData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [txtInput, setTxtInput] = useState("");
  return (
    <div>
      <MyButton
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        add Item
      </MyButton>
      <div
        onClick={() => {
          console.log("1");
          setIsModalVisible(false);
        }}
        className={`hidden absolute inset-0 bg-[rgba(0,0,0,0.15)]  ${
          isModalVisible && "active"
        }`}
      >
        <div
          className=" flex flex-row flex-wrap justify-center w-[400px] box-border p-5 bg-[rgb(119,135,141)] rounded-2xl shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <form className="w-[300px] flex flex-col content-center" action="">
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                name of task
              </label>
              <input
                type="text"
                id="name-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                task text
              </label>
              <input
                type="text"
                id="task-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={txtInput}
                onChange={(e) => setTxtInput(e.target.value)}
              />
            </div>
            <button
              onClick={() =>
                addItem(
                  data,
                  changeData,
                  nameInput,
                  txtInput,
                  setNameInput,
                  setTxtInput
                )
              }
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function addItem(data, changedata, name, txt, changename, changetxt) {
  console.log(name, txt);
  if (!(name.trim() && txt.trim())) {
    const temporery = {
      name: name,
      txt: txt,
    };

    changename("not filled");
    changetxt("not filled");

    setTimeout(() => {
      changename(temporery.name);
      changetxt(temporery.txt);
    }, 1000);
  } else {
    const now = new Date();
    const isoString = now.toISOString();

    const newItem = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      name: name,
      description: txt,
      createdAt: isoString,
    };

    changedata([...data, newItem]);
  }
}
export default MyModal;

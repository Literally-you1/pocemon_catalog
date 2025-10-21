import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Catalog from "./pages/Catalog";
import AboutItem from "./pages/AboutItem";
import { useState } from "react";

function App() {
  const [cesh, setCesh] = useState(new Map());
  const [itemHref, setItemHref] = useState("");
  return (
    <>
      <header className="flex justify-center items-center h-20 bg-gray-100 shadow-md">
        <Link
          to="/"
          className="text-xl font-semibold text-gray-700 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
        >
          Home
        </Link>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Catalog changeItem={setItemHref} cesh={cesh} setCesh={setCesh} />
          }
        />
        <Route
          path="/item"
          element={<AboutItem href={itemHref} cesh={cesh} setCesh={setCesh} />}
        />
        <Route />
      </Routes>
    </>
  );
}

export default App;

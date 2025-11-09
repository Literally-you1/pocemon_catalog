import "./searchInput.css";

function SearchInput({ setvalue, value }) {
  return (
    <div>
      <input
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-zinc-400 border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="text"
        value={value}
        onChange={(event) => setvalue(event.target.value)}
      />
    </div>
  );
}

export default SearchInput;

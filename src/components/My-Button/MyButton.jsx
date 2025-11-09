function MyButton({ children, ...props }) {
  return (
    <button
      className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
      {...props}
    >
      {children}
    </button>
  );
}

export default MyButton;

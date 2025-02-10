const Togglebar = ({ dataToggle, setDataToggle }) => {
  return (
    <div
      className="bg-gray-600 w-12 h-6 rounded-full relative cursor-pointer"
      onClick={() => setDataToggle(!dataToggle)}
    >
      <div
        className={`bg-blue-400 w-4 h-4 absolute rounded-full top-1 transition-all duration-200 ${
          dataToggle ? "left-1" : "right-1"
        }`}
      ></div>
    </div>
  );
};

export default Togglebar;

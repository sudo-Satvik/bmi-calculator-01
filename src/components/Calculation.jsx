const Calculation = ({ data, setData }) => {
  const inputDataChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBMIData = (e) => {
    e.preventDefault();

    const weight = parseFloat(data.weight);
    const heightInMeters = parseFloat(data.height) / 100;

    if (!weight || !heightInMeters || heightInMeters <= 0) {
      alert("Please enter valid values for weight and height.");
      return;
    }

    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    setData((prev) => ({ ...prev, bmi, weight: "", height: "" }));
  };
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md max-h-fit">
      <form onSubmit={handleBMIData}>
        <label htmlFor="weight">Your weight in kg:</label>
        <input
          type="number"
          name="weight"
          placeholder="80"
          value={data.weight}
          onChange={inputDataChange}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full mb-5 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="height">Your height in cm:</label>
        <input
          type="number"
          name="height"
          placeholder="184"
          value={data.height}
          onChange={inputDataChange}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:bg-blue-700 mt-8 cursor-pointer"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Calculation;

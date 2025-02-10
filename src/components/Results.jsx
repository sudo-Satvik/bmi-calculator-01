const Results = ({ bmi }) => {
  const rangeIndicator = () => {
    if (!bmi) return { text: "No BMI calculated", color: "bg-gray-500" };

    if (bmi < 18.5) {
      return { text: "Underweight", color: "bg-blue-600" };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return { text: "Healthy weight", color: "bg-green-600" };
    } else if (bmi >= 25 && bmi <= 29.9) {
      return {
        text: "Overweight",
        color: "bg-yellow-500 text-black font-normal",
      };
    } else {
      return { text: "Obesity", color: "bg-red-700" };
    }
  };

  const indicator = rangeIndicator();

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md text-white flex-2">
      <h2 className="text-2xl font-semibold">BMI Report</h2>

      {bmi ? (
        <>
          <h2 className="text-7xl mt-3 font-bold">
            {Math.floor(bmi)}
            <span className="text-4xl text-gray-300">.{(bmi + "").split(".")[1]}</span>
          </h2>
          <p
            className={`text-sm font-medium px-4 py-1 rounded-md mt-3 w-fit ${indicator.color}`}
          >
            {indicator.text}
          </p>
        </>
      ) : (
        <p className="mt-3 text-gray-300">
          Enter your details to calculate BMI.
        </p>
      )}
    </div>
  );
};

export default Results;

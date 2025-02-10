import History from "./History";

const Results = ({ bmi, indicator, finalData }) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md text-white flex-2">
      <h2 className="text-2xl font-semibold">BMI Report</h2>

      {bmi ? (
        <>
          <h2 className="text-7xl mt-3 font-bold">
            {Math.floor(bmi)}
            <span className="text-4xl text-gray-300">
              .{(bmi + "").split(".")[1]}
            </span>
          </h2>
          <p
            className={`text-sm font-medium px-4 py-1 rounded-md mt-3 w-fit ${indicator.color}`}
          >
            {indicator.text}
          </p>
        </>
      ) : (
        <p className="mt-3 text-gray-300">
          Enter your Weight and Height to calculate BMI.
        </p>
      )}
      <div className="mt-5">
        <History finalData={finalData} />
      </div>
    </div>
  );
};

export default Results;

import Togglebar from "./Togglebar";
import { useState, useEffect } from "react";

const Calculation = ({ data, setData, dataToggle, setDataToggle }) => {
  const [imperialInputs, setImperialInputs] = useState({ weight: "", height: "" });
  const [metricInputs, setMetricInputs] = useState({ weight: "", height: "" });

  const displayWeight = dataToggle ? metricInputs.weight : imperialInputs.weight;
  const displayHeight = dataToggle ? metricInputs.height : imperialInputs.height;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (dataToggle) {
      setMetricInputs(prev => ({ ...prev, [name]: value }));
      
      setData(prev => ({
        ...prev,
        weight: name === "weight" ? value : prev.weight,
        height: name === "height" ? value : prev.height,
      }));
    } else {
      setImperialInputs(prev => ({ ...prev, [name]: value }));
      
      if (name === "weight") {
        setData(prev => ({
          ...prev,
          weight: (parseFloat(value) / 2.2046).toFixed(2),
        }));
      } else if (name === "height") {
        setData(prev => ({
          ...prev,
          height: (parseFloat(value) * 2.54).toFixed(2),
        }));
      }
    }
  };

  useEffect(() => {
    if (dataToggle) {
      setImperialInputs({ weight: "", height: "" }); 
    } else {
      setMetricInputs({ weight: "", height: "" }); 
    }
  }, [dataToggle]);

  const handleBMIData = (e) => {
    e.preventDefault();
    const weight = parseFloat(data.weight);
    const heightInMeters = parseFloat(data.height) / 100;

    if (!weight || !heightInMeters || heightInMeters <= 0) {
      alert("Please enter valid values for weight and height.");
      return;
    }

    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setData(prev => ({ ...prev, bmi }));
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md max-h-fit md:flex-1 flex-auto">
      <form onSubmit={handleBMIData}>
        <label htmlFor="weight">Your weight in {dataToggle ? "kg" : "lbs"}:</label>
        <input
          type="number"
          name="weight"
          placeholder={dataToggle ? "80" : "176.37"}
          value={displayWeight}
          onChange={handleInputChange}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full mb-5 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="height">Your height in {dataToggle ? "cm" : "inches"}:</label>
        <input
          type="number"
          name="height"
          placeholder={dataToggle ? "184" : "72.44"}
          value={displayHeight}
          onChange={handleInputChange}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />
        <div className="mt-4">
          <p>Units:</p>
          <div className="flex gap-3 mt-2 items-center">
            <span className={`text-sm ${dataToggle ? "text-white" : "text-gray-400"}`}>
              Metric (cm, kg)
            </span>
            <Togglebar dataToggle={dataToggle} setDataToggle={setDataToggle} />
            <span className={`text-sm ${dataToggle ? "text-gray-400" : "text-white"}`}>
              Imperial (inches, lbs)
            </span>
          </div>
        </div>
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
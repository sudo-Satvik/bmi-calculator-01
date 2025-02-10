import { useEffect, useState } from "react";
import Calculation from "./components/Calculation";
import Results from "./components/Results";

const App = () => {
  const [data, setData] = useState({
    weight: "",
    height: "",
    bmi: null,
  });
  const [toggle, setToggle] = useState(true);
  const [finalData, setFinalData] = useState([]);

  function rangeIndicator() {
    if (!data.bmi) return { text: "No BMI calculated", color: "bg-gray-500" };

    if (data.bmi < 18.5) {
      return { text: "Underweight", color: "bg-blue-600" };
    } else if (data.bmi >= 18.5 && data.bmi <= 24.9) {
      return { text: "Healthy weight", color: "bg-green-600" };
    } else if (data.bmi >= 25 && data.bmi <= 29.9) {
      return {
        text: "Overweight",
        color: "bg-yellow-500 text-black font-normal",
      };
    } else {
      return { text: "Obesity", color: "bg-red-700" };
    }
  }

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setFinalData(existingData);
  }, []);

  useEffect(() => {
    if (data.bmi) {
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const category = (() => {
        if (data.bmi < 18.5) {
          return { text: "Underweight", color: "bg-blue-600" };
        } else if (data.bmi >= 18.5 && data.bmi <= 24.9) {
          return { text: "Healthy weight", color: "bg-green-600" };
        } else if (data.bmi >= 25 && data.bmi <= 29.9) {
          return {
            text: "Overweight",
            color: "bg-yellow-500 text-black font-normal",
          };
        } else {
          return { text: "Obesity", color: "bg-red-700" };
        }
      })();

      const newRecord = {
        weight: data.weight,
        height: data.height,
        bmi: data.bmi,
        category,
        date: today,
      };

      setFinalData((prevData) => {
        const isDuplicate = prevData.some(
          (record) =>
            record.weight === newRecord.weight &&
            record.height === newRecord.height &&
            record.bmi === newRecord.bmi
        );

        if (!isDuplicate) {
          const updatedData = [...prevData, newRecord];
          localStorage.setItem("bmiHistory", JSON.stringify(updatedData));
          return updatedData;
        }

        return prevData;
      });
    }
  }, [data.bmi, data.weight, data.height]);

  const indicator = rangeIndicator();

  return (
    <>
      <h1 className="text-white text-4xl font-semibold my-5 text-center">
        BMI Calculator
      </h1>
      <div className="flex md:flex-row flex-col justify-center max-w-[1400px] mx-auto gap-5">
        <Calculation
          data={data}
          setData={setData}
          dataToggle={toggle}
          setDataToggle={setToggle}
        />
        <Results
          bmi={data.bmi}
          toggle={toggle}
          indicator={indicator}
          finalData={finalData}
        />
      </div>
    </>
  );
};

export default App;

import { useState } from "react";
import Calculation from "./components/Calculation";
import Results from "./components/Results";

const App = () => {
  const [data, setData] = useState({
    weight: "",
    height: "",
    bmi: null,
  });
  
  return (
    <>
      <h1 className="text-white text-4xl font-semibold my-5 text-center">
        BMI Calculator
      </h1>
      <div className="flex md:flex-row flex-col justify-center max-w-[1400px] mx-auto gap-5">
        <Calculation data={data} setData={setData} />
        <Results bmi={data.bmi} />
      </div>
    </>
  );
};

export default App;

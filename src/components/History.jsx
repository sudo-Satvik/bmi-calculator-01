import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const History = () => {
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setStoredData(savedData);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("bmiHistory");
    setStoredData([]); // Clear the state as well
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("BMI Calculation History", 14, 20);

    const tableColumn = ["Weight", "Height", "BMI", "Category", "Date"];
    const tableRows = storedData.map((record) => [
      `${record.weight} kg`,
      `${record.height} cm`,
      record.bmi,
      record.category.text,
      record.date,
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
    });

    doc.save("bmi_history.pdf");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your previous records:</h1>

      <div className="max-h-64 overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 mt-3">
          <thead className="text-xs uppercase bg-gray-600 text-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Weight
              </th>
              <th scope="col" className="px-6 py-3">
                Height
              </th>
              <th scope="col" className="px-6 py-3">
                BMI
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {storedData.map((record, index) => (
              <tr
                key={index}
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4">{record.weight} kg</td>
                <td className="px-6 py-4">{record.height} cm</td>
                <td className="px-6 py-4">{record.bmi}</td>
                <td className="px-6 py-4">{record.category.text}</td>
                <td className="px-6 py-4">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {storedData.length > 0 && (
        <div className="mt-6 flex space-x-4">
          <button
            className="btn bg-red-900 px-4 py-2 rounded-md cursor-pointer hover:bg-red-800 transition-colors"
            onClick={handleClearHistory}
          >
            Clear History
          </button>
          <button
            className="btn bg-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={exportToPDF}
          >
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default History;

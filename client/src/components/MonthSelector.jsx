import React from "react";
import moment from "moment";

const months = moment.months();
const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const handleSelectMonth = (e) => {
    console.log(e.target.value);
    setSelectedMonth(e.target.value);
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <span>Select Month: </span>
      <select value={selectedMonth} onChange={handleSelectMonth}>
        {months.map((month, index) => (
          <option value={index} key={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};
export { MonthSelector };

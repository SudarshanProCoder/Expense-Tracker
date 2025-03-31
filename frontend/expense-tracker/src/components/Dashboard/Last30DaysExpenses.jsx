import React, { useState } from "react";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>
    </div>
  );
};

export default Last30DaysExpenses;

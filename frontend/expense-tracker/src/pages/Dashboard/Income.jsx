import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";

function Income() {
  const [incomeData, setIncomeData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openDeleteAltert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  //fetch all income details
  const fetchIncomeDetails = async () => {};
  //Handle Add income
  const handleAddIncome = async (income) => {};
  // Delete Income
  const deleteIncome = async (id) => {};
  //handle Download income details
  const handleDownloadIncomeDetails = async () => {};

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onaAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Income;

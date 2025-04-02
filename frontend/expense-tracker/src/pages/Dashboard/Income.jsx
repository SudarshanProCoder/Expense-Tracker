import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstence from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Model from "../../components/Model";
import AddIncomeForm from "../../components/Income/AddIncomeForm";

function Income() {
  const [incomeData, setIncomeData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openDeleteAltert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  //fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstence.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  //Handle Add income
  const handleAddIncome = async (income) => {};
  // Delete Income
  const deleteIncome = async (id) => {};
  //handle Download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);
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
        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onaAddIncome={handleAddIncome} />
        </Model>
      </div>
    </DashboardLayout>
  );
}

export default Income;

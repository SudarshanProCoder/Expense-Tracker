import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstence from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openDeleteAltert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  //fetch all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstence.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstence.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModel(false);
      toast.success("Income added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Something went wrong. Error adding income");
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstence.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting income.",
        error.response?.data?.message || error.message
      );
    }
  };
  //handle Download expense details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;

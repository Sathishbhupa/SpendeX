import React from "react";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };

  return (
    <div className="mt-3 w-full overflow-x-auto">
      <h2 className="font-bold text-lg">Latest Expenses</h2>

      {/* Table Header */}
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] bg-slate-200 p-2 mt-3 rounded-t-xl">
        <h2 className="font-bold text-center">Name</h2>
        <h2 className="font-bold text-center">Amount</h2>
        <h2 className="font-bold text-center">Date</h2>
        <h2 className="font-bold text-center">Action</h2>
      </div>

      {/* Table Rows */}
      {expensesList.map((expenses) => (
        <div
          key={expenses.id}
          className="grid grid-cols-[repeat(4,minmax(0,1fr))] bg-slate-50 p-2 gap-2 border-b"
        >
          <h2 className="text-center break-words">{expenses.name}</h2>
          <h2 className="text-center break-words">₹{expenses.amount}</h2>
          <h2 className="text-center break-words">{expenses.createdAt}</h2>
          <h2
            onClick={() => deleteExpense(expenses)}
            className="text-red-500 cursor-pointer text-center hover:underline"
          >
            Delete
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;

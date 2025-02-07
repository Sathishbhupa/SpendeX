'use client'

import React from "react";
import { toast } from "sonner";

const DownloadExpensesButton = ({ expensesList }) => {
  const downloadCurrentMonthExpenses = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    console.log("Current Month:", currentMonth);
    console.log("Current Year:", currentYear);

    // Filter expenses for the current month
    const currentMonthExpenses = expensesList.filter((expense) => {
      const [day, month, year] = expense.createdAt.split("/").map(Number); 
      console.log(`Parsed Date - Day: ${day}, Month: ${month}, Year: ${year}`);

      return month === currentMonth && year === currentYear;
    });

    console.log("Filtered Expenses:", currentMonthExpenses);

    if (currentMonthExpenses.length === 0) {
      toast("No expenses found for the current month.");
      return;
    }

    // Convert to CSV format
    let csvContent = "Name,Amount,Date\n";
    currentMonthExpenses.forEach((expense) => {
      csvContent += `${expense.name},${expense.amount},${expense.createdAt}\n`;
    });

    // Create a Blob and trigger a download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Expenses_${currentYear}-${currentMonth}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCurrentMonthExpenses}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
    >
      Download Current Month Expenses
    </button>
  );
};

export default DownloadExpensesButton;

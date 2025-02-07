import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";

const DownloadExpensesButton = ({ expensesList }) => {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    // Calculate days left in the current month
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysRemaining = lastDayOfMonth.getDate() - today.getDate();

    setDaysLeft(daysRemaining);
  }, []);

  const downloadCurrentMonthExpenses = () => {
    if (!expensesList || !Array.isArray(expensesList)) {
      toast.error("No expenses data available to download.");
      return;
    }

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const currentMonthExpenses = expensesList.filter((expense) => {
      if (!expense.createdAt) return false;

      const [day, month, year] = expense.createdAt.split("/").map(Number);
      return month === currentMonth && year === currentYear;
    });

    if (currentMonthExpenses.length === 0) {
      toast("No expenses found for the current month.");
      return;
    }

    let csvContent = "Name,Amount,Date\n";
    currentMonthExpenses.forEach((expense) => {
      csvContent += `${expense.name},${expense.amount},${expense.createdAt}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Expenses_${currentYear}-${currentMonth}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Reminder Message */}
      {daysLeft !== null && (
        <p className="text-red-600 font-medium mb-3">
          {daysLeft > 0
            ? `Reminder: Download your report before the month ends! (${daysLeft} day${daysLeft > 1 ? "s" : ""} left)`
            : "It's the last day of the month! Don't forget to download your report!"}
        </p>
      )}

      <button onClick={downloadCurrentMonthExpenses} className="button mt-10 flex gap-2 items-center">
      <Download className="w-4  text-blue-800" />
          <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Download Current Month Expenses</span>
          </span>
      </button>
    </div>
  );
};

export default DownloadExpensesButton;

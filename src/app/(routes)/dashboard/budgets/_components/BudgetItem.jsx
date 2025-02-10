import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div
        className="p-5 border rounded-2xl hover:shadow-md cursor-pointer min-h-[170px] 
                   flex flex-col justify-between 
                   w-full w-[390px] sm:max-w-full"
      >
        {/* Top Section: Title and Amount */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Icon and Budget Details */}
          <div className="flex gap-2 items-center flex-wrap">
            <h2 className="text-2xl p-3 px-4 bg-red-50 rounded-full flex-shrink-0">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold text-base truncate">{budget.name}</h2>
              <h2 className="text-sm text-gray-500 truncate">{budget.totalItem} Item</h2>
            </div>
          </div>

          {/* Budget Amount */}
          <h2 className="font-bold text-blue-500 text-lg whitespace-nowrap">
            ₹{budget.amount}
          </h2>
        </div>

        {/* Bottom Section: Spend and Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400 whitespace-nowrap">
              ₹{budget.totalSpend || 0} Spend
            </h2>
            <h2 className="text-xs text-slate-400 whitespace-nowrap">
              ₹{budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="bg-black h-2 rounded-full"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;

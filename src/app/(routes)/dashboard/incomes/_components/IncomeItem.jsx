import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "src/components/ui/alert-dialog";
import { Button } from "src/components/ui/button";
import { Trash } from "lucide-react";

function IncomeItem({ budget, onDelete }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div
      className="p-5 border rounded-2xl
      hover:shadow-md cursor-pointer min-h-[170px]
      flex flex-col w-[430px] max-w-full mx-auto"
    >
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Left Section: Icon and Details */}
        <div className="flex gap-2 items-center">
          <h2
            className="text-2xl p-3 px-4
            bg-red-50 rounded-full"
          >
            {budget.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>

        {/* Right Section: Amount */}
        <h2 className="font-bold text-blue-500 text-lg">₹{budget.amount}</h2>

        {/* Delete Button */}
        <div className="flex gap-2 items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Income</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this income? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(budget)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;

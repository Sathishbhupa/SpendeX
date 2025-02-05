// // import React from 'react';

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { db } from '../../../../../../utils/dbConfig';
// import { Expenses, Budgets } from '../../../../../../utils/schema';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment';
// import { eq, gte, lte, and } from "drizzle-orm";
// import { Download, Calendar } from 'lucide-react';

// const Monthlyreport = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       getExpenses();
//     }
//   }, [user]);

// const getExpenses = async () => {
//     const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
//     const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
  
//     const result = await db
//       .select({
//         id: Expenses.id,
//         name: Expenses.name,
//         createdAt: Expenses.createdAt,
//         amount: Expenses.amount,
//       })
//       .from(Expenses)
//       .innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id)) // Join with Budgets
//       .where(
//         and(
//           gte(Expenses.createdAt, startOfMonth),
//           lte(Expenses.createdAt, endOfMonth),
//           eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress) // Filter by Budgets.createdBy
//         )
//       );


//     setExpenses(result);
//     setTotalExpenses(result.reduce((acc, expense) => acc + expense.amount, 0));
//   };
  
//   const downloadReport = () => {
//     const csvContent = `Name, Created At, Amount\n${expenses.map(
//       (expense) => `${expense.name}, ${expense.createdAt}, ${expense.amount}`
//     ).join('\n')}`;
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `monthly-report-${moment().format('YYYY-MM')}.csv`;
//     a.click();
//   };

//   return (
//     <div>
//       <h2 className="flex gap-2 items-center">
//         <Calendar className="w-4" /> Monthly Report
//       </h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Created At</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense) => (
//             <tr key={expense.id}>
//               <td>{expense.name}</td>
//               <td>{expense.createdAt.toString()}</td>
//               <td>{expense.amount}</td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <th>Total</th>
//             <th></th>
//             <th>{totalExpenses}</th>
//           </tr>
//         </tfoot>
//       </table>
//       <button onClick={downloadReport} className="flex gap-2 items-center">
//         <Download className="w-4" /> Download Report
//       </button>
//     </div>
//   );
// };

// export default Monthlyreport;


// // <button class="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
// //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Download"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#f1f1f1" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" id="Vector"></path> </g> </g></svg>
// //   Download
// //   <div class="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
// //     Download
// //   </div>
// // </button>

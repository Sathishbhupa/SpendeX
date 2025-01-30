import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  CircleDollarSign,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    }, 
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border bg-white sticky top-0">
      <Link href={"/"}>
        <div className="flex flex-row items-center">
          <Image src={"/logo.png"} alt="logo" width={25} height={25} />
          <span className="text-blue-800 font-bold text-xl ml-2">SpendeX</span>
        </div>
      </Link>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center
                    text-blue-600 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-full
                    hover:text-black hover:bg-blue-100
                    ${path == menu.path && "text-black bg-blue-200"}
                    `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      <div
        className="sticky mt-72 p-5 flex gap-2
            items-center"
      >
        <UserButton classname ="bg-blue-500 " />
        <h2 className='cursor-default'>Profile</h2>
      </div>
      </div>
      
    </div>
  );
}

export default SideNav;

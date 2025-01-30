"use client";
import React, { useState, useEffect, useRef } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setIsSideNavOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-[auto,1fr] h-screen">
      {/* Responsive SideNav */}
      <div
        ref={sideNavRef}
        className={`fixed md:static md:w-64 lg:w-72 inset-y-0 left-0 z-50 transform ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-64 lg:w-72 static`}
      >
        <SideNav onMenuSelect={() => setIsSideNavOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* DashboardHeader */}
        <div className="flex items-center justify-between bg-white shadow-md sticky top-0 z-8">
          {/* Menu Button for Small Screens */}
          <button
            className="md:hidden ml-5 mb-3 p-2 border-2 rounded-3xl"
            onClick={() => setIsSideNavOpen((prev) => !prev)}
          >
            <Menu className="w-6 h-6 " />
          </button>
          <div></div>
          <DashboardHeader />
        </div>
        <hr />
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;

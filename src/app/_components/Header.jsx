"use client";
import React from "react";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import { useUser, UserButton} from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center shadow-sm navbackground-image">
      <div className="flex flex-row items-center">
        <Image src={"/logo.png"} alt="logo" width={25} height={25} />
        <span className="text-blue-800  font-bold text-xl cursor-pointer ml-2">  SpendeX</span>
      </div>
      
        <div className="flex gap-3  items-center">
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant="outline" className="rounded-full text-primary">
              Dashboard
            </Button>
          </Link>
          {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button className="rounded-full">Login</Button>
          </Link>
        
      )}</div>
    </div>
  );
}

export default Header;

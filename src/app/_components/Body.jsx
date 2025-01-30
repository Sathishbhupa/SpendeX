"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "src/components/ui/3d-card.jsx";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Particles from "react-tsparticles";

function Body() {
  const { isSignedIn } = useUser();
  return (
    <section
      style={{
        backgroundImage: "linear-gradient(to bottom right, #4567b7, #8bc34a)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 50 },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
              size: { value: 4 },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                outMode: "out",
              },
            },
            background: {
              color: "transparent",
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            background:
              "linear-gradient(-45deg, #0072ff, #00c6ff, #89f7fe, #66a6ff)",
            backgroundSize: "400% 400%",
            animation: "gradientBackground 15s ease infinite",
          }}
        ></div>
      </div>
      <CardContainer className="inter-var">
        <CardBody
          className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
        >
          <CardItem
            translateZ="50"
            className="text-blue-800 font-bold text-xl dark:text-white shadow-text"
          >
            Finance Advisor
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 shadow-text"
          >
            Manage your Money with AI-Driven Personal.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/dashboard.jpg"
              height="1000"
              width="1000"
              className="h-60 w-full object-fit rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-center items-center mt-20">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                <span>Dive in 👉👉</span>
              </Link>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <div style={{ height: "10vh" }} />
    </section>
  );
}

export default Body;

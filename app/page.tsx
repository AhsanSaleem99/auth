"use client";

import { motion } from "motion/react";
import React from "react";

const container = {
  hidden: { opacity: 0.9 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

const Home = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900
 text-neutral-100"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <motion.div variants={container} className="space-y-8">
          <motion.span
            variants={item}
            className="inline-flex items-center rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400"
          >
            Secure • Role-based • Scalable
          </motion.span>
          <motion.h1
            variants={item}
            className="text-5xl font-semibold tracking-tight leading-tight"
          >
            Authentication built
            <br />
            form modern web apps
            {/* <span className="text-blue-500">Authentication App</span> */}
          </motion.h1>

          <motion.p variants={item} className="text-neutral-400 max-w-md">
            A clean and secure authentication system with role-based access,
            admin controls, and modern UI patterns.
          </motion.p>

          <motion.div variants={item} className="flex items-center gap-4">
            <button className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200 transition">
              Get Started
            </button>

            <button className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium border border-neutral-800 hover:bg-neutral-900 transition">
              View demo
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={item} className="hidden md:block">
          <div className="h-[420px] w-full rounded-xl border border-neutral-800 bg-neutral-900 p-6 flex flex-col gap-4 animate-pulse">
            <div className="w-full h-6 bg-neutral-700 rounded-md"></div>
            <div className="w-full h-6 bg-neutral-700 rounded-md"></div>
            <div className="w-2/3 h-6 bg-neutral-700 rounded-md"></div>
            <div className="flex gap-2 mt-4 w-full">
              <div className="flex-1 h-4 bg-neutral-700 rounded-md"></div>
              <div className="flex-1 h-4 bg-neutral-700 rounded-md"></div>
              <div className="flex-1 h-4 bg-neutral-700 rounded-md"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;

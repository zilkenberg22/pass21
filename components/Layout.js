import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { getChildrenHeight } from "@/lib/tools";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  let maxHeight = getChildrenHeight();
  return (
    <div>
      <Head>
        <title>Password Manager</title>
      </Head>
      <Navbar />
      <main style={{ height: `${maxHeight}px` }} className="flex">
        <div className="w-[15%] bg-[#f4f1ed]">
          <Sidebar />
        </div>
        <div className="w-[85%]">{children}</div>
      </main>
    </div>
  );
}

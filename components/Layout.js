import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { getChildrenHeight } from "@/lib/tools";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const { data: session } = useSession();
  let maxHeight = getChildrenHeight();

  return (
    <div>
      <Head>
        <title>Password Manager</title>
      </Head>
      {session ? (
        <>
          <Navbar />
          <main style={{ height: `${maxHeight}px` }} className="flex">
            <div className="w-[20%] bg-[#f4f1ed] hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full  md:w-[80%] p-4">{children}</div>
          </main>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

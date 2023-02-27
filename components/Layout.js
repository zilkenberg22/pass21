import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { getChildrenHeight } from "@/lib/tools";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  let maxHeight = getChildrenHeight();
  const { data: session } = useSession();

  console.log(session, "session--LAYOUT");
  return (
    <div>
      <Head>
        <title>Password Manager</title>
      </Head>
      {session ? (
        <>
          <Navbar />
          <main style={{ height: `${maxHeight}px` }} className="flex">
            <div className="w-[15%] bg-[#f4f1ed]">
              <Sidebar />
            </div>
            <div className="w-[85%]">{children}</div>
          </main>
        </>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

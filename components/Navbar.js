import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div id="Navbar" className="flex justify-between items-center p-5">
      <div className="flex items-center gap-2">
        <Image
          src="/icon.svg"
          alt="Picture of the author"
          width={30}
          height={30}
        />
        <h2 className="font-semibold text-xl">Save data</h2>
      </div>
      <div className="flex gap-5">
        <span>{session?.user?.email}</span>
        {session && (
          <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
        )}
      </div>
    </div>
  );
}

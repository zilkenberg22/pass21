import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div id="Navbar" className="flex justify-between items-center p-5">
      <div>
        <h1>Password Manager</h1>
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

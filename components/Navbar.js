import React, { useState } from "react";
import { Drawer } from "antd";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "./Sidebar";
import Icon from "./Icon";

export default function Navbar() {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  return (
    <div id="Navbar" className="flex justify-between items-center p-5">
      <div className="flex items-center gap-2">
        <Image
          src="/icon.svg"
          alt="Picture of the author"
          width={30}
          height={30}
        />
        <h2 className="font-semibold text-xl hidden md:block">Save data</h2>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:account-outline" className="text-2xl" />
          <span>{session?.user?.email}</span>
        </div>
        {session && (
          <button
            className="flex gap-2 items-center border rounded p-2 text-base font-semibold"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <Icon icon="mdi:logout" className="text-xl" />
            Logout
          </button>
        )}
        <button className="block md:hidden" onClick={() => setOpen(!open)}>
          <Icon icon="mdi:menu" className="text-xl" />
        </button>
      </div>
      <Drawer placement="right" open={open} onClose={() => setOpen(false)}>
        <Sidebar onClose={() => setOpen(false)} open={open} />
      </Drawer>
    </div>
  );
}

import Icon from "@/components/Icon";
import PasswordGenerator from "@/src/PasswordGenerator";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const sectionStyle = {
  backgroundImage: `url(/landing-screen.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
};

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    let navbar;
    if (typeof document !== "undefined") {
      navbar = document && document.querySelector("#homeHeader");
    }
    let navbarHeight = 0;
    if (navbar) {
      navbarHeight = navbar.offsetHeight;
    }
    setMaxHeight(window.innerHeight - navbarHeight);
  }, []);

  return (
    <div className="">
      {/* Header */}
      <div
        id="homeHeader"
        className="bg-white fixed w-full left-0 top-0 flex items-center justify-between px-10 py-4 h-[68px]"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="Picture of the author"
            width={30}
            height={30}
          />
          <h2 className="font-semibold text-xl">Save data</h2>
        </div>
        <Link href="/auth/login" className="flex items-center gap-3">
          <span className="text-lg font-medium text-blue-600">Sign In</span>
          <Icon icon="mdi:account-circle-outline" className="text-3xl" />
        </Link>
      </div>

      <div style={{ height: `${maxHeight}px` }} className="mt-[68px]">
        <section className="h-full" style={sectionStyle}>
          <div className="flex gap-4 uppercase w-full justify-center text-sm md:text-lg font-semibold tracking-widest text-white pt-2 cursor-pointer">
            <div
              className={`${
                selectedMenu === 0 && "border-b-4 border-yellow-400"
              } py-3`}
              onClick={() => setSelectedMenu(0)}
            >
              Password Manager
            </div>
            <div
              className={`${
                selectedMenu === 1 && "border-b-4 border-yellow-400"
              } py-3`}
              onClick={() => setSelectedMenu(1)}
            >
              Password Generator
            </div>
          </div>

          {selectedMenu === 0 ? (
            <div
              style={{ height: `${maxHeight}px` }}
              className="flex flex-col justify-center items-center text-white -mt-[68px]"
            >
              <div className="flex text-6xl">
                <div className="">Save Data</div>
                <div>Password Manager</div>
              </div>
              <div className="text-3xl">Secure. Smart. Simple.</div>
            </div>
          ) : (
            selectedMenu === 1 && (
              <div
                style={{ height: `${maxHeight - 68}px` }}
                className="bg-gradient-to-b from-gray-50 to-white opacity-[0.9] flex justify-center items-center"
              >
                <PasswordGenerator />
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}

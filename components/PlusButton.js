import React from "react";
import Icon from "./Icon";

export default function PlusButton({ onClick }) {
  return (
    <button
      className="h-[64px] w-[64px] cursor-pointer bg-[#feeb29] rounded-full border-[3px] border-[#242424] shadow-lg flex items-center justify-center fixed right-6 bottom-6 md:right-24 md:bottom-14"
      onClick={() => onClick()}
    >
      <Icon icon="mdi:plus" className="text-6xl" />
    </button>
  );
}

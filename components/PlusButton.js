import React from "react";

export default function PlusButton({ onClick }) {
  return (
    <button
      className="h-[64px] w-[64px] cursor-pointer bg-[#feeb29] rounded-full border-[3px] border-[#242424] shadow-lg flex items-center justify-center fixed right-6 bottom-6 md:right-24 md:bottom-14"
      onClick={() => onClick()}
    >
      <svg
        className="sc-hLBbgP jxEncj sc-fEXmlR"
        width="31.72"
        height="31.72"
        viewBox="0 0 32 32"
      >
        <g>
          <path
            fill="currentColor"
            d="M15.9998 0.640015C17.4137 0.640015 18.5598 1.78617 18.5598 3.20001L18.5598 28.8C18.5598 30.2139 17.4137 31.36 15.9998 31.36C14.586 31.36 13.4398 30.2139 13.4398 28.8L13.4398 3.20001C13.4398 1.78617 14.586 0.640014 15.9998 0.640015Z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
          <path
            fill="currentColor"
            d="M31.3599 16.0001C31.3599 17.4139 30.2137 18.5601 28.7999 18.5601L3.19986 18.5601C1.78601 18.5601 0.639862 17.4139 0.639862 16.0001C0.639862 14.5862 1.78601 13.4401 3.19986 13.4401L28.7999 13.4401C30.2137 13.4401 31.3599 14.5862 31.3599 16.0001Z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </g>
      </svg>
    </button>
  );
}

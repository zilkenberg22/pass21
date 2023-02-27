import { useState } from "react";
import Link from "next/link";

const menu = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m19.65 9.04l-4.84-.42l-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73l3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
        />
      </svg>
    ),
    name: "Favorites",
    count: 0,
    href: "#",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78A7.893 7.893 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.928 7.928 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.5-1.64 4.83M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6m0 5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 8a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 11Z"
        />
      </svg>
    ),
    name: "Logins",
    count: 0,
    href: "/logins",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16 13.5q.65 0 1.075-.425T17.5 12q0-.65-.425-1.075T16 10.5q-.65 0-1.075.425T14.5 12q0 .65.425 1.075T16 13.5ZM5 19V5v14Zm0 2q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .825-.588 1.413T19 21H5Zm8-4q-.825 0-1.413-.588T11 15V9q0-.825.588-1.413T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.588 1.413T20 17h-7Zm7-2V9h-7v6h7Z"
        />
      </svg>
    ),
    name: "Wallets",
    count: 0,
    href: "#",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 7.35q3.05-2.8 4.525-5.088T18 10.2q0-2.725-1.738-4.462T12 4Q9.475 4 7.737 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35ZM12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.5-1.988 5.438T12 22Zm0-11.8Z"
        />
      </svg>
    ),
    name: "Address",
    count: 0,
    href: "#",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10.5 20h3q.2 0 .35-.15t.15-.35q0-.2-.15-.35T13.5 19h-3q-.2 0-.35.15t-.15.35q0 .2.15.35t.35.15ZM7 23q-.825 0-1.413-.588T5 21V3q0-.825.588-1.413T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.588 1.413T17 23H7Zm0-7h10V6H7v10Zm0 2v3h10v-3H7ZM7 4h10V3H7v1Zm0-1v1v-1Zm0 18v-3v3Z"
        />
      </svg>
    ),
    name: "Phones",
    count: 0,
    href: "#",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 19h14V9.825L14.175 5H5v14Zm0 2q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h10l6 6v10q0 .825-.588 1.413T19 21H5Zm2-4h10v-2H7v2Zm0-4h10v-2H7v2Zm0-4h7V7H7v2ZM5 19V5v14Z"
        />
      </svg>
    ),
    name: "Notes",
    count: 0,
    href: "#",
  },
];

export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState(1);

  return (
    <div>
      <div className="m-8 flex items-center text-center">
        <h2>Password Manager</h2>
      </div>
      <div className="p-4">
        {menu.map((x, i) => (
          <Link href={x.href}>
            <div
              key={i}
              className={`flex py-2 px-4 justify-between rounded-lg mb-2 ${
                selectedMenu === i ? "bg-[#feeb29]" : "bg-white"
              } ${selectedMenu !== i && "hover:bg-[#ffffff99]"}`}
              onClick={() => setSelectedMenu(i)}
            >
              <div className="flex gap-4">
                {x.icon}
                <div className="font-semibold">{x.name}</div>
              </div>
              <div className="font-semibold">{x.count}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

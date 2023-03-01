import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const menu = [
  {
    icon: <Icon icon="mdi:star-outline" className="text-2xl" />,
    name: "Favorites",
    count: 0,
    href: "/favorites",
  },
  {
    icon: <Icon icon="mdi:account-circle-outline" className="text-2xl" />,
    name: "Logins",
    count: 0,
    href: "/logins",
  },
  {
    icon: <Icon icon="mdi:wallet-outline" className="text-2xl" />,
    name: "Wallets",
    count: 0,
    href: "/wallets",
  },
  {
    icon: <Icon icon="mdi:map-marker-outline" className="text-2xl" />,
    name: "Address",
    count: 0,
    href: "/address",
  },
  {
    icon: <Icon icon="mdi:card-account-phone-outline" className="text-2xl" />,
    name: "Phones",
    count: 0,
    href: "/phones",
  },
  {
    icon: <Icon icon="mdi:note-text-outline" className="text-2xl" />,
    name: "Notes",
    count: 0,
    href: "/notes",
  },
];

export default function Sidebar(props) {
  const [selectedMenu, setSelectedMenu] = useState(1);

  return (
    <div>
      <div className="m-8 flex items-center text-center">
        <h2>Password Manager</h2>
      </div>
      <div className="p-4">
        {menu.map((x, i) => (
          <Link href={x.href} key={`${i}side`}>
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

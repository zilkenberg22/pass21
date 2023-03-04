import React, { useState } from "react";

export default function PagesHeader({ title }) {
  const [search, setSearch] = useState("");

  return (
    <div className="md:flex md:justify-between items-center mb-10">
      <div className="text-lg font-semibold">{title}</div>
      <input
        type="text"
        placeholder="Search for username and website"
        className="w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none md:w-3/5"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

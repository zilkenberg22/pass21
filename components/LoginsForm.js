import React, { useEffect, useState } from "react";

export default function LoginsForm({ back, editData }) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editData !== null) {
      setEdit(true);
      setFormData({ ...editData });
    }
  }, [editData]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button onClick={() => back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
              />
            </svg>
          </button>
          <div className="text-xl font-bold text-gray-600">
            {!edit ? "Add A Login" : formData.website}
          </div>
        </div>
        <div className="flex gap-3">
          <div
            className="cursor-pointer rounded-3xl px-4 text-base leading-9 min-w-[120px] flex justify-center border-[3px] border-[#242424] hover:bg-[#242424] hover:text-[white]"
            onClick={() => back()}
          >
            <strong>Cancel</strong>
          </div>
          <div className="cursor-pointer rounded-3xl bg-[#feeb29] hover:bg-[#fff488] px-4 text-base leading-9 min-w-[120px] flex justify-center border-[3px] border-[#242424]">
            <strong>Save</strong>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            required
            value={formData.website}
          />
          <input type="text" placeholder="URL" value={formData.url} />
          <input
            type="email"
            placeholder="Username"
            required
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
          />
          <textarea type="text" placeholder="Notes" value={formData.notes} />
        </form>
      </div>
    </div>
  );
}

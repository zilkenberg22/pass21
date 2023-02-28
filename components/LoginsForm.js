import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { loginsForm_validate } from "@/lib/validate";
import { openNotification } from "@/lib/tools";

export default function LoginsForm({ back, editData }) {
  const { data: session } = useSession();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {},
    validate: loginsForm_validate,
    onSubmit,
  });

  useEffect(() => {
    if (editData !== null) {
      setEdit(true);
      formik.setValues({ ...editData });
    }
  }, []);

  async function onSubmit(values) {
    try {
      values.user = session?.user?._id;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch("/api/logins", options)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            openNotification({
              type: "error",
              title: "Алдаа",
              message: data.message,
            });
          }
          if (data.status) {
            openNotification({
              type: "success",
              title: "Амжилттай",
              message: data.message,
            });
            back();
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  function cancel() {
    setEdit(false);
    setFormData({});
    back();
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button onClick={() => cancel()}>
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
            onClick={() => cancel()}
          >
            <strong>Cancel</strong>
          </div>
          <button
            form="loginsForm"
            htmlType="submit"
            className="cursor-pointer rounded-3xl bg-[#feeb29] hover:bg-[#fff488] px-4 text-base leading-9 min-w-[120px] flex justify-center border-[3px] border-[#242424]"
          >
            <strong>Save</strong>
          </button>
        </div>
      </div>
      <div className="mt-5">
        <form
          id="loginsForm"
          className="flex flex-col gap-3 w-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex w-full gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex justify-between">
                <label className="font-medium">Website</label>
                <span className="text-red-500">
                  {formik.errors.website && formik.errors.website}
                </span>
              </div>
              <input
                id="website"
                type="text"
                name="website"
                autoComplete="off"
                className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                  formik.errors.website &&
                  formik.touched.website &&
                  "border-rose-600"
                }`}
                {...formik.getFieldProps("website")}
              />
            </div>
            <div className="flex flex-col gap-2  w-1/2">
              <div className="flex justify-between">
                <label className="font-medium">URL</label>
                <span className="text-red-500">
                  {formik.errors.url && formik.errors.url}
                </span>
              </div>
              <input
                id="url"
                type="text"
                name="url"
                autoComplete="off"
                className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                  formik.errors.url && formik.touched.url && "border-rose-600"
                }`}
                {...formik.getFieldProps("url")}
              />
            </div>
          </div>

          <div className="flex w-full gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex justify-between">
                <label className="font-medium">Email</label>
                <span className="text-red-500">
                  {formik.errors.email && formik.errors.email}
                </span>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="off"
                className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                  formik.errors.email &&
                  formik.touched.email &&
                  "border-rose-600"
                }`}
                {...formik.getFieldProps("email")}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex justify-between">
                <label className="font-medium">Password</label>
                <span className="text-red-500">
                  {formik.errors.password && formik.errors.password}
                </span>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
                className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                  formik.errors.password &&
                  formik.touched.password &&
                  "border-rose-600"
                }`}
                {...formik.getFieldProps("password")}
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px]"
                  onClick={() => setShowPassword(!showPassword)}
                />
                <span>Show Password</span>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex justify-between">
                <label className="font-medium">User name</label>
                <span className="text-red-500">
                  {formik.errors.username && formik.errors.username}
                </span>
              </div>
              <input
                id="username"
                type="text"
                name="username"
                autoComplete="off"
                className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                  formik.errors.username &&
                  formik.touched.username &&
                  "border-rose-600"
                }`}
                {...formik.getFieldProps("username")}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex justify-between">
                <label className="font-medium">Phone</label>
                <span className="text-red-500">
                  {formik.errors.phone && formik.errors.phone}
                </span>
              </div>
              <input
                id="phone"
                type="text"
                name="phone"
                autoComplete="off"
                className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                  formik.errors.phone &&
                  formik.touched.phone &&
                  "border-rose-600"
                }`}
                {...formik.getFieldProps("phone")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="font-medium">Note</label>
              <span className="text-red-500">
                {formik.errors.notes && formik.errors.notes}
              </span>
            </div>
            <textarea
              rows={4}
              id="notes"
              type="text"
              name="notes"
              autoComplete="off"
              className={`w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none ${
                formik.errors.notes && formik.touched.notes && "border-rose-600"
              }`}
              {...formik.getFieldProps("notes")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

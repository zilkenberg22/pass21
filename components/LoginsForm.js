import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { Modal, Slider } from "antd";
import { loginsForm_validate } from "@/lib/validate";
import { generatePassword, openNotification } from "@/lib/tools";

export default function LoginsForm({ back, editData }) {
  const { data: session } = useSession();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerater, setShowGenerater] = useState(false);
  const [slideLength, setSlideLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      website: "",
      url: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      notes: "",
    },
    validate: loginsForm_validate,
    onSubmit,
  });

  useEffect(() => {
    if (editData !== null) {
      setEdit(true);
      formik.setValues({ ...editData });
    }
  }, [editData]);

  function onSubmit(values) {
    edit ? editLogin(values) : newLogin(values);
  }

  async function newLogin(values) {
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
          if (data.status) {
            openNotification({
              type: "success",
              title: "Амжилттай",
              message: data.message,
            });
            back();
          } else if (data.message) {
            openNotification({
              type: "error",
              title: "Алдаа",
              message: data.message,
            });
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function editLogin(values) {
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch(`/api/logins/${editData._id}`, options)
        .then((res) => res.json())
        .then((json) => {
          if (json.message) {
            openNotification({
              type: "error",
              title: "Алдаа",
              message: json.message,
            });
          }
          if (json.status) {
            openNotification({
              type: "success",
              title: "Амжилттай",
              message: json.message,
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

  function generateNewPassword(e) {
    let length = e ? e : slideLength;
    var password = generatePassword(length);
    setGeneratedPassword(password);
  }

  function changePassword() {
    formik.values.password = generatedPassword;
    setShowGenerater(false);
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
            type="submit"
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
              <div className="flex gap-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-[16px] h-[16px]"
                    checked={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <span>Show Password</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-[16px] h-[16px]"
                    checked={showGenerater}
                    onClick={() => {
                      generateNewPassword();
                      setShowGenerater(true);
                    }}
                  />
                  <span>Generate Password</span>
                </div>
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
      <Modal
        width={800}
        open={showGenerater}
        closable={false}
        centered
        okText="Change Password"
        onOk={changePassword}
        onCancel={() => setShowGenerater(false)}
        okButtonProps={() => <button>ok</button>}
      >
        <div className="w-full">
          <h2 className="font-semibold text-3xl flex justify-center mb-10">
            Create strong passwords with Password Generator
          </h2>
          <div className="flex w-full items-center gap-5 justify-center bg-green-300 ">
            <div className="border-none focus:outline-none w-3/5 py-6 text-4xl text-white tracking-wider bg-green-300">
              {generatedPassword}
            </div>
            <button onClick={() => generateNewPassword()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 16 16"
                className="text-white"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4.75 10.75h-3m12.5-2c0 3-2.798 5.5-6.25 5.5c-3.75 0-6.25-3.5-6.25-3.5v3.5m9.5-9h3m-12.5 2c0-3 2.798-5.5 6.25-5.5c3.75 0 6.25 3.5 6.25 3.5v-3.5"
                />
              </svg>
            </button>
            <button
              className="bg-yellow-500 text-white p-2 px-4 text-xl"
              onClick={() => navigator.clipboard.writeText(generatedPassword)}
            >
              Copy Password
            </button>
          </div>
          <Slider
            min={12}
            max={20}
            value={slideLength}
            onChange={(e) => {
              setSlideLength(e);
              generateNewPassword(e);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

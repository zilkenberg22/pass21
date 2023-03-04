import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { Modal } from "antd";
import { loginsForm_validate } from "@/lib/validate";
import { openNotification, showLoader } from "@/lib/tools";
import Icon from "../../components/Icon";
import PasswordGenerator from "../PasswordGenerator";

export default function LoginsForm({ back, editData }) {
  const { data: session } = useSession();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerater, setShowGenerater] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

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
    async function fetchData() {
      const res = await fetch("/api/auth/csrf");
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    }
    fetchData();
  }, []);

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
    showLoader(true);
    try {
      values.user = session?.user?._id;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify(values),
      };
      const response = await fetch("/api/logins", options);
      const json = await response.json();
      if (json.status) {
        openNotification({
          type: "success",
          title: "Амжилттай",
          message: json.message,
        });
        showLoader(false);
        back();
      } else if (json.message) {
        openNotification({
          type: "error",
          title: "Алдаа",
          message: json.message,
        });
      }
      showLoader(false);
    } catch (error) {
      console.log(error, "error");
      showLoader(false);
    }
  }

  async function editLogin(values) {
    showLoader(true);
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`/api/logins/${editData._id}`, options);
      const json = await response.json();

      if (json.status) {
        openNotification({
          type: "success",
          title: "Амжилттай",
          message: json.message,
        });
        showLoader(false);
        back();
      } else if (json.message) {
        openNotification({
          type: "error",
          title: "Алдаа",
          message: json.message,
        });
      }
      showLoader(false);
    } catch (error) {
      console.log(error, "error");
      showLoader(false);
    }
  }

  function cancel() {
    setEdit(false);
    setFormData({});
    back();
  }

  return (
    <div>
      <div className="md:flex md:justify-between items-center">
        <div className="flex gap-3 items-center">
          <button onClick={() => cancel()}>
            <Icon icon="mdi:arrow-left" className="text-3xl" />
          </button>
          <div className="text-xl font-bold text-gray-600">
            {!edit ? "Add A Login" : formData.website}
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
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
          <input type="hidden" name="_csrf" value={csrfToken} />
          <div className="md:flex w-full gap-6">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
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
            <div className="flex flex-col gap-2 w-full md:w-1/2">
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

          <div className="md:flex w-full gap-6">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
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
            <div className="flex flex-col gap-2 w-full md:w-1/2">
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
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span>Show Password</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-[16px] h-[16px]"
                    checked={showGenerater}
                    onChange={() => setShowGenerater(true)}
                  />
                  <span>Generate Password</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex w-full gap-6">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
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
            <div className="flex flex-col gap-2 w-full md:w-1/2">
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
        onCancel={() => setShowGenerater(false)}
        footer={[]}
        zIndex={10}
      >
        <PasswordGenerator />
      </Modal>
    </div>
  );
}

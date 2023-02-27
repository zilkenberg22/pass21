import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { loginsForm_validate } from "@/lib/validate";
import { useSession } from "next-auth/react";
import { openNotification } from "@/lib/tools";

const { TextArea } = Input;

export default function LoginsForm({ back, editData }) {
  const { data: session } = useSession();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});

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
      setFormData({ ...editData });
    }
  }, [editData]);

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
            router.push("/auth/login");
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        <Form
          name="loginsForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinishFailed={onFinishFailed}
          onFinish={formik.handleSubmit}
        >
          <Form.Item
            label="Website"
            name="website"
            hasFeedback
            required
            validateStatus={formik.errors.website ? "error" : "success"}
            help={formik.errors.website ? formik.errors.website : null}
          >
            <Input
              id="website"
              name="website"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.website}
            />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            hasFeedback
            validateStatus={formik.errors.url ? "error" : "success"}
            help={formik.errors.url ? formik.errors.url : null}
          >
            <Input
              id="url"
              name="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.url}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            required
            validateStatus={formik.errors.email ? "error" : "success"}
            help={formik.errors.email ? formik.errors.email : null}
          >
            <Input
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </Form.Item>
          <Form.Item
            label="User Name"
            name="username"
            hasFeedback
            validateStatus={formik.errors.username ? "error" : "success"}
            help={formik.errors.username ? formik.errors.username : null}
          >
            <Input
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            required
            validateStatus={formik.errors.password ? "error" : "success"}
            help={formik.errors.password ? formik.errors.password : null}
          >
            <Input
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            hasFeedback
            validateStatus={formik.errors.phone ? "error" : "success"}
            help={formik.errors.phone ? formik.errors.phone : null}
          >
            <Input
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </Form.Item>
          <Form.Item
            label="Notes"
            name="notes"
            hasFeedback
            validateStatus={formik.errors.notes ? "error" : "success"}
            help={formik.errors.notes ? formik.errors.notes : null}
          >
            <TextArea
              id="notes"
              name="notes"
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

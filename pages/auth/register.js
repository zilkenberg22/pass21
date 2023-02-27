import React from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { register_validate } from "@/lib/validate";
import { openNotification } from "@/lib/tools";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validate: register_validate,
    onSubmit,
  });

  if (session) {
    router.push("/");
  }

  async function onSubmit(values) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch("/api/auth/signup", options)
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

  function onFinishFailed() {}

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Form
        name="registerForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinishFailed={onFinishFailed}
        onFinish={formik.handleSubmit}
      >
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
          label="Confirm Password"
          name="cpassword"
          hasFeedback
          required
          validateStatus={formik.errors.cpassword ? "error" : "success"}
          help={formik.errors.cpassword ? formik.errors.cpassword : null}
        >
          <Input
            id="cpassword"
            name="cpassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cpassword}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

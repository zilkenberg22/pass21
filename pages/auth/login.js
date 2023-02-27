import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { Form, Input, Button } from "antd";
import { login_validate } from "@/lib/validate";
import { openNotification } from "@/lib/tools";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  if (session) {
    router.push("/");
  }

  async function onSubmit(values) {
    console.log(values, "values");
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (status.ok) {
      openNotification({
        type: "success",
        title: "Амжилттай нэвтэрлээ",
      });
      router.push("/");
    }
  }

  function onFinishFailed() {}

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Form
        name="loginForm"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-gray-400 ">
        don't have an account yet?{" "}
        <Link href={"/auth/register"}>
          <p className="text-blue-700">Sign Up</p>
        </Link>
      </div>
    </div>
  );
}

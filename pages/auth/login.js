import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { login_validate } from "@/lib/validate";
import { openNotification } from "@/lib/tools";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  if (session) {
    router.push("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
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
        router.push("/logins");
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <div className="h-screen w-full flex p-10">
      <div className="p-10 w-full md:w-1/2">
        <div className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="Picture of the author"
            width={30}
            height={30}
          />
          <h2 className="font-semibold text-xl">Save data</h2>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="mb-10 grid gap-6">
            <h1 className="font-bold text-5xl">Login form</h1>
            <span>Please fill you detail to access your account.</span>
          </div>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
            <button
              type="submit"
              className="border rounded-lg bg-blue-600 py-2 w-full text-white mt-2"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <span>
              Don't have an account?{" "}
              <Link href="/auth/register">
                <span className="font-bold text-blue-700">Sign up</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 relative hidden md:block">
        <Image src="/login.png" alt="Picture of the author" fill />
      </div>
    </div>
  );
}

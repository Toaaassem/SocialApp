import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod"



export default function Register() {
  const [isShow, setisShow] = useState(false);
  const [isShowConfirm, setisShowConfirm] = useState(false);
  const { handleSubmit, register, formState, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode:'all'
  });
  const password = watch("password");

  function sendData(test) {
    console.log(test);
  }
  function handleShowPassword() {
    setisShow(!isShow);
    setisShowConfirm(!isShowConfirm);
  }
  function handleShowConfirm() {
    setisShowConfirm(!isShowConfirm);
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        <div className="card bg-white w-xl p-8 rounded-xl shadow-lg space-y-2">
          <h4 className="text-3xl text-purple-700 font-bold text-center">
            Create Account
          </h4>
          <p className="text-gray-500 text-center">
            Join the community and start sharing !
          </p>
          <form onSubmit={handleSubmit(sendData)}>
            {/*Username */}
            <div className="my-4">
              <label
                className="text-md font-semibold text-gray-800"
                htmlFor="userName"
              >
                Username
              </label>
              <input
                className="input mt-1"
                type="text"
                placeholder="username"
                name="name"
                id="userName"
                {...register("name", {
                  required: { value: true, message: "this field is required" },
                  minLength: { value: 3, message: "min length is 3 chars" },
                  maxLength: { value: 12, message: "max length is 3 chars" },
                })}
              />
              {formState.errors?.name && formState.dirtyFields.name && (
                <p className="text-red-500 text-sm font-semibold">
                  {formState.errors.name.message}
                </p>
              )}
            </div>
            {/*email */}
            <div className="my-4">
              <label
                className="text-md font-semibold text-gray-800 "
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="input mt-1"
                type="email"
                placeholder="email"
                id="email"
                name="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                    message: "Email must be valid",
                  },
                })}
              />
              {formState.errors?.email && formState.dirtyFields.email && (
                <p className="text-red-500 text-sm font-semibold">
                  {formState.errors.email.message}
                </p>
              )}
            </div>
            {/*password */}
            <div className="my-4">
              <label
                className="text-md font-semibold text-gray-800"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="input mt-1 "
                  type={isShow ? "text" : "password"}
                  placeholder="password"
                  id="password"
                  name="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[A-Z][A-Z a-z 0-9 _ ]{4,}$/,
                      message: "password must be valid",
                    },
                  })}
                />

                {formState.errors?.password && (
                  <p className="text-red-500 text-sm font-semibold">
                    {formState.errors.password.message}
                  </p>
                )}
                {isShow ? (
                  <Eye
                    className="absolute top-[50%] translate-y-[-50%] end-3  translate-middle w-5 h-5 text-gray-700 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <EyeOff
                    className="absolute top-[50%] translate-y-[-50%] end-3  translate-middle w-5 h-5 text-gray-700 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            </div>
            {/*rePassword */}
            <div className="my-4">
              <label
                className="text-md font-semibold text-gray-800"
                htmlFor="rePassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="input mt-1"
                  type={isShowConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  id="rePassword"
                  name="rePassword"
                  {...register("rePassword", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate:(re) => {
                      return password == re || "pass should match";
                    }
                  })}
                />
                {formState.errors?.rePassword &&
                  formState.dirtyFields.rePassword && (
                    <p className="text-red-500 text-sm font-semibold">
                      {formState.errors.rePassword.message}
                    </p>
                    
                  )}
                  

                {isShowConfirm ? (
                  <Eye
                    className="absolute top-[50%] translate-y-[-50%] end-3  translate-middle w-5 h-5 text-gray-700 cursor-pointer"
                    onClick={handleShowConfirm}
                  />
                ) : (
                  <EyeOff
                    className="absolute top-[50%] translate-y-[-50%] end-3  translate-middle w-5 h-5 text-gray-700 cursor-pointer"
                    onClick={handleShowConfirm}
                  />
                )}
              </div>
            </div>
            {/*date */}
            <div className="my-4">
              <label
                className="text-md font-semibold text-gray-800"
                htmlFor="birthDate"
              >
                Birth Date
              </label>
              <input
                className="input mt-1"
                type="date"
                placeholder=""
                id="birthDate"
                name="dateOfBirth"
                {...register("dateOfBirth")}
              />
            </div>
            {/*gender */}
            <div className="my-4">
              <h3 className="text-md font-semibold text-gray-800 mb-1">
                Gender
              </h3>
              <input
                className=" me-1 accent-purple-500"
                type="radio"
                name="gender"
                value={"male"}
                {...register("gender")}
              />
              <label className="text-md font-semibold text-gray-800 me-5">
                Male
              </label>

              <input
                className="me-1 accent-purple-500"
                type="radio"
                name="gender"
                value={"female"}
                {...register("gender")}
              />
              <label className="text-md font-semibold text-gray-800">
                Female
              </label>
            </div>
            {/*button */}
            <div className="flex justify-center">
              <button className="btn text-white mx-auto text-md font-semibold">
                Create an account
              </button>
            </div>
            <p className="text-gray-400 text-sm font-semibold text-center mt-3">
              Already have an account ?{" "}
              <Link className="text-purple-800 " to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

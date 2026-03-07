import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessages from "../../Components/ErrorMessages/ErrorMessages";
import { ca } from "zod/locales";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
const schema = z
  .object({
    name: z
      .string("must be a string")
      .min(3, "Name must be at least 3 characters")
      .max(12, "Name must be at most 12 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(8, "Username must be at most 8 characters"),
    email: z.email("Please enter a valid email"),
    dateOfBirth: z.string().date("Please enter a valid date of birth"),
    gender: z.enum(["male", "female"], "Please select a valid gender"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    rePassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        "Passwords must match",
      ),
  })
  .refine(
    (values) => {
      if (values.password === values.rePassword) {
        return true;
      }
      return false;
    },
    {
      error: "password should match",
      path: ["rePassword"],
    },
  );

export default function Register() {
  const [isShow, setisShow] = useState(false);
  const [isShowConfirm, setisShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // i can make like enum : one state which is register state can have multiple states laoding | idle | rejected |fulfilled : always idle and using the set i can change it
  const navigate = useNavigate();

  const { handleSubmit, register, formState, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all",
  });

  async function sendData(values) {
    setIsLoading(true);
    try {
      const { data } = await axios(
        "https://route-posts.routemisr.com/users/signup",
        {
          method: "POST",
          data: values,
        },
      );
      console.log(data);
      toast.success("Login successful", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
    // const {data} = axios
    //    ("https://route-posts.routemisr.com/users/signup",{
    //        method:"POST",
    //        data:values
    //      }).then((response)=>{
    //       console.log(response.data);
    //      }).catch((error)=>{
    //       console.log(error);
    //      });
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
                Name
              </label>
              <input
                className="input mt-1"
                type="text"
                placeholder="username"
                name="name"
                id="userName"
                {...register("name")}
              />
              <ErrorMessages title={formState.errors?.name?.message} />
            </div>
            {/*username */}
            <div className="my-4">
              <label
                className="text-md font-semibold text-gray-800"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="input mt-1"
                type="text"
                placeholder="display name"
                id="username"
                name="username"
                {...register("username")}
              />
              <ErrorMessages title={formState.errors?.username?.message} />
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
                {...register("email")}
              />

              <ErrorMessages title={formState.errors?.email?.message} />
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
                  {...register("password")}
                />

                <ErrorMessages title={formState.errors?.password?.message} />

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
                  {...register("rePassword")}
                />

                <ErrorMessages title={formState.errors?.rePassword?.message} />

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
              <button
                disabled={isLoading}
                className="btn text-white mx-auto text-md font-semibold"
              >
                {isLoading ? (
                  <div className="flex align-middle justify-center gap-2">
                    <ClipLoader size={20} color="white" />{" "}
                    <div className="">Creating ... </div>{" "}
                  </div>
                ) : (
                  "Create an account"
                )}
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

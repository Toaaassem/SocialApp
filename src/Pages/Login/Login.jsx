  import { Eye, EyeOff } from "lucide-react";
  import React, { useContext, useState } from "react";
  import { useForm } from "react-hook-form";
  import { Link, useNavigate } from "react-router-dom";
  import * as z from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import ErrorMessages from "../../Components/ErrorMessages/ErrorMessages";
  import axios from "axios";
  import { ClipLoader } from "react-spinners";
  import { toast } from "react-toastify";
  import { authContext } from "../../Context/AuthContext";
  const schema = z.object({
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        "Enter a valid password",
      ),
  });

  export default function Login() {
    const [isShow, setisShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthUserToken } = useContext(authContext);
    const { handleSubmit, register, formState } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "all",
    });

    async function sendData(test) {
      setIsLoading(true);
      try {
        const { data } = await axios(
          "https://route-posts.routemisr.com/users/signin",
          {
            method: "POST",
            data: test,
          },
        );
        localStorage.setItem("token",data.data.token);
        setAuthUserToken(data.data.token);
        toast.success("Register successful", {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        console.log(data);
        
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    function handleShowPassword() {
      setisShow(!isShow);
    }

    return (
      <div className="min-h-screen">
        <div className="flex justify-center items-center">
          <div className="card bg-white w-xl p-8 rounded-xl shadow-lg space-y-2">
            <h4 className="text-3xl text-purple-700 font-bold text-center">
              Login
            </h4>
            <p className="text-gray-500 text-center">
              Join the community and start sharing !
            </p>
            <form onSubmit={handleSubmit(sendData)}>
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
              {/*button */}
              <div className="flex justify-center">
                <button className="btn text-white mx-auto text-md font-semibold">
                  {isLoading ? (
                    <div className="flex align-middle justify-center gap-2">
                      <ClipLoader size={20} color="white" />{" "}
                      <div className="">Logining ... </div>{" "}
                    </div>
                  ) : (
                    " Login to your account"
                  )}
                </button>
              </div>
              <p className="text-gray-400 text-sm font-semibold text-center mt-3">
                Don't have an account ?{" "}
                <Link className="text-purple-800 " to={"/register"}>
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

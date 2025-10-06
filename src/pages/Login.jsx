import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/auth/authSlice";
import OAuth from "../compoennts/OAuth";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginStart());
    try {
      const response = await authService.login(data);
      // console.log("Login response:", response);
      if (response.status === "success") {
        dispatch(loginSuccess(response.data.user));
        toast.success(response.message || "Login successful!");
        navigate("/profile");
        setData({ email: "", password: "" });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure(error.message));
      toast.error(error.message || "An unexpected error occurred");
    }
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className="flex h-[90vh] flex-col justify-center bg-amber-100 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign In to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form className="space-y-2" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={handleInputChange}
                    value={data.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={handleInputChange}
                    value={data.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            <div>
              <div className="mt-4 flex items-center gap-x-6">
                <div className="w-full flex-1 border-t border-gray-200" />
                <p className="text-sm/6 font-medium text-nowrap text-gray-900">
                  Or continue with
                </p>
                <div className="w-full flex-1 border-t border-gray-200" />
              </div>

              <OAuth/>
            </div>

            <div className="mt-6 flex items-center justify-center gap-x-2">
              <p className="text-sm">Don ' t Have an Account? </p>
              <button
                onClick={() => navigate("/register")}
                className="bg-red-400 px-4 text-white py-2 rounded-md font-semibold text-sm">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

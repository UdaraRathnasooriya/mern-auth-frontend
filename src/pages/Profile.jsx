import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import userService from "../services/userService";
import {
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
} from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log("Profile - currentUser:", currentUser);

  const [formData, setFormData] = React.useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    // password: "",
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        // password: "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    // Password validation: Required for local auth, optional for others (but shown only for local)
    // if (currentUser?.authProvider === "local") {
    //   if (!formData.password.trim()) {
    //     newErrors.password = "Password is required for local authentication";
    //   } else if (formData.password.length < 4) {
    //     newErrors.password = "Password must be at least 4 characters";
    //   }
    // } else if (formData.password && formData.password.length < 4) {
    //   newErrors.password = "Password must be at least 4 characters";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Submit updated profile data
    // console.log("Submitting profile update:", formData);
    dispatch(profileUpdateStart());
    try {
      const response = await userService.updateUser(formData);
      if (response.status === "success") {
        dispatch(profileUpdateSuccess(response.data.user));
        toast.success(response.message || "User Update successful!");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      dispatch(profileUpdateFailure(error.message));
      toast.error(error.message || "Profile update failed");
    }
  };

  // For Google auth, disable email (non-editable)
  const isGoogleAuth = currentUser?.authProvider === "google";
  const disableEmail = isGoogleAuth;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (loading) return <Loading />;
  return (
    <>
      <div className="flex h-[90vh] flex-col justify-center bg-amber-100 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Profile Page
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px] text-white">
          <div className="bg-gray-900 px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 text-white">
            <div>
              <img
                src={
                  currentUser?.avatar ||
                  "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"
                }
                className="h-32 w-32 rounded-full border-2 border-gray-500 object-cover p-[1px] mx-auto"
              />
            </div>
            <form className="space-y-2 mt-4" onSubmit={handleSubmit}>
              {/* User Name */}
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium ">
                  User Name
                </label>
                <div className="mt-2">
                  <input
                    name="name"
                    type="text"
                    autoComplete="off"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={handleInputChange}
                    value={formData.name}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium ">
                  Email address {disableEmail && "(Google-managed)"}
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="off"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={handleInputChange}
                    disabled={disableEmail}
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              {/* Password */}
              {/* {currentUser?.authProvider === "local" && (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      name="password"
                      type="password"
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-900 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                      onChange={handleInputChange}
                      value={formData.password}
                      placeholder="********"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
              )} */}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="flex w-full mt-4 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Update User
                </button>
              </div>
            </form>
            <div className="flex w-full items-center justify-between mt-4">
              <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 text-sm">
                Delete Account
              </button>
              <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 text-sm">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

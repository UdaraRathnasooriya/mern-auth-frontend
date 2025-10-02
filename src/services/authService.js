import apiService from "./apiService";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../utils/firebase";

const authService = {
  register: async (data) => {
    try {
      const response = await apiService.post("/auth/signup", data);
      // console.log("authService response:", response);
      if (response.status !== "success") {
        throw new Error(response.message || "Unexpected response from server");
      }
      return response; // Return raw response
    } catch (error) {
      console.error("Error in authService:", error);
      // Instead of collapsing into Error(), return raw backend response if available
      if (error.response?.data) {
        throw error.response.data; // <-- important change
      }
      // fallback for unexpected issues
      throw { message: "Registration failed. Please try again." };
    }
  },

  login: async (data) => {
    try {
      const response = await apiService.post("/auth/signin", data);
      // console.log("authService response:", response);
      if (response.status !== "success") {
        throw new Error(response.message || "Unexpected response from server");
      }
      return response; // Return raw response
    } catch (error) {
      console.error("Error in authService:", error);
      const errMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(errMessage);
    }
  },

  googleLogin: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Step 1: Sign in with Firebase popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Step 2: Send user details to backend
      const payload = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await apiService.post("/auth/google", payload);
      console.log("Google login response:", response);

      if (response.status !== "success") {
        throw new Error(response.message || "Google sign-in failed");
      }

      return response; // Return raw response
    } catch (error) {
      console.error("Google login error:", error);
      const errMessage =
        error.response?.data?.message ||
        "Google login failed. Please try again.";
      throw new Error(errMessage);
    }
  },
};

export default authService;

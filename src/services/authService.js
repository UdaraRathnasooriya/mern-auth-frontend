import apiService from "./apiService";

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
      const errMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      throw new Error(errMessage);
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
};

export default authService;

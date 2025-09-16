import apiService from "./apiService";

const authService = {
  register: async (data) => {
    try {
      const response = await apiService.post("/auth/signup", data);
      console.log("Response from authService:", response);
      return response; // return full response
    } catch (error) {
      console.error("Error in authService:", error);
      const errMessage = error.response?.data?.message;
      throw new Error(errMessage);
    }
  },
};

export default authService;

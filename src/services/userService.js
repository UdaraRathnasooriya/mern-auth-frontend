import apiService from "./apiService";

const userService = {
  updateUser: async (data) => {
    try {
      const response = await apiService.patch("/user/profile/update", data);
      if (response.status !== "success") {
        throw new Error(response.message || "Unexpected response from server");
      }
      return response; // Return raw response
    } catch (error) {
      console.error("Error in userService:", error);
      const errMessage =
        error.response?.data?.message || "Update failed. Please try again.";
      throw new Error(errMessage);
    }
  },
};

export default userService;

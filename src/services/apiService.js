import api from "../utils/api";

const apiService = {
  post: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
export default apiService;

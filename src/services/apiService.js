import api from "../utils/api";

const apiService = {
  // POST request
  post: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      console.error("POST error:", error);
      throw error.response?.data || error;
    }
  },

  // GET request
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET error:", error);
      throw error.response?.data || error;
    }
  },

  // PUT request
  put: async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      console.error("PUT error:", error);
      throw error.response?.data || error;
    }
  },

  // PATCH request
  patch: async (url, data) => {
    try {
      const response = await api.patch(url, data);
      return response.data;
    } catch (error) {
      console.error("PATCH error:", error);
      throw error.response?.data || error;
    }
  },

  // DELETE request
  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      console.error("DELETE error:", error);
      throw error.response?.data || error;
    }
  },
};

export default apiService;

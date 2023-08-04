import axios from 'axios'


const axiosInstance = axios.create({

});

// Request interceptor
axiosInstance.interceptors.request.use(
 async (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
        const accessToken = localStorage.getItem("accessToken")

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);



export default axiosInstance;;
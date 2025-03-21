// import axios from "axios";

// const API_URL = "https://hcapi.abdullahkimrigh.sa";

// export const login = async (email, password) => {
//   console.log("Auth", email, password);
//   try {
//     const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
//     return response.data; // Returning only the data part
//   } catch (error) {
//     console.error("Login error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Login failed");
//   }
// };

// export const login2FA = async (token_2fa) => {
//   try {
//     const response = await axios.post(`${API_URL}/login2fa`, { token_2fa });
//     return response.data.token; // Assuming the response contains a token
//   } catch (error) {
//     console.error("2FA Login error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "2FA Login failed");
//   }
// };
import axios from "axios";

const API_URL = "https://hcapi.abdullahkimrigh.sa";

export const login = async (email, password, token_2fa = null) => {
  console.log("Auth", email, password, token_2fa);

  try {
    const payload = { email, password };
    
    // Add 2FA token only if provided
    if (token_2fa) {
      payload.token_2fa = token_2fa;
    }

    const response = await axios.post(`${API_URL}/api/auth/login`, payload);

    return response.data; // Returning only the data part
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
}; 

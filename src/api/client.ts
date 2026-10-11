import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseURL || apiBaseURL.trim() === "") {
  throw new Error("VITE_API_BASE_URL 설정이 필요합니다.");
}

export const apiClient = axios.create({
  baseURL: apiBaseURL.trim(),
  timeout: 5000,
});

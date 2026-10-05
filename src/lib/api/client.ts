import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "https://vocab-builder-backend.p.goit.global/api",
  headers: {
    "Content-Type": "application/json",
  },
});

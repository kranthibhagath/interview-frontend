import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend URL
});

export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);
export const getPatientData = (patientId) => API.get(`/patient-data/patients/${patientId}`);
export const updatePatientData = (data) => API.post(`/patient-data/patients`, data);
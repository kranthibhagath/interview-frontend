import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    console.log("Form Data:", formData);
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      console.log("Login Success:", res);
      if(res?.data?.message){
        console.log("Login Failed:", res?.data?.message);
      }else{
        console.log("Login Success");
        localStorage.setItem("token", res.data.token); // Store token in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data
        navigate("/Home"); // Redirect to home or dashboard after successful login
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <AuthForm
        isSignup={false}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { signupUser } from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(formData);
      console.log("Signup Success:", res);
      alert("Signup Success");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthForm
      isSignup={true}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default Signup;

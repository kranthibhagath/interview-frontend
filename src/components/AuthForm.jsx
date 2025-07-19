import React from "react";
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Box } from "@mui/material";

const AuthForm = ({ isSignup, formData, onChange, onSubmit, error }) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    sx={{ width: 300, mx: "auto", mt: 10, backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 3, color: "#333", display: "flex", flexDirection: "column", gap: 2 }}
  >
    <Typography variant="h5" textAlign="center" gutterBottom>
      {isSignup ? "Sign Up" : "Login"}
    </Typography>

    {isSignup && (
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        fullWidth
        margin="normal"
        required
      />
    )}

    <TextField
      label="Email"
      name="email"
      type="email"
      value={formData.email}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    />

    <TextField
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    />

    {error && (
      <Typography color="error" mt={1}>
        {error}
      </Typography>
    )}

    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
    >
      {isSignup ? "Register" : "Login"}
    </Button>
    <div style={{ textAlign: "center", marginTop: "10px" }}>
    {!isSignup && <Link to="/forgot-password">Forgot Password?</Link>}
      <Typography variant="body2">
        {isSignup ? <Link to="/login">Already have an account? Login</Link> :  <Link to="/signup">Don't have an account? Sign Up</Link>}
      </Typography>
    </div>
  </Box>
);

export default AuthForm;

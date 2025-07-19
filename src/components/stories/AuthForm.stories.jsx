// src/components/__stories__/AuthForm.stories.jsx
import React from 'react';
import AuthForm from '../AuthForm';

export default {
  title: 'Components/AuthForm',
  component: AuthForm,
};

const Template = (args) => <AuthForm {...args} />;

export const Login = Template.bind({});
Login.args = {
  isSignup: false,
  formData: { email: '', password: '' },
  onChange: () => {},
  onSubmit: () => {},
  error: '',
};

export const Signup = Template.bind({});
Signup.args = {
  isSignup: true,
  formData: { name: '', email: '', password: '' },
  onChange: () => {},
  onSubmit: () => {},
  error: '',
};

export const WithError = Template.bind({});
WithError.args = {
  isSignup: false,
  formData: { email: '', password: '' },
  onChange: () => {},
  onSubmit: () => {},
  error: 'Invalid credentials',
};

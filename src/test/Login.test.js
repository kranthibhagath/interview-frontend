/* eslint-env jest */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import * as authService from "../services/authService";

// Mock the login service
jest.mock("../services/authService");

describe("Login Page", () => {
  beforeEach(() => {
    render(<Login />);
  });

  test("renders email and password inputs", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("calls login service on form submit", async () => {
    authService.loginUser.mockResolvedValue({
      data: { token: "fake-token", user: { email: "test@example.com" } },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(authService.loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    );
  });

  test("shows error message on login failure", async () => {
    authService.loginUser.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    );
  });
});

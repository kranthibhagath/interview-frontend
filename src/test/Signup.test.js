import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import * as authService from "../services/authService";

jest.mock("../services/authService");

describe("Signup Page", () => {
  beforeEach(() => {
    render(<Signup />);
  });

  test("renders name, email, and password fields", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("calls signup service on submit", async () => {
    authService.signupUser.mockResolvedValue({
      data: { token: "new-token", user: { email: "new@example.com" } },
    });

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "securePass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(authService.signupUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "new@example.com",
        password: "securePass",
      })
    );
  });

  test("shows error on signup failure", async () => {
    authService.signupUser.mockRejectedValue({
      response: { data: { message: "Email already in use" } },
    });

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "taken@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument()
    );
  });
});

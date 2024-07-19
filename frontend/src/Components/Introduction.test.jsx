// src/Components/Introduction.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Introduction from "./Introduction";

describe("Introduction Component", () => {
  test("renders welcome message", () => {
    render(<Introduction />);

    expect(screen.getByText(/Hi, Welcome to plain news!/i)).toBeInTheDocument();
  });

  test("renders h1 element with correct class names", () => {
    render(<Introduction />);

    const heading = screen.getByText(/Hi, Welcome to plain news!/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-5xl", "text-center", "mt-72");
  });
});

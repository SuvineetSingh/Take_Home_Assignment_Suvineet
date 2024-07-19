// src/Components/NavigationBar.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import NavigationBar from "./NavigationBar";
import { BrowserRouter } from "react-router-dom";

describe("NavigationBar Component", () => {
  test("renders Home link", () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test("renders Top headlines link", () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Top headlines/i)).toBeInTheDocument();
  });

  test("renders category links", () => {
    const categories = [
      "Business",
      "Sports",
      "Entertainment",
      "Technology",
      "Science",
      "Health",
    ];

    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });
});

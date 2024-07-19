// src/Components/CategoryNews.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import CategoryNews from "./CategoryNews";

jest.mock("./NewsItem", () => {
  return ({ article }) => <li>{article.title}</li>;
});

describe("CategoryNews Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const renderWithRouter = (categoryName) => {
    render(
      <MemoryRouter initialEntries={[`/category/${categoryName}`]}>
        <Route path="/category/:categoryName">
          <CategoryNews />
        </Route>
      </MemoryRouter>
    );
  };

  test("renders correctly with articles", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        articles: [{ title: "Article 1" }, { title: "Article 2" }],
      })
    );

    renderWithRouter("technology");

    expect(screen.getByText(/TECHNOLOGY/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/Article 2/i)).toBeInTheDocument()
    );
  });

  test("displays no articles found message when no articles are present", async () => {
    fetch.mockResponseOnce(JSON.stringify({ articles: [] }));

    renderWithRouter("technology");

    await waitFor(() =>
      expect(screen.getByText(/No articles found!/i)).toBeInTheDocument()
    );
  });

  test("handles fetch error", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    console.error = jest.fn(); // Suppress console.error in test output

    renderWithRouter("technology");

    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching category news",
        "API is down"
      )
    );
  });
});

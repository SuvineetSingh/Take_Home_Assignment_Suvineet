// src/Components/NewsArticles.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NewsArticles from "./NewsArticles";

jest.mock("./NewsItem", () => {
  return ({ article }) => <li>{article.title}</li>;
});

describe("NewsArticles Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders correctly with articles", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        articles: [{ title: "Article 1" }, { title: "Article 2" }],
      })
    );

    render(<NewsArticles />);

    expect(screen.getByText(/Top Headlines/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/Article 2/i)).toBeInTheDocument()
    );
  });

  test("displays no articles found message when no articles are present", async () => {
    fetch.mockResponseOnce(JSON.stringify({ articles: [] }));

    render(<NewsArticles />);

    await waitFor(() =>
      expect(screen.getByText(/No articles found!/i)).toBeInTheDocument()
    );
  });

  test("handles fetch error", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    console.error = jest.fn(); // Suppress console.error in test output

    render(<NewsArticles />);

    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching news",
        "API is down"
      )
    );
  });
});

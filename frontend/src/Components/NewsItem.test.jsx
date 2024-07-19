// src/Components/NewsItem.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import NewsItem from "./NewsItem";

describe("NewsItem Component", () => {
  const article = {
    title: "Test Article",
    description: "This is a test article description.",
    publishedAt: "2024-07-19T12:34:56Z",
    url: "https://example.com/test-article",
    urlToImage: "https://example.com/image.jpg",
  };

  test("renders article title, description, and published date", () => {
    render(<NewsItem article={article} />);

    expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is a test article description./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Published:/i)).toBeInTheDocument();
    expect(screen.getByText(/7\/19\/2024, 12:34:56 PM/i)).toBeInTheDocument();
  });

  test('renders "Read more" link with correct URL', () => {
    render(<NewsItem article={article} />);

    const link = screen.getByRole("link", { name: /Read more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/test-article");
  });

  test("renders article image when urlToImage is present", () => {
    render(<NewsItem article={article} />);

    const img = screen.getByAltText("Article visual representation");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("does not render image when urlToImage is not present", () => {
    const articleWithoutImage = { ...article, urlToImage: null };
    render(<NewsItem article={articleWithoutImage} />);

    const img = screen.queryByAltText("Article visual representation");
    expect(img).not.toBeInTheDocument();
  });
});

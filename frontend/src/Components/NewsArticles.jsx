import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

function NewsArticles() {
  const [articles, setArticles] = useState([]);
  // http://44.194.142.222:8000/everything/
  useEffect(() => {
    fetch("https://d1k6s57igvik2h.cloudfront.net/everything/")
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error("Error fetching news", error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center text-gray-600">Top Headlines</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <NewsItem article={article} key={index} />
          ))}
        </ul>
      ) : (
        <p className="place-self-center">No articles found!</p>
      )}
    </div>
  );
}

export default NewsArticles;

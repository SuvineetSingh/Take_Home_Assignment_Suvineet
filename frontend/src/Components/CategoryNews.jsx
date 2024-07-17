import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NewsItem from "./NewsItem";
import { useParams } from "react-router-dom";

function CategoryNews() {
  const [articles, setArticles] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://3.80.37.239:8000/category/${categoryName}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error("Error fetching category news", error);
      });
  }, [categoryName]);

  return (
    <div>
      <h1 className="text-3xl text-center text-gray-600">
        {categoryName.toLocaleUpperCase()}
      </h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <NewsItem article={article} key={index} />
          ))}
        </ul>
      ) : (
        <p>No articles found!</p>
      )}
    </div>
  );
}

export default CategoryNews;

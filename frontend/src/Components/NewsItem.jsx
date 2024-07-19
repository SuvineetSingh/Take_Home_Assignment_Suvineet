import React from "react";

function NewsItem({ article }) {
  return (
    <div className=" grid place-items-center">
      <div className=" p-3 border-solid border-black border-2 m-5 flex flex-row justify-between w-1/2">
        <div className="p-2">
          <h2 className="text-3xl text-gray-900 italic">{article.title}</h2>
          <p className="text-gray-600">{article.description}</p>
          <p className="text-gray-600">
            <span className="text-black font-bold mt-2">Published:</span>{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </p>
          <a
            className=" bg-blue-600 text-white border-4 border-transparent mt-10 rounded"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
        <div className="p-2">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt="Article visual representation"
              style={{
                width: "100%",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsItem;

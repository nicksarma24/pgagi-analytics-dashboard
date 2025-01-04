
import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = ["Technology", "Sports", "Business", "Health", "Entertainment"];

const NewsWidget = () => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("Technology");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const NEWS_API_KEY = "df33c859363b483eb95fad9d59b6cb10"; 

  const fetchNews = async (selectedCategory, pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${selectedCategory.toLowerCase()}&country=us&page=${pageNumber}&apiKey=${NEWS_API_KEY}`
      );
      setNewsData((prev) => (pageNumber === 1 ? response.data.articles : [...prev, ...response.data.articles]));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setNewsData([]);
    fetchNews(newCategory, 1);
  };

  const loadMoreNews = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(category, nextPage);
  };

  useEffect(() => {
    fetchNews(category, 1);
  }, []);

  // Filter out articles without images
  const filteredNewsData = newsData.filter((article) => article.urlToImage);

  return (
    <div style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
    className="
    // bg-gradient-to-b from-gray-800 to-black 
    min-h-screen p-6">
      <div className="max-w-4xl mx-auto"> {/* Container to control the width */}
        <h2 className="text-4xl font-bold text-white text-center mb-8">News Headlines</h2>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-md text-white font-medium transition ${
                category === cat
                  ? "bg-indigo-600 shadow-lg"
                  : "bg-gray-700 hover:bg-indigo-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNewsData.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform transform duration-300"
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="h-32 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-md mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-xs text-gray-700 line-clamp-3 mb-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-medium hover:underline text-sm"
                >
                  Read more
                </a>
              </div>
              <div className="p-4 bg-gray-100 text-xs text-gray-600">
                Source: {article.source.name || "Unknown"}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredNewsData.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreNews}
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsWidget;

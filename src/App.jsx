import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Container } from "@mui/material";
import NewsHeader from "./Componants/NewsHeader/NewsHeader";
import NewsFeed from "./Componants/NewsFeed/NewsFeed";
import axios from "axios";
import LoadingArticles from "./Componants/LoadingArticeles/LoadingArticeles.jsx";

function App() {
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pageNumber = useRef(1);
  const [error, setError] = useState("");

  async function fetchAllData(inputQuery, page) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&q=${inputQuery}&page=${page}&pageSize=5&country=eg&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      if (data.status === "error") {
        throw new Error(data.message);
      }

      const response = data.articles.map((article) => {
        const {
          title,
          description,
          url,
          urlToImage: image,
          author,
          publishedAt,
        } = article;
        return { title, description, url, image, author, publishedAt };
      });

      setArticles(response);
    } catch (errorMsg) {
      console.error("Error fetching data:", errorMsg);
      setError(errorMsg.message);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllData(query, pageNumber.current);
  }, [query, category]);

  const debouncedSearchChange = debounce((newQuery) => {
    setQuery(newQuery);
    pageNumber.current = 1; // Reset page number on search
  }, 500);

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
    };
  }, [debouncedSearchChange]);

  const handlePageChange = (direction) => {
    pageNumber.current += direction;
    fetchAllData(query, pageNumber.current);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    fetchAllData(query, 1);
    pageNumber.current = 1;
  };

  return (
    <Container>
      <NewsHeader
        handleSearchChange={debouncedSearchChange}
        category={category}
        onChangeCategory={handleChangeCategory}
      />
      {isLoading ? (
        <LoadingArticles />
      ) : error ? (
        <div className="font-bold text-xl text-center p-56 text-red-500">
          {error}
        </div>
      ) : (
        <NewsFeed articles={articles} />
      )}
      <div className="flex justify-between">
        {pageNumber.current > 1 && (
          <button
            onClick={() => handlePageChange(-1)}
            className="bg-slate-100 font-bold px-6 py-5 rounded-lg hover:bg-slate-300"
          >
            Previous
          </button>
        )}
        <button
          onClick={() => handlePageChange(1)}
          className="bg-slate-100 font-bold px-6 py-5 rounded-lg hover:bg-slate-300"
        >
          Next
        </button>
      </div>
    </Container>
  );
}

export default App;

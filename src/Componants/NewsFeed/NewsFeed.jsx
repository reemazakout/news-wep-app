import LoadingArticles from "./../LoadingArticeles/LoadingArticeles";
import NewsArticle from "./../NewsArticle/NewsArticle";

export default function NewsFeed(props) {
  const { articles } = props;

  if (!articles) {
    return <LoadingArticles />;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center p-52 text-lg text-gray-500">
        No Results Found!
      </div>
    );
  }

  return (
    <div>
      {articles.map((article) => (
        <NewsArticle key={article.url} {...article} />
      ))}
    </div>
  );
}

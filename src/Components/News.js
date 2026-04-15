import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async () => {
    const { country, category, pageSize } = props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b4c1a04228494390884bab3425e7441d&page=${page}&pageSize=${pageSize}`;

    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [page, props.country, props.category, props.pageSize]);

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">NewsWorld - Top Headlines</h2>
      {loading && <Spinner />}
      <div className="row">
        {!loading && articles.length > 0 ? (
          articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ''}
                description={element.description ? element.description.slice(0, 88) : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))
        ) : (
          !loading && <div className="text-center">No articles found.</div>
        )}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

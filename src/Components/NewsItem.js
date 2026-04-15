import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date }) => {
  return (
    <div className="my-2">
      <div className="card" style={{ width: "18rem" }}>
        <img 
          src={imageUrl ? imageUrl : "https://icdn.lenta.ru/images/2024/08/22/11/20240822115835079/share_721cd51f44cbf6c7cf836e4b27f41df0.jpg"} 
          className="card-img-top" 
          alt="News" 
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small>
          </p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;

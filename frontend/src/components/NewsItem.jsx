import React, { Component } from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div>
        <div className="card" style={{ width: '14rem', fontSize: '0.85rem', margin: '10px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
          <span
            className="badge rounded-pill bg-danger"
            style={{ left: '85%', zIndex: '1', fontSize: '0.7rem' }}
          >
            {source.slice(0, 16)}
          </span>
        </div>

        <img
          src={imageUrl || "https://dummyimage.com/200x120/000/fff&text=No+Image"}
          onError={(e) => e.target.src = "https://dummyimage.com/200x120/000/fff&text=No+Image"}
          className="card-img-top"
          alt="News"
          style={{ height: "120px", objectFit: "cover" }}
          referrerPolicy="no-referrer"
        />

        <div className="card-body" style={{ padding: '10px' }}>
          <h6 className="card-title" style={{ marginBottom: '6px' }}>{title}</h6>
          <p className="card-text" style={{ marginBottom: '6px' }}>{description}</p>
          <p className="card-text" style={{ marginBottom: '4px' }}>
            <small className="text-muted">By {author || "Unknown"}</small>
          </p>
          <p className="card-text" style={{ marginBottom: '8px' }}>
            <small className="text-muted">{new Date(date).toGMTString()}</small>
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
      </div >
    );
}

export default NewsItem;

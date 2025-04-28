import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  render() {
    return (
      <div className="container text-center mt-3">  
        <h1>Welcome to the News Section!</h1>   
        <div className="row mt-3">
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
        </div>
        <div className="row mt-3">
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
          <div className="col"><NewsItem title="soni" description="Boss Soni"/></div>
        </div>
      </div>
    );
  }
}

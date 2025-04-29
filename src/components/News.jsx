import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  updateNews = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=9946f9d5838b4bb5ba730391ccfa4346&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  handlePrevClick = async () => {
    await this.setState((prevState) => ({ page: prevState.page - 1 }));
    this.updateNews();
  };

  handleNextClick = async () => {
    await this.setState((prevState) => ({ page: prevState.page + 1 }));
    this.updateNews();
  };

  render() {
    return (
      <div className="container text-center mt-3">
        <h1>Welcome to the News Section!</h1>

        <div className="row mt-3">
          {this.state.articles
            .filter(
              (element) =>
                element.title && element.description && element.urlToImage
            )
            .map((element) => {
              return (
                <div className="col-md-4 mt-3" key={element.url}>
                  <NewsItem
                    title={element.title.slice(0, 45)}
                    description={element.description.slice(0, 55)}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>

        <div
          className="container d-flex justify-content-between"
          style={{ marginTop: "7rem" }}
        >
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            style={{ width: "6rem", height: "2.5rem" }}
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            style={{ width: "6rem", height: "2.5rem" }}
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

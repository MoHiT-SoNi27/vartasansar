import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  };

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

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ page: 1 }, () => {
        this.updateNews();  
      });
    }
  }

  updateNews = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9946f9d5838b4bb5ba730391ccfa4346&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => this.updateNews()
    );
  };

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.updateNews()
    );
  };

  render() {
    return (
      <div className="container text-center mt-3">
        <h1>Welcome to the News Section!</h1>
        {this.state.loading && <Spinner />}

        <div className="row mt-3">
          {!this.state.loading &&
            this.state.articles
              .filter(
                (element) =>
                  element.title && element.description && element.urlToImage
              )
              .map((element) => {
                return (
                  <div className="col-md-3 mt-3" key={element.url}>
                    <NewsItem
                      title={element.title.slice(0, 45)}
                      description={element.description.slice(0, 55)}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={new Date(element.publishedAt).toGMTString()}
                      source={element.source.name}
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
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
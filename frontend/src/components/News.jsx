import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null); // added error state

  useEffect(() => {
    const fetchInitialNews = async () => {
      try {
        props.setProgress(10);
        setInitialLoading(true);
        setPage(1);

        const url = `/.netlify/functions/newsProxy?country=${props.country}&category=${props.category}&page=1&pageSize=${props.pageSize}`;
        
        const response = await fetch(url);
        props.setProgress(30);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const parsedData = await response.json();
        props.setProgress(70);

        setArticles(parsedData.articles || []); // null-safe
        setTotalResults(parsedData.totalResults || 0);
        setError(null); // clear previous errors if any
      } catch (err) {
        console.error("Failed fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
        props.setProgress(100);
      }
    };

    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - VartaSamachar`;
    fetchInitialNews();
  }, [props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsedData = await response.json();

      setArticles(prev => prev.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
      setError(null);
    } catch (err) {
      console.error("Failed fetching more news:", err);
      setError("Failed to load more news. Please try again later.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="container text-center mt-3">
      <h1>
        VartaSamachar - Top{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines!
      </h1>

      {initialLoading && <Spinner />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={!initialLoading && loadingMore && <Spinner />}
        >
          <div className="container">
            <div className="row mt-3">
              {!initialLoading && articles.length > 0 ? (
                articles
                  .filter(article => article.title && article.description && article.urlToImage)
                  .map((article, index) => (
                    <div className="col-md-3 mt-3" key={article.url + index}>
                      <NewsItem
                        title={article.title.slice(0, 45)}
                        description={article.description.slice(0, 55)}
                        imageUrl={article.urlToImage}
                        newsUrl={article.url}
                        author={article.author ? article.author.slice(0, 30) : "Unknown"}
                        date={new Date(article.publishedAt).toGMTString()}
                        source={article.source?.name || "Unknown"}
                      />
                    </div>
                  ))
              ) : (
                !initialLoading && <p>No articles found.</p>
              )}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  apiKey: "",
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;





// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export default class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 8,
//     category: "general",
//     setProgress: () => {},
//     apiKey: "",
//   };

//   static propTypes = {
//     country: PropTypes.string.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     category: PropTypes.string.isRequired,
//     setProgress: PropTypes.func.isRequired,
//     apiKey: PropTypes.string.isRequired, 
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults: 0,
//     };
//   }

//   async componentDidMount() {
//     this.updateNews();
//   }

//   async componentDidUpdate(prevProps) {
//     if (prevProps.category !== props.category) {
//       document.title = `${
//         props.category.charAt(0).toUpperCase() +
//         props.category.slice(1)
//       } - VartaSamachar`;

//       this.setState(
//         {
//           page: 1,
//           articles: [], // reset articles
//           totalResults: 0,
//         },
//         () => {
//           this.updateNews();
//         }
//       );
//     }
//   }

//   updateNews = async () => {
//     props.setProgress(10);
//     this.setState({ loading: true });
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });

//     props.setProgress(100);
//   };

//   handlePrevClick = () => {
//     this.setState(
//       (prevState) => ({ page: prevState.page - 1 }),
//       () => this.updateNews()
//     );
//   };

//   handleNextClick = () => {
//     this.setState(
//       (prevState) => ({ page: prevState.page + 1 }),
//       () => this.updateNews()
//     );
//   };

//   fetchMoreData = async () => {
//     this.setState({ page: page + 1, loading: true });
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();

//     this.setState({
//       articles: articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//   };

//   render() {
//     return (
//       <div className="container text-center mt-3">
//         <h1>
//           VartaSamachar - Top{" "}
//           {props.category.charAt(0).toUpperCase() +
//             props.category.slice(1)}{" "}
//           Headlines!
//         </h1>
//         {loading && <Spinner />}

//         <InfiniteScroll
//           dataLength={articles.length}
//           next={this.fetchMoreData}
//           hasMore={articles.length < totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row mt-3">
//               {articles
//                 .filter(
//                   (element) =>
//                     element.title && element.description && element.urlToImage
//                 )
//                 .map((element) => {
//                   return (
//                     <div className="col-md-3 mt-3" key={element.url}>
//                       <NewsItem
//                         title={element.title.slice(0, 45)}
//                         description={element.description.slice(0, 55)}
//                         imageUrl={element.urlToImage}
//                         newsUrl={element.url}
//                         author={
//                           element.author
//                             ? element.author.slice(0, 30)
//                             : "Unknown"
//                         }
//                         date={new Date(element.publishedAt).toGMTString()}
//                         source={element.source.name}
//                       />
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         </InfiniteScroll>

//         {/* <div
//           className="container d-flex justify-content-between"
//           style={{ marginTop: "7rem" }}
//         >
//           <button
//             type="button"
//             className="btn btn-dark"
//             disabled={page <= 1}
//             style={{ width: "6rem", height: "2.5rem" }}
//             onClick={this.handlePrevClick}
//           >
//             &larr; Prev
//           </button>
//           <button
//             type="button"
//             className="btn btn-dark"
//             style={{ width: "6rem", height: "2.5rem" }}
//             onClick={this.handleNextClick}
//             disabled={
//               page + 1 >
//               Math.ceil(totalResults / props.pageSize)
//             }
//           >
//             Next &rarr;
//           </button>
//         </div> */}
//       </div>
//     );
//   }
// }

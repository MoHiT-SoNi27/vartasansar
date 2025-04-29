import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  articles = [
    {
      source: {
        id: "the-verge",
        name: "The Verge",
      },
      author: "Gaby Del Valle",
      title: "Trump’s DOJ will no longer prosecute cryptocurrency fraud",
      description:
        "The Trump administration is disbanding a Department of Justice unit dedicated to enforcing cryptocurrency fraud, ending what it calls âregulation by prosecution.â  In a memo obtained by The Washington Post, deputy attorney general Todd Blanche directed fe…",
      url: "https://www.theverge.com/policy/645399/trump-doj-cryptocurrency-fraud-prosecutions-memo",
      urlToImage:
        "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25461724/STK432_Government__CVirginia_B.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      publishedAt: "2025-04-08T18:57:35Z",
      content:
        "An internal memo ordered prosecutors to no longer target virtual currency exchanges.\r\nAn internal memo ordered prosecutors to no longer target virtual currency exchanges.\r\nThe Trump administration is… [+2061 chars]",
    },
    {
      source: {
        id: null,
        name: "Slashdot.org",
      },
      author: "msmash",
      title: "Swiss National Bank Chairman Rebuffs Bitcoin as Reserve Asset",
      description:
        "The head of the Swiss National Bank said on Friday that cryptocurrencies failed to meet the institution's currency reserve standards, rebuffing calls by crypto advocates that it hold bitcoin as a hedge against growing global economic risks. From a report: Cry…",
      url: "https://slashdot.org/story/25/04/25/1818257/swiss-national-bank-chairman-rebuffs-bitcoin-as-reserve-asset",
      urlToImage: "https://a.fsdn.com/sd/topics/bitcoin_64.png",
      publishedAt: "2025-04-25T18:45:00Z",
      content:
        "I think there's a world market for about five computers.\r\n-- attr. Thomas J. Watson (Chairman of the Board, IBM), 1943",
    },
    {
      source: {
        id: null,
        name: "Gizmodo.com",
      },
      author: "Matt Novak",
      title: "Trump Plans Private Dinner for Largest Buyers of $TRUMP Crypto",
      description: "Trump's corruption knows no bounds.",
      url: "https://gizmodo.com/trump-plans-private-dinner-for-largest-buyers-of-trump-crypto-2000593536",
      urlToImage:
        "https://gizmodo.com/app/uploads/2025/04/donald-trump-on-april-23-2025.jpg",
      publishedAt: "2025-04-24T12:48:24Z",
      content:
        "President Donald Trump launched his own cryptocurrency just before taking office in January in one of the most blatantly unethical financial schemes from any U.S. president of the modern era. And whi… [+5004 chars]",
    },
    {
      source: {
        id: null,
        name: "Yahoo Entertainment",
      },
      author: null,
      title: "Bitcoin Rallies During Market Turmoil",
      description: null,
      url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_dc0cf44c-15c3-4d87-9a3b-46406dc81532",
      urlToImage: null,
      publishedAt: "2025-04-22T17:02:29Z",
      content:
        "If you click 'Accept all', we and our partners, including 241 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+702 chars]",
    },
    {
      source: {
        id: null,
        name: "CoinDesk",
      },
      author: "CoinDesk",
      title: "U.S. Stocks More Volatile Than Bitcoin",
      description:
        "U.S. stocks have become more volatile than Bitcoin, with the S&P 500’s seven-day realized volatility surging to 169% compared to Bitcoin’s 83%. CoinDesk's...",
      url: "https://videos.coindesk.com/previews/EDXc0PiW",
      urlToImage:
        "https://media.zenfs.com/en/coindesk_75/f96b0ae84958f9e2bfc7699e720a9f0e",
      publishedAt: "2025-04-11T20:44:27Z",
      content:
        "U.S. stocks have become more volatile than Bitcoin, with the S&amp;P 500s seven-day realized volatility surging to 169% compared to Bitcoins 83%. CoinDesk's Christine Lee explores on \"Chart of the Da… [+2 chars]",
    },
  ];
  constructor() {
    super();
    console.log("Hello from News Component");
    this.state = {
      articles: [],
      loading: false,
    };
  }

  render() {
    return (
      <div className="container text-center mt-3">
        <h1>Welcome to the News Section!</h1>
  
        <div className="row mt-3">
          {this.articles
            .filter((element) => element.title && element.description && element.urlToImage) // Filter step
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
      </div>
    );
  }
  
}

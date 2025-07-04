export async function handler(event) {
  const apiKey = process.env.NEWS_API_KEY;
  const { country, category, page, pageSize } = event.queryStringParameters;

  console.log("API key:", apiKey); // Log if apiKey exists
  console.log("Received params:", { country, category, page, pageSize });

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is missing in environment variables." }),
    };
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    console.log("NewsAPI status:", response.status);
    const data = await response.json();
    console.log("Fetched data:", data);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "NewsAPI request failed", details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news", details: error.message }),
    };
  }
}

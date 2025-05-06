export async function handler(event, context) {
    const { category = 'general', country = 'us', page = 1, pageSize = 10 } = event.queryStringParameters;
    const apiKey = process.env.VITE_NEWS_API_KEY;
  
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }
  
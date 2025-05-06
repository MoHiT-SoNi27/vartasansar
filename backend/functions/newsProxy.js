export async function handler(event) {
    const apiKey = process.env.NEWS_API_KEY;
    const { country, category, page, pageSize } = event.queryStringParameters;

    // API URL with all query params
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch news" })
        };
    }
}

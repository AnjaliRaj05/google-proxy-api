import fetch from 'node-fetch';

export async function handler(event) {
  const { input, sessiontoken } = event.queryStringParameters;

  if (!input || !sessiontoken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing input or sessiontoken' }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.GOOGLE_API_KEY}&sessiontoken=${sessiontoken}&language=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Autocomplete error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

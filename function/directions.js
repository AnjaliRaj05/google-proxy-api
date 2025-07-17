import fetch from 'node-fetch';

export async function handler(event) {
  const { place_id } = event.queryStringParameters;

  if (!place_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing place_id' }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Place Details error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

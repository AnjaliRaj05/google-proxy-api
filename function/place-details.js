import fetch from 'node-fetch';

export async function handler(event) {
  const { origin, destination } = event.queryStringParameters;

  if (!origin || !destination) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing origin or destination' }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Directions error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

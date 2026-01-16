export default async (req) => {
  const payload = await req.json();

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  return new Response(JSON.stringify(data));
};

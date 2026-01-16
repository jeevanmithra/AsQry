export default async (req) => {
  // 👇 SAFETY CHECK
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Only POST requests allowed" }),
      { status: 405 }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid or missing JSON body" }),
      { status: 400 }
    );
  }

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

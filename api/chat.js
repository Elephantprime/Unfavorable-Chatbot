export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Invoke, a memory-linked assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await openaiRes.json();
    const reply = data?.choices?.[0]?.message?.content || "No reply received.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to contact OpenAI" });
  }
}

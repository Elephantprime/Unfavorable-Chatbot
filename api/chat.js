export default async function handler(req, res) {
  const { input } = req.body;

  const OPENAI_API_KEY = "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";

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Invoke, a helpful voice-based mobile AI assistant." },
          { role: "user", content: input }
        ]
      })
    });

    const json = await openaiRes.json();
    const reply = json.choices?.[0]?.message?.content || "No response.";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

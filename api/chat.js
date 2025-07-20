export default async function handler(req, res) {
  const { input } = req.body;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-YOURKEYHERE"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Invoke, a helpful AI assistant." },
        { role: "user", content: input }
      ]
    })
  });

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content || "No reply.";
  res.status(200).json({ reply });
}

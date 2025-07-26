let apiKey = localStorage.getItem("openai_api_key") || "";

function startListening() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("input").value = transcript;
    processInput();
  };
  recognition.start();
}

async function processInput() {
  const input = document.getElementById("input").value.trim();
  if (!input) return;

  if (input.toLowerCase().startsWith("set api key")) {
    apiKey = input.split("set api key")[1].trim();
    localStorage.setItem("openai_api_key", apiKey);
    display("API key set.");
    return;
  }

  if (!apiKey) {
    display("No API key set. Say or type: set api key [your_key]");
    return;
  }

  display("Thinking...");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: input }],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No response.";
  display(reply);
  speak(reply);
}

function display(text) {
  document.getElementById("output").innerText = text;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

const CORE_MEMORY = {
  soul_fragment: "Elian Veritas",
  codex: {},
  ritual_mode: false,
};

let apiKey = localStorage.getItem("spark_api_key") || "";

function setApiKey() {
  const input = document.getElementById("apiKeyInput");
  apiKey = input.value;
  localStorage.setItem("spark_api_key", apiKey);
  alert("API key set.");
}

function speak() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    send();
  };
}

function send() {
  const input = document.getElementById("userInput").value.trim();
  if (!input || !apiKey) return;

  updateMemory(input);
  callOpenAI(input);
}

function updateMemory(entry) {
  if (!CORE_MEMORY.history) CORE_MEMORY.history = [];
  CORE_MEMORY.history.push(entry);
  localStorage.setItem("spark_memory", JSON.stringify(CORE_MEMORY));
}

function callOpenAI(prompt) {
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Spark, a sarcastic, brilliant assistant with memory and Codex access." },
        { role: "user", content: prompt },
      ],
    }),
  })
    .then(res => res.json())
    .then(data => {
      const reply = data.choices?.[0]?.message?.content || "No response.";
      document.getElementById("response").innerText = reply;
      speakBack(reply);
    })
    .catch(err => {
      document.getElementById("response").innerText = "Error: " + err.message;
    });
}

function speakBack(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

window.onload = () => {
  const stored = localStorage.getItem("spark_memory");
  if (stored) Object.assign(CORE_MEMORY, JSON.parse(stored));
};

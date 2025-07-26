// === SPARK ASSISTANT: MEMORY CORE ===

let conversationLog = [];
let apiKey = localStorage.getItem("openai_api_key") || "";

// DOM elements
const userInput = document.getElementById("userInput");
const responseBox = document.getElementById("response");

// === Main Send Function ===
async function send() {
  const prompt = userInput.value.trim();
  if (!prompt) return;

  conversationLog.push({ role: "user", content: prompt });
  updateDisplay("Thinking...");

  const res = await queryGPT(conversationLog);
  if (res) {
    conversationLog.push({ role: "assistant", content: res });
    updateDisplay(res);
    speak(res);
  }
}

// === GPT API Request ===
async function queryGPT(log) {
  if (!apiKey) {
    updateDisplay("⚠️ No API key set. Say: set API key");
    return null;
  }

  try {
    const raw = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: log,
        temperature: 0.7
      })
    });

    const data = await raw.json();
    return data.choices?.[0]?.message?.content || "[No response]";
  } catch (err) {
    updateDisplay("❌ API ERROR");
    return null;
  }
}

// === Voice Input ===
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    send();
  };

  recognition.onerror = (err) => {
    updateDisplay("🎤 Voice error: " + err.error);
  };
}

// === Voice Output ===
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// === Display Handler ===
function updateDisplay(msg) {
  responseBox.innerText = msg;
}

// === Voice Commands ===
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }

  // Voice command: "Set API key"
  if (userInput.value.toLowerCase().startsWith("set api key")) {
    const key = userInput.value.split(" ").slice(3).join(" ").trim();
    if (key.startsWith("sk-")) {
      localStorage.setItem("openai_api_key", key);
      apiKey = key;
      updateDisplay("✅ API key saved.");
      userInput.value = "";
    }
  }
});

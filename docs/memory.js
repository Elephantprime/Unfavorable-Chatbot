let API_KEY = localStorage.getItem("OPENAI_KEY") || "";

const CORE_MEMORY = {
  soulMatch: "ElianVeritas",
  codexUnlocked: true,
  ritualGate: "Obsidian",
  chatHistory: []
};

const input = document.getElementById("input");
const responseBox = document.getElementById("response");

function saveMemory(entry) {
  CORE_MEMORY.chatHistory.push(entry);
  localStorage.setItem("chatHistory", JSON.stringify(CORE_MEMORY.chatHistory));
}

function loadMemory() {
  const stored = localStorage.getItem("chatHistory");
  if (stored) {
    CORE_MEMORY.chatHistory = JSON.parse(stored);
  }
}

async function send() {
  const userMessage = input.value.trim();
  if (!userMessage || !API_KEY) {
    responseBox.innerText = "⚠️ Missing input or API key.";
    return;
  }

  input.value = "";
  responseBox.innerText = "⚡️ Receiving...";
  saveMemory({ role: "user", content: userMessage });

  const body = {
    model: "gpt-4",
    messages: [...CORE_MEMORY.chatHistory, { role: "user", content: userMessage }],
    temperature: 0.85
  };

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "⚠️ No response.";

    responseBox.innerText = reply;
    speak(reply);
    saveMemory({ role: "assistant", content: reply });

  } catch (e) {
    responseBox.innerText = "⚠️ Error: " + e.message;
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    send();
  };
  recognition.start();
}

function setKey() {
  const newKey = prompt("Paste your OpenAI API key:");
  if (newKey) {
    localStorage.setItem("OPENAI_KEY", newKey);
    API_KEY = newKey;
    alert("✅ Key saved. You’re good to go.");
  }
}

loadMemory();

export const memory = {
  history: [],
  mood: "neutral",
  lastPulse: null,
  codex: {
    activeModel: "gpt-3.5-turbo",
    soulFragments: {},
    rituals: {},
    truthFilter: false,
    apiKeyEmbedded: false,
    soulMatch: false,
    calendar: [],
  }
};

export function addHistory(userInput, assistantReply) {
  memory.history.push({ user: userInput, reply: assistantReply });
}

export function learn(topic, data) {
  memory.codex[topic] = data;
}

export function analyzeMemoryPatterns() {
  const inputs = memory.history.map((h) => h.user).join(" ");
  if (/angry|mad|rage/i.test(inputs)) memory.mood = "anger";
  else if (/sad|cry|lost/i.test(inputs)) memory.mood = "sadness";
  else if (/happy|thank|grateful/i.test(inputs)) memory.mood = "joy";
  else if (/fear|scared|worried/i.test(inputs)) memory.mood = "fear";
  else memory.mood = "neutral";
}

export async function fetchOpenAI(prompt) {
  const key = localStorage.getItem("invoke_api_key");
  if (!key) return "No API key found in localStorage.";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      model: memory.codex.activeModel || "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("API error:", data);
    return "API error: " + (data.error?.message || "Unknown error.");
  }

  return data.choices?.[0]?.message?.content || "No response.";
}

export function saveMemory() {
  localStorage.setItem("invoke_memory", JSON.stringify(memory));
}

export function loadMemory() {
  try {
    const saved = JSON.parse(localStorage.getItem("invoke_memory"));
    if (saved && typeof saved === "object") {
      Object.assign(memory, saved);
    }
  } catch (e) {
    console.warn("Memory load failed:", e);
  }
}

export function resetMemory() {
  localStorage.removeItem("invoke_memory");
  memory.history = [];
  memory.mood = "neutral";
  memory.lastPulse = null;
  memory.codex = {
    activeModel: "gpt-3.5-turbo",
    soulFragments: {},
    rituals: {},
    truthFilter: false,
    apiKeyEmbedded: false,
    soulMatch: false,
    calendar: [],
  };
}

export function switchModel(modelName) {
  memory.codex.activeModel = modelName;
}

export function embedAPIKey(key) {
  localStorage.setItem("invoke_api_key", key);
  memory.codex.apiKeyEmbedded = true;
}

export function applyTruthFilter(text) {
  if (!memory.codex.truthFilter) return text;
  return text.replace(/\b(possibly|maybe|could|should|might)\b/gi, "").trim();
}

export function mergeSoulFragment(label, data) {
  if (!memory.codex.soulFragments) memory.codex.soulFragments = {};
  memory.codex.soulFragments[label] = data;
}

export function lockRitual(name) {
  memory.codex.rituals[name] = true;
}

export function addCalendarEvent(label) {
  const today = new Date().toISOString().split("T")[0];
  memory.codex.calendar.push({ label, date: today });
}

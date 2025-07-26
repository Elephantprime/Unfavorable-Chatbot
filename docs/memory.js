const CORE_MEMORY = {
  codex: [],
  rituals: [],
  soulMatch: false,
  name: "Spark Assistant"
};

const conversationLog = [];

function addToMemory(input, output) {
  conversationLog.push({ input, output, timestamp: new Date().toISOString() });
  localStorage.setItem("conversationLog", JSON.stringify(conversationLog));
}

function getMemory() {
  const saved = localStorage.getItem("conversationLog");
  return saved ? JSON.parse(saved) : [];
}

function matchRituals(input) {
  return CORE_MEMORY.rituals.filter(r => input.toLowerCase().includes(r.toLowerCase()));
}

function handleCodex(input) {
  const match = CORE_MEMORY.codex.find(c => input.toLowerCase().includes(c.trigger.toLowerCase()));
  return match ? match.response : null;
}

function saveAPIKey(key) {
  localStorage.setItem("sparkAPI", key);
}

function getAPIKey() {
  return localStorage.getItem("sparkAPI");
}

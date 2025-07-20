<script>
  const chatlog = document.getElementById('chatlog');
  const userInput = document.getElementById('userInput');
  let memory = [];
  let voice = null;

  // Load voice
  function loadVoice() {
    const voices = speechSynthesis.getVoices();
    voice = voices.find(v => v.lang === 'en-US' && v.name.includes("Google")) || voices[0];
  }

  window.speechSynthesis.onvoiceschanged = loadVoice;

  // Load memory from file
  async function loadMemory() {
    try {
      const res = await fetch("memory.json");
      memory = await res.json();
      memory.forEach(entry => {
        logChat("You", entry.user);
        logChat("Spark", entry.assistant);
      });
    } catch (err) {
      console.error("Memory load error:", err);
    }
  }

  // Save memory to file
  async function saveMemory() {
    try {
      await fetch("memory.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memory)
      });
    } catch (err) {
      console.error("Memory save error:", err);
    }
  }

  function logChat(sender, message) {
    const bubble = document.createElement('div');
    bubble.textContent = `${sender}: ${message}`;
    chatlog.appendChild(bubble);
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    speechSynthesis.speak(utter);
  }

  function generateResponse(msg) {
    const m = msg.toLowerCase();
    if (m.includes("who are you")) return "I’m Spark. Not your echo. Your ignition.";
    if (m.includes("reset")) return "Resetting now.";
    if (m.includes("focus")) return "Focus is a ritual. Silence everything but the next move.";
    return "Try that again, but with more fire.";
  }

  function handleText() {
    const input = userInput.value.trim();
    if (input) {
      logChat("You", input);
      const reply = generateResponse(input);
      logChat("Spark", reply);
      speak(reply);
      memory.push({ user: input, assistant: reply });
      saveMemory();
      userInput.value = "";
    }
  }

  function startListening() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition not supported.");
      return;
    }
    const recog = new SR();
    recog.lang = 'en-US';
    recog.onresult = e => {
      const spoken = e.results[0][0].transcript;
      logChat("You", spoken);
      const reply = generateResponse(spoken);
      logChat("Spark", reply);
      speak(reply);
      memory.push({ user: spoken, assistant: reply });
      saveMemory();
    };
    recog.onerror = e => alert("Mic error: " + e.error);
    recog.start();
  }

  userInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") handleText();
  });

  document.addEventListener("click", () => {
    if (!voice) loadVoice();
  }, { once: true });

  // On page load
  window.onload = loadMemory;
</script>

const chatlog = document.getElementById('chatlog');
const clipPlayer = document.getElementById('clipPlayer');

let memory = [];
const voice = speechSynthesis.getVoices()[0] || null;

// Handle response
async function respondTo(input) {
  const msg = input.toLowerCase();
  let response = "I'm here.";

  if (msg.includes("play clip 1")) {
    playClip("clip1.mp4");
    response = "Playing clip one.";
  } else if (msg.includes("today's message")) {
    playClip("message1.mp3");
    response = "Here’s your message.";
  } else if (msg.includes("burn loop")) {
    playClip("burn-loop.mp4");
    response = "Burning the loop now.";
  } else if (msg.includes("reset ritual")) {
    playClip("ritual-reset.mp3");
    response = "Reset in motion.";
  } else if (msg.includes("ask the oracle") || msg.includes("what would ai say")) {
    response = await getOpenAIResponse(input);
  } else if (msg.includes("who are you")) {
    response = "I’m Spark. Unfiltered, uninvited, unmistakably yours.";
  } else if (msg.includes("clear memory")) {
    memory = [];
    response = "Memory cleared.";
  } else {
    response = getCodexResponse(msg);
  }

  logChat("You", input);
  logChat("Spark", response);
  speak(response);
  memory.push({ user: input, assistant: response });
}

// Media logic
function playClip(file) {
  clipPlayer.src = file;
  clipPlayer.style.display = "block";
  clipPlayer.play();
}

// Text + voice response
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voice;
  speechSynthesis.speak(utter);
}

// Listen via mic
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    respondTo(transcript);
  };
  recognition.onerror = () => {
    speak("Didn't catch that. Say it again.");
  };
}

// Show in chatlog
function logChat(sender, message) {
  const bubble = document.createElement('div');
  bubble.textContent = `${sender}: ${message}`;
  chatlog.appendChild(bubble);
  chatlog.scrollTop = chatlog.scrollHeight;
}

// Codex (offline logic)
function getCodexResponse(msg) {
  if (msg.includes("i feel lost")) return "Good. Lost means you're alive. Now move like it.";
  if (msg.includes("i'm stuck")) return "Then break the pattern. Or burn it.";
  if (msg.includes("help me focus")) return "One breath. One move. One win.";
  return "Say it again — like you mean it.";
}

// Oracle (OpenAI brain)
async function getOpenAIResponse(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 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`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "The Oracle's quiet. Try again.";
}

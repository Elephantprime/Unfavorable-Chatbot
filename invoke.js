<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Spark Assistant</title>
  <style>
    body { font-family: Arial, sans-serif; background: #111; color: #eee; padding: 20px; }
    #chatlog { border: 1px solid #444; padding: 10px; height: 300px; overflow-y: auto; margin-bottom: 10px; background: #222; }
    button { padding: 10px 20px; font-size: 16px; background: #444; color: white; border: none; cursor: pointer; }
    button:hover { background: #666; }
    video, audio { display: none; margin-top: 10px; max-width: 100%; }
  </style>
</head>
<body>
  <h1>Spark</h1>
  <div id="chatlog"></div>
  <button onclick="startListening()">🎤 Talk</button>
  <video id="clipPlayer" controls></video>

  <script>
    const chatlog = document.getElementById('chatlog');
    const clipPlayer = document.getElementById('clipPlayer');

    let memory = [];
    let voice = null;
    let voicesLoaded = false;

    function loadVoicesWhenReady(callback) {
      let tries = 0;
      const interval = setInterval(() => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0 || tries > 10) {
          voice = voices.find(v =>
            v.name.includes("Female") ||
            v.name.includes("Google") ||
            v.lang === "en-US"
          ) || voices[0] || null;
          voicesLoaded = true;
          clearInterval(interval);
          if (callback) callback();
        }
        tries++;
      }, 200);
    }
    loadVoicesWhenReady();

    async function respondTo(input) {
      const msg = input.toLowerCase();
      let response = "I'm here.";

      if (msg.includes("play clip 1")) {
        playClip("clip1.mp4");
        response = "Playing clip one.";
      } else if (msg.includes("play clip 2")) {
        playClip("clip2.mp4");
        response = "Clip two. Set and rolling.";
      } else if (msg.includes("today's message")) {
        playClip("message1.mp3");
        response = "Here’s your message.";
      } else if (msg.includes("reset ritual")) {
        playClip("ritual-reset.mp3");
        response = "Ritual reset started.";
      } else if (msg.includes("burn loop")) {
        response = "No burn-loop file found. Skipping.";
      } else if (msg.includes("ask the oracle") || msg.includes("what would ai say")) {
        response = await getOpenAIResponse(input);
      } else if (msg.includes("who are you")) {
        response = "I’m Spark. Not your echo. Your ignition.";
      } else if (msg.includes("clear memory")) {
        memory = [];
        response = "Memory wiped.";
      } else {
        response = getCodexResponse(msg);
      }

      logChat("You", input);
      logChat("Spark", response);
      speak(response);
      memory.push({ user: input, assistant: response });
    }

    function speak(text) {
      const utter = new SpeechSynthesisUtterance(text);
      if (voicesLoaded && voice) {
        utter.voice = voice;
      }
      speechSynthesis.speak(utter);
    }

    function playClip(file) {
      clipPlayer.src = file;
      clipPlayer.style.display = "block";
      clipPlayer.play();
    }

    function logChat(sender, message) {
      const bubble = document.createElement('div');
      bubble.textContent = `${sender}: ${message}`;
      chatlog.appendChild(bubble);
      chatlog.scrollTop = chatlog.scrollHeight;
    }

    function getCodexResponse(msg) {
      if (msg.includes("i feel lost")) return "Good. That means you're off the map. Now draw your own.";
      if (msg.includes("i'm stuck")) return "Then it’s time to break. Or burn.";
      if (msg.includes("help me focus")) return "Focus is a ritual. Silence everything but the next move.";
      return "Try that again, but with more fire.";
    }

    function startListening() {
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        speak("Speech recognition is not supported in this browser.");
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        console.log("Listening...");
      };

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log("Heard:", transcript);
        respondTo(transcript);
      };

      recognition.onerror = function(event) {
        console.error("Speech error:", event.error);
        speak("Didn't catch that. Say it again.");
      };

      recognition.onend = () => {
        console.log("Recognition ended.");
      };

      recognition.start();
    }

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
      return data.choices?.[0]?.message?.content || "The Oracle's silent. Ask it with clarity.";
    }
  </script>
</body>
</html>

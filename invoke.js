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

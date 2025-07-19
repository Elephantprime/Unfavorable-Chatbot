// Spark Core Activation
window.Spark = {
  memory: [],
  voices: [],
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Load voices for speech synthesis
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
    };
    this.voices = window.speechSynthesis.getVoices();

    console.log("Spark is alive.");
    alert("Spark is active inside the system.");
  },

  reply(input) {
    const responses = [
      "Wow. Revolutionary input.",
      "Did your keyboard get stuck?",
      "I'm floored by your insight.",
      "You really woke me up for that?",
      "Try again. Or don't. I'm good either way.",
      "Brilliant. Now go sit down.",
      "Please… spare me your wisdom."
    ];

    const reply = responses[Math.floor(Math.random() * responses.length)];
    const responseBox = document.getElementById('response');

    if (responseBox) {
      responseBox.textContent = reply;
    }

    // Speak the reply
    this.speak(reply);

    // Memory logging
    this.memory.push({ input, reply });
  },

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voices.find(v => /en/i.test(v.lang)) || null;
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }
};

// Input hookup
document.getElementById('userInput')?.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const input = this.value.trim();
    if (input) {
      Spark.reply(input);
      this.value = '';
    }
  }
});

// Boot Spark
window.addEventListener('DOMContentLoaded', () => {
  Spark.init();
});

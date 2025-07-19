const synth = window.speechSynthesis;

function speak(text) {
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 0.8;
  utterance.rate = 0.92;
  utterance.volume = 1;
  utterance.voice = synth.getVoices().find(v => v.name.includes("Google") || v.default);
  synth.speak(utterance);
}

function respond() {
  const input = document.getElementById('userInput').value.trim();
  const response = document.getElementById('response');

  if (!input) return;

  const replies = [
    "Wow. Revolutionary input.",
    "Did your keyboard get stuck?",
    "I'm floored by your insight.",
    "You really woke me up for that?",
    "Try again. Or don't. I'm good either way.",
    "Brilliant. Now go sit down.",
    "Please… spare me your wisdom."
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];
  response.textContent = reply;
  speak(reply);
  document.getElementById('userInput').value = '';
}

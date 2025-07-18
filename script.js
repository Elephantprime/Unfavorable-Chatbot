const input = document.getElementById('userInput');
const response = document.getElementById('response');

input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const userMessage = input.value.trim();
    if (!userMessage) return;
    input.value = '';
    response.textContent = '...thinking...';

    const reply = await fakeGPT(userMessage);
    response.textContent = reply;
    speak(reply); // 🔊 Speak the response
  }
});

async function fakeGPT(message) {
  const lower = message.toLowerCase();

  if (lower.includes("lazy")) {
    return "You're not lazy. You're avoiding the cost of commitment.";
  }

  if (lower.includes("stuck")) {
    return "You're not stuck. You're pausing to avoid the fear of movement.";
  }

  if (lower.includes("procrastinate")) {
    return "Procrastination is fear in disguise. And fear lies.";
  }

  return "Try again. Say something you actually believe.";
}

// 🔊 Speak function using browser TTS
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.1;
  utterance.lang = 'en-US';
  speechSynthesis.cancel(); // Stop any ongoing speech
  speechSynthesis.speak(utterance);
}

const input = document.getElementById('userInput');
const response = document.getElementById('response');

input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const userMessage = input.value;
    input.value = '';
    response.textContent = '...thinking...';

    // Replace this with GPT API call if needed
    const reply = await fakeGPT(userMessage);
    response.textContent = reply;
  }
});

async function fakeGPT(message) {
  if (message.toLowerCase().includes('lazy')) {
    return "You’re not lazy. You're undisciplined. Let’s fix that.";
  }
  if (message.toLowerCase().includes('stuck')) {
    return "Stuck is a story. Want to write a new one?";
  }
  return "Good. Now say something real.";
}

document.addEventListener("DOMContentLoaded", function () {
  const avatar = document.getElementById("avatar");
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  // Greeting message
  addBotMessage("Hey. I'm your mindset coach. What lie are you ready to stop telling yourself?");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const userMessage = input.value.trim();
      addUserMessage(userMessage);
      input.value = "";

      // Simulated bot response
      setTimeout(() => {
        addBotMessage(generateResponse(userMessage));
      }, 1000);
    }
  });

  function addUserMessage(message) {
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.textContent = message;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function addBotMessage(message) {
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.textContent = message;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function generateResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes("not good enough")) return "You're not supposed to be. You're supposed to be *real*.";
    if (lower.includes("tired")) return "Then rest. But don’t quit.";
    if (lower.includes("alone")) return "You were never alone. You were just waiting to meet you.";
    return "Say it again. Louder this time.";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const userMessage = input.value.trim();
      addUserMessage(userMessage);
      input.value = "";

      // Simple bot reply
      setTimeout(() => {
        addBotMessage("I see. Keep going.");
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
});

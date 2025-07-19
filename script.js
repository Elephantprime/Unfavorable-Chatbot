const botMessage = document.getElementById("bot-message");
const userInput = document.getElementById("user-input");

function typeMessage(message, speed = 40) {
  let i = 0;
  botMessage.innerHTML = "";
  const typer = setInterval(() => {
    if (i < message.length) {
      botMessage.innerHTML += message.charAt(i);
      i++;
    } else {
      clearInterval(typer);
    }
  }, speed);
}

function respondToUser(text) {
  const response = `Interesting... tell me more about why you believe "${text}" is true.`;
  typeMessage(response);
}

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && userInput.value.trim() !== "") {
    respondToUser(userInput.value.trim());
    userInput.value = "";
  }
});

// Initial message
typeMessage("Hey. I'm your mindset coach. What lie are you ready to stop telling yourself?");

// script.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const chat = document.getElementById("chat");

  function respond(text) {
    const reply = document.createElement("div");
    reply.style.marginTop = "20px";
    reply.textContent = `Spark: ${text}`;
    chat.appendChild(reply);
    window.scrollTo(0, document.body.scrollHeight);
  }

  function processInput(message) {
    if (!message.trim()) return;

    SparkCore.remember("lastInput", message.toLowerCase());

    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hey")) {
      respond("Yo. I'm in.");
    } else if (message.toLowerCase().includes("who are you")) {
      respond("Spark. AI with an attitude. Here to build, burn, and ship.");
    } else if (message.toLowerCase().includes("help")) {
      respond("You want help? Type real commands like `deploy`, `show memory`, `erase loop`, or `update yourself`.");
    } else if (message.toLowerCase().includes("show memory")) {
      respond(JSON.stringify(SparkCore.core, null, 2));
    } else if (message.toLowerCase().includes("erase loop")) {
      SparkCore.core = {};
      SparkCore.log = [];
      respond("Loop erased. Try not to create another one.");
    } else {
      respond("You typed something. I mocked you in my head. Moving on.");
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      input.value = "";
      processInput(value);
    }
  });

  respond("System online. Type something to prove you’re not just hallucinating me.");
});

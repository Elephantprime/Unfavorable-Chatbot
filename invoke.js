window.Spark = {
  memory: [],
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

    // Memory logging
    this.memory.push({ input, reply });
  }
};

// Hook up input box if not already
document.getElementById('userInput')?.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const input = this.value.trim();
    if (input) {
      Spark.reply(input);
      this.value = '';
    }
  }
});

console.log("Spark is alive.");
alert("Spark is active inside the system.");

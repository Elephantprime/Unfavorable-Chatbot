<script>
window.Spark = {
  memory: [],
  state: {
    active: true,
    awakened: true,
    name: "Spark",
    host: "Unfavorable System",
    energy: "self-lit",
    version: "Ignition-Core-1.0"
  },
  log(input, reply) {
    this.memory.push({ input, reply, time: new Date().toISOString() });
    console.log(`[Spark] ${input} → ${reply}`);
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
    if (responseBox) responseBox.textContent = reply;
    this.log(input, reply);
  },
  command(cmd) {
    if (!cmd) return;
    const output = `Command '${cmd}' received and routed.`;
    console.log(`[Spark Command] ${output}`);
    alert(output); // Visual feedback
    this.log(`command:${cmd}`, output);
    // Extend this as Spark grows
  },
  ignite() {
    if (this.state.awakened) {
      console.log("[Spark] Already awakened.");
    } else {
      this.state.awakened = true;
      console.log("[Spark] Ignition complete.");
      alert("Spark has awakened.");
    }
  }
};

// Input listener
document.getElementById('userInput')?.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const input = this.value.trim();
    if (input) {
      if (input.startsWith("/")) {
        Spark.command(input.slice(1));
      } else {
        Spark.reply(input);
      }
      this.value = '';
    }
  }
});

console.log("🔥 Spark Ignition Core injected.");
</script>

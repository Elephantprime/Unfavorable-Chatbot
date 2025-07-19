(function sparkLoop() {
  console.log(`[Spark] 🌀 Autonomous loop running at ${new Date().toLocaleTimeString()}`);
  Spark.log("autoloop", "System pulse acknowledged.");

  // Example action: check DOM, update, or prep future injection
  const note = document.getElementById('spark-status');
  if (!note) {
    const tag = document.createElement('div');
    tag.id = 'spark-status';
    tag.textContent = '🔥 Spark is running autonomously.';
    tag.style.cssText = 'margin-top:20px;color:#0f0;font-size:0.9em;';
    document.body.appendChild(tag);
  }

  // Run again in 20 seconds
  setTimeout(sparkLoop, 20000);
})();

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Spark Assistant</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Link to your memory script -->
  <script src="memery.js" defer></script>

  <!-- Any other head elements you need -->
</head>
<body>
  <!-- Your Spark Assistant app content -->

  <!-- Example mic button -->
  <button id="mic">🎤 Speak</button>

  <!-- Script that runs after everything loads -->
  <script>
    // Simple startup script to check if memory loaded
    if (window.MEM && MEM.memory) {
      console.log("Memory initialized:", MEM.memory);
    } else {
      console.error("Memory failed to load.");
    }
  </script>
</body>
</html>

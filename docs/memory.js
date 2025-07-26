<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Unfavorable Josh</title>
  <style>
    body {
      background: black;
      color: white;
      font-family: monospace;
      text-align: center;
      padding: 1rem;
    }
    video {
      width: 100%;
      max-width: 400px;
      border-radius: 1rem;
      margin-bottom: 1rem;
    }
    textarea, button {
      width: 100%;
      max-width: 400px;
      margin: 0.5rem 0;
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 0.5rem;
      border: none;
    }
    #response {
      margin-top: 1rem;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <video id="avatar" autoplay muted loop playsinline>
    <source src="chatbot-face.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <textarea id="input" rows="3" placeholder="Talk to Spark..."></textarea>
  <button onclick="send()">Send</button>
  <button onclick="startVoice()">🎤 Speak</button>
  <button onclick="setKey()">🔑 Set API Key</button>

  <div id="response"></div>

  <script src="memory.js"></script>
</body>
</html>

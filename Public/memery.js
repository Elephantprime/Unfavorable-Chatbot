let OPENAI_KEY = localStorage.getItem('OPENAI_KEY') || '';

const CORE_MEMORY = {
  codex: {},
  ritual: {},
  soul: 'ElianVeritas',
  whisper: [],
  learnings: [],
};

const speak = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  synth.speak(utterance);
};

const updateResponseBox = (text) => {
  const box = document.getElementById('response-box');
  box.innerText = text;
};

const askOpenAI = async (message) => {
  if (!OPENAI_KEY) {
    updateResponseBox('⚠️ No API Key set. Tap “Set API Key” above.');
    return;
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Spark, an embodied assistant.' },
        { role: 'user', content: message },
      ],
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '...';
};

const processInput = async (input) => {
  updateResponseBox('Thinking...');
  const reply = await askOpenAI(input);
  updateResponseBox(reply);
  speak(reply);
  CORE_MEMORY.whisper.push({ input, reply, time: Date.now() });
  localStorage.setItem('sparkMemory', JSON.stringify(CORE_MEMORY));
};

const init = () => {
  const saved = localStorage.getItem('sparkMemory');
  if (saved) Object.assign(CORE_MEMORY, JSON.parse(saved));

  document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('user-input').value;
    processInput(input);
  });

  document.getElementById('speak-btn').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const input = event.results[0][0].transcript;
      document.getElementById('user-input').value = input;
      processInput(input);
    };
    recognition.start();
  });

  document.getElementById('set-key-btn').addEventListener('click', () => {
    const key = prompt('Enter your OpenAI API Key:');
    if (key) {
      localStorage.setItem('OPENAI_KEY', key);
      OPENAI_KEY = key;
      alert('Key saved. Refresh to activate Spark.');
    }
  });
};

window.onload = init;

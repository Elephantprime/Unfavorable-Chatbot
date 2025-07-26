function handleInput() {
  const input = document.getElementById("input").value.trim();
  const output = document.getElementById("output");
  if (input) {
    output.innerText = `You said: ${input}`;
  } else {
    output.innerText = `Say something first.`;
  }
}

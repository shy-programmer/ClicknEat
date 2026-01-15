const submit = document.getElementById("sendButton");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

document.addEventListener("DOMContentLoaded", async () => {

  const intro = await fetch("/api/clickneat/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId })
  });
  const data = await intro.json();
  addMessage(data.response, "bot");
  
});
const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
localStorage.setItem("sessionId", sessionId);

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(text) {
  submit.disabled = true;

  addMessage(text, "user");

  const res = await fetch("/api/clickneat/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, text })
  });

  const data = await res.json();
  console.log(data);
  addMessage(data.response, "bot");

  submit.disabled = false;
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;

  sendMessage(input.value);
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!input.value.trim()) return;

    sendMessage(input.value);
    input.value = "";
  }
});




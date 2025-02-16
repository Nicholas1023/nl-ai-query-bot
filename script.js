window.onload = function() {
    document.getElementById('container').innerHTML = '<div class="chat-container" id="chat-container"><div class="chat-header"><img src="https://Nicholas1023.github.io/nl-ai-query-bot/logo.png" alt="NL AI Query Bot logo"><div class="chat-title">NL AI Query Bot</div><div style="text-align: center; padding: 2px; margin-left: auto;"><button onclick="newChat()">New Chat</button></div></div><div class="chat-box" id="chatBox"><div class="chat-message bot">Hello, I\'m NL AI Query Bot! Ask me anything about artificial intelligence!</div></div><div class="input-container"><input type="text" id="userInput" placeholder="Message NL AI Query Bot"><button onclick="sendMessage()">Send</button></div><div class="disclaimer"><b>Important: </b>NL AI Query Bot may provide inaccurate information. Please check for any mistakes or errors.</div></div>';
    
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        sendMessage();
    }
});
};

const responses = {
  "what is ai": "AI (artificial intelligence), is the simulation of humans by machines.",
  // More responses will be added.
};

function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  const chatBox = document.getElementById("chatBox");

  if (userInput === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "chat-message user";
  userMessage.textContent = userInput;
  chatBox.appendChild(userMessage);

  const loadingMessage = document.createElement("div");
  loadingMessage.className = "chat-message bot";
  loadingMessage.textContent = "Typing...";
  chatBox.appendChild(loadingMessage);

  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(loadingMessage);
    const botMessage = document.createElement("div");
    botMessage.className = "chat-message bot";

    const response =
    responses[userInput.toLowerCase()] || "I'm sorry, I don't have information on that topic. Try asking something else about AI!";
    botMessage.textContent = response;
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
  
  
  document.getElementById("userInput").value = "";
}

function newChat() {
    location.reload();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("https://Nicholas1023.github.io/nl-ai-query-bot/sw.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

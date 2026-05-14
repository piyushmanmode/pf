(function () {
  const currentScript = document.currentScript;
  const chatbotId = currentScript?.getAttribute("data-chatbot") || "default-bot";

  const style = document.createElement("style");
  style.textContent = `
    #agentkit-chatbot-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      background: #2563eb;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 9999;
    }

    #agentkit-chatbot-box {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 320px;
      max-width: calc(100vw - 40px);
      height: 420px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.18);
      overflow: hidden;
      display: none;
      flex-direction: column;
      z-index: 9999;
      font-family: Arial, sans-serif;
    }

    #agentkit-chatbot-header {
      background: #2563eb;
      color: white;
      padding: 14px 16px;
      font-weight: bold;
    }

    #agentkit-chatbot-messages {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      background: #f8fafc;
    }

    .agentkit-msg {
      margin: 8px 0;
      padding: 10px 12px;
      border-radius: 12px;
      max-width: 80%;
      line-height: 1.4;
      font-size: 14px;
    }

    .agentkit-bot {
      background: #e2e8f0;
      color: #111827;
    }

    .agentkit-user {
      background: #2563eb;
      color: white;
      margin-left: auto;
    }

    #agentkit-chatbot-input-area {
      display: flex;
      border-top: 1px solid #e5e7eb;
      background: white;
    }

    #agentkit-chatbot-input {
      flex: 1;
      border: none;
      padding: 12px;
      font-size: 14px;
      outline: none;
    }

    #agentkit-chatbot-send {
      border: none;
      background: #2563eb;
      color: white;
      padding: 0 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement("button");
  button.id = "agentkit-chatbot-button";
  button.innerHTML = "💬";

  const box = document.createElement("div");
  box.id = "agentkit-chatbot-box";
  box.innerHTML = `
    <div id="agentkit-chatbot-header">Support Bot</div>
    <div id="agentkit-chatbot-messages">
      <div class="agentkit-msg agentkit-bot">Hi! I am chatbot <b>${chatbotId}</b>. How can I help you?</div>
    </div>
    <div id="agentkit-chatbot-input-area">
      <input id="agentkit-chatbot-input" type="text" placeholder="Type your message..." />
      <button id="agentkit-chatbot-send">Send</button>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(box);

  const messages = box.querySelector("#agentkit-chatbot-messages");
  const input = box.querySelector("#agentkit-chatbot-input");
  const send = box.querySelector("#agentkit-chatbot-send");

  button.addEventListener("click", () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
  });

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `agentkit-msg ${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(userText) {
    const lower = userText.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello! How can I assist you today?";
    }
    if (lower.includes("price")) {
      return "Please share the product name, and I will help with pricing.";
    }
    if (lower.includes("refund")) {
      return "Refunds are usually processed within 5 to 7 business days.";
    }
    if (lower.includes("order")) {
      return "Please share your order ID so I can help track it.";
    }

    return "Thanks for your message. Our support team will help you soon.";
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "agentkit-user");
    input.value = "";

    setTimeout(() => {
      addMessage(botReply(text), "agentkit-bot");
    }, 500);
  }

  send.addEventListener("click", handleSend);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleSend();
  });
})();

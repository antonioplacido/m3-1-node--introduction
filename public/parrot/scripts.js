const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement("p");

  messageElem.classList.add("message", author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === "user") messageInput.value = "";
  handleFocus();
};

const sendMessage = (event) => {
  event.preventDefault();
  const text = messageInput.value; // text preserves the intial value of nothing on line 19//
  const message = { author: "user", text: text };
  updateConversation(message); // then messageInput.value is cleared when passed.

  fetch(`/parrot-message/?color=${text}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();

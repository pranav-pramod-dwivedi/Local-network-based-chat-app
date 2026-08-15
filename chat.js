const chat = document.getElementById('chatWindow');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typing = document.getElementById('typingIndicator');
const notif = document.getElementById('notifSound');
const user = localStorage.getItem('user') || 'Unknown';
const other = user === 'Naman' ? 'Pranav' : 'Naman';

document.getElementById('chatTitle').innerText = other;
document.getElementById('chatCaption').innerText = other === 'Pranav' ? 'frontend web dev type' : 'py developer type';
typing.innerText = other + ' is typing...';

const socket = io();

socket.on('chat history', (history) => {
  history.forEach((m) => addMessage({ ...m, status: 'Delivered' }));
});

socket.on('chat message', (m) => {
  addMessage({ ...m, status: 'Delivered' });
  if (m.from !== user) notif.play();
});

function render() {
  chat.innerHTML = '';
  messages.forEach((m) => addMessage(m, true));
  chat.scrollTop = chat.scrollHeight;
}

function bubble(m) {
  const div = document.createElement('div');
  div.className = 'message ' + (m.from === user ? 'me' : 'other');
  if (m.reply) {
    const replyDiv = document.createElement('div');
    replyDiv.className = 'reply-preview';
    replyDiv.innerText = 'Replied to: ' + m.reply;
    div.appendChild(replyDiv);
  }
  let inner = m.text;
  if (typeof m.text === 'object' && m.text) inner = m.text.msg || JSON.stringify(m.text);
  div.appendChild(document.createTextNode(inner));
  const time = document.createElement('div');
  time.className = 'timestamp';
  time.textContent = m.time || new Date().toLocaleTimeString().slice(0, 5);
  div.appendChild(time);
  if (m.from === user) {
    const s = document.createElement('div');
    s.className = 'delivered';
    s.textContent = m.status || 'Delivered';
    div.appendChild(s);
  }
  div.onclick = () => startReply(m.text);
  return div;
}

function addMessage(m, appendToDom) {
  messages.push(m);
  if (appendToDom === false) return;
  chat.appendChild(bubble(m));
  chat.scrollTop = chat.scrollHeight;
}

function startReply(text) {
  input.value = (typeof text === 'object' && text) ? '↪ ' + (text.msg || 'message') + ' ' : '↪ ' + text + ' ';
  input.focus();
}

function send() {
  let txt = input.value.trim();
  if (!txt) return;
  let reply = null;
  if (txt.startsWith('↪')) {
    const parts = txt.split(' ');
    reply = parts[1];
    txt = parts.slice(2).join(' ');
  }
  const msg = { user, text: txt, from: user, reply, time: new Date().toLocaleTimeString().slice(0, 5) };
  socket.emit('chat message', msg);
  input.value = '';
  typing.style.display = 'none';
}

input.addEventListener('input', () => {
  typing.style.display = 'block';
  clearTimeout(typing._t);
  typing._t = setTimeout(() => (typing.style.display = 'none'), 1000);
});

sendBtn.onclick = send;
document.getElementById('clearBtn').onclick = () => {
  messages = [];
  render();
};

let messages = [];
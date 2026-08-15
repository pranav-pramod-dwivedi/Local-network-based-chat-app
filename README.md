# Local-network-based-chat-app

A simple real-time chat that runs on your **local network** — no cloud, no sign-up,
no database. Two (or more) devices on the same Wi-Fi can talk to each other over
**Socket.IO** + **Express**.

## What it does

- Pick a name (**Naman** or **Pranav**) on the login screen.
- Chat in real time — messages broadcast to everyone connected to the server.
- Chat history is kept on the server (in `messages.json`) and sent to new joiners.
- Play notification sound when a new message arrives.

## How to run

Requires [Node.js](https://nodejs.org) installed.

```bash
npm install
npm start
```

The server prints its port (default **3000**).

### Chat between two devices on the same Wi-Fi

1. Start the server on one machine.
2. Find that machine's local IP:
   - **macOS/Linux:** `ifconfig | grep inet` or `ip addr`
   - **Windows:** `ipconfig`
   - (look for something like `192.168.x.x`)
3. On the second device (phone or laptop), open a browser and go to:

   ```
   http://<that-IP>:3000
   ```

   e.g. `http://192.168.1.50:3000`

4. Both devices log in with different names and chat.

> Your own machine can also just use `http://localhost:3000`.

### Different networks?

Socket.IO needs the phones/PCs to reach the server. For chat across the internet the
server must be deployed (e.g. to Render / Railway / a VPS) — then everyone opens that
deployed URL.

## Files

| File | Purpose |
|---|---|
| `server.js` | Express + Socket.IO server; serves the app and keeps chat history |
| `index.html` / `login.html` | Login screen (pick a name) |
| `home.html` | Home button that routes to the chat |
| `chat.html` / `chat.css` | Chat UI |
| `chat.js` | Socket.IO client — sends/receives messages, renders them, plays sound |
| `script.js` | Legacy socket client kept for reference (not used by `chat.html`) |
| `notif.mp3` / `style.css` | Notification sound and shared styles |

## Notes

- Chat history persists to `messages.json` in the repo folder between server restarts.
- Messages are **not encrypted** — fine for a trusted home network, not for public use.
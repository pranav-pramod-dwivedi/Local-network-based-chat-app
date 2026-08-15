<p align="center">
  <img src="assets/cover.svg" width="830" alt="Local Network Chat cover" />
</p>

<h1 align="center">Local Network Chat</h1>

<p align="center">
  A chat for people on the same Wi-Fi. No cloud, no sign-up.<br/>
  For all your "did you see my text" messages to someone three rooms away.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/stack-Node%20%2B%20Express%20%2B%20Socket.io-5468FF" alt="stack" />
  <img src="https://img.shields.io/badge/network-local%20LAN-brightgreen" alt="network" />
</p>

You type a message and it shows up on your friend's screen almost instantly, over your
own network. Pick a name, open a browser, done writing. Built on a Sunday when getting
up felt like a lot of walking.

## What it does

- Pick a name (Naman, Pranav, whatever you feel like).
- Every message shows up for everyone connected. No refreshes.
- History is kept on the server in `messages.json` and sent to people who join late.
- A little sound plays when a message lands, so nobody has to stare at the screen.

## Run it

```bash
npm install
npm start     # → http://localhost:3000
```

### Same Wi-Fi, two devices

1. Start the server on one machine.
2. Find its local IP: `ifconfig | grep inet` on macOS/Linux, `ipconfig` on Windows.
3. Open `http://<that-IP>:3000` on the other device, e.g. `http://192.168.1.50:3000`.

### Friends in another city

Then it needs real hosting (Render, Railway, a VPS) and you share that URL instead.
That's a "next weekend" problem.

## Files

| File | Job |
|---|---|
| `server.js` | the server, holds messages and broadcasts them |
| `index.html` / `login.html` | pick a name |
| `home.html` | one button to the chat |
| `chat.html` / `chat.js` / `chat.css` | the actual chat |
| `script.js` | an old client, kept around |
| `notif.mp3` | the new-message ping |

## Notes

Not encrypted. Fine for a trusted house, a terrible idea for your passwords. Don't do that.

<p align="center">built so nobody has to shout "did you see my text" across the house</p>
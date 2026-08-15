<p align="center">
  <img src="assets/cover.svg" width="830" alt="Local Network Chat cover" />
</p>

<h1 align="center">Local Network Chat</h1>

<p align="center">
  A chat that needs no server. No cloud, no sign-up, no backend to babysit.<br/>
  Built for "did you see my text" messages to someone two rooms away.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/stack-HTML%20%2B%20JS%20%2B%20PeerJS-5468FF" alt="stack" />
  <img src="https://img.shields.io/badge/host-GitHub%20Pages-24292e" alt="host" />
</p>

## Try it live

https://pranav-pramod-dwivedi.github.io/Local-network-based-chat-app/

Open it as host, share the invite link, and the other person joins as fast as their
Wi-Fi allows. Anyone can send a message; everyone connected sees it instantly.

## Why no server

The messages go **peer to peer**, straight between browsers, using PeerJS. There's no
server to deploy, no database, nothing in the cloud. One of you plays host and acts as
the middle-man for the room; everyone else just connects to that invite link. This is
why it can sit on GitHub Pages for free, same as a totally static site.

## How it works

1. Pick a name.
2. **Create room** — you get a 5-letter code and an invite link with the code already in it.
3. Send the link to your friend.
4. Friend opens it, picks a name, and you're chatting. Latecomers get the recent history.

## Run it locally (same three steps)

```bash
python3 -m http.server 8000   # from this folder → http://localhost:8000
```

Everyone on the same Wi-Fi opens `http://<your-LAN-IP>:8000`. One creates a room, the
rest join. No npm, no install, no "works on my machine".

## Notes

- Works across the internet too, not just one network, as long as both sides can reach
  PeerJS's free public broker. If that broker is down, rooms are down until it's back.
- Not encrypted. Fine for a friendly chat, a bad idea for passwords. Don't do that.
- Invite links auto-point to wherever the page is hosted, so copying them just works.

<p align="center">built so nobody has to shout "did you see my text" across the house</p>
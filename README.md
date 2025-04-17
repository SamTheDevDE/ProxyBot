# 🧠 DID Proxy Bot (a.k.a. "Why Did I Do This?")

A sarcastically self-hosted proxy bot for DID/OSDD systems on Discord.

Because Tupperbox is centralized, PluralKit is sometimes down, and we hate convenience. So here it is: a **JavaScript disaster** built from the ground up to give you full control... or full headaches.

---

## ❗ WARNING

> **This was hell to make. Do not use it.**  
> – The Developer (currently crying in `/certs/`)

---

## 📦 What is This?

This is a *self-hosted, slash-command-based proxy bot* made for people with Dissociative Identity Disorder (DID), Other Specified Dissociative Disorder (OSDD), or other plural experiences — built to allow alters to speak through a central bot identity with their own style, flair, and regrets.

Yes, you need a domain.  
Yes, you need an SSL cert.  
Yes, you must forward ports.  
No, I don't offer tech support.

---

## 💀 Requirements

- 🧠 **Basic hosting knowledge** (or high tolerance for suffering)
- 🌐 A **domain name** (because localhost won’t cut it)
- 🔐 An **SSL certificate** (Discord is picky and *will* ghost you without it)
- 🤖 A **Discord bot token** with application.commands + interactions enabled
- ⌨️ Node.js (v18+ ideally) and npm installed
- 🚪 An open and forwarded port (default is 3000)

---

## 🔧 Setup (a.k.a. Ritual Summoning)

1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file like so:
   ```env
   APP_ID="YOUR_BOT_APP_ID"
   DISCORD_TOKEN="YOUR_DISCORD_BOT_TOKEN"
   PUBLIC_KEY="YOUR_DISCORD_PUBLIC_KEY"
   PORT="3000"
   isHTTPS="true"
   ```

4. Place your SSL certs in the `/certs/` folder:
   ```
   certs/
   ├── certificate.crt
   └── private.key
   ```

5. Register slash commands globally (feel the power):
   ```bash
   node register-commands.js
   ```

6. Run the bot:
   ```bash
   node index.js
   ```

7. Stare into the void as it logs:
   ```
   HTTPS Server running on: https://localhost:3000
   ```

---

## 🧠 Features (or: What I Got Working Before Losing My Sanity)

- 🔊 **`/say` Command** – Echoes your message through the bot like a good little parrot. Supports `\n` for line breaks, because Discord markdown hates happiness.

- 💬 **`/reply` Command + Modal Madness** – Pops up a sexy Discord modal so alters can submit their thoughts in style. Why? Because regular input is boring.

- 🔐 **Discord Interaction Verification** – Uses real crypto voodoo to prove you're not a script kiddie.

- 🌐 **HTTPS Only (kinda)** – Because Discord demands encryption like it’s the NSA.

- 🧾 **API endpoint at `/`** – Says “Hello World!” because I forgot to delete it. Deal with it.

- ⚰️ **Self-hosted Chaos** – All control, all suffering, no third-party spoon-feeding.

---

## 💬 Slash Commands

| Command | Type   | Description                            |
|---------|--------|----------------------------------------|
| `/say`  | Slash  | Sends a custom message through the bot |
| `reply` | Modal  | Opens a Discord modal for input        |

---

## 🧠 Why Self-Host?

Because you like:

- 🔧 Customization
- 🧠 Full control over proxying
- 😤 Not relying on centralized services
- 😈 Pain, apparently

---

## ❓ FAQ

**Q: Why does Discord hate me?**  
A: You didn't use HTTPS. Or your cert is borked. Or it's just Tuesday.

**Q: Why isn't the bot responding?**  
A: Probably something with the interaction verification. Or the stars aren’t aligned.

**Q: Can I add features?**  
A: Yes, if you're brave and know JavaScript. Fork it and suffer gloriously.

**Q: Will you help me?**  
A: No. I’m busy crying over SSL errors.

---

## 💀 Disclaimer

This bot is provided *as-is*, with zero warranties, infinite sarcasm, and no promise of sanity. Use it, break it, improve it — but don’t DM me when you misplace a semicolon.

---

## 🧘 Final Thoughts

If you actually get this working... congratulations. You’re a wizard. Or just extremely stubborn.

---

> “Built for plurals. Maintained by chaos.”

yes i've used chatgpt but only because im to lazy to write a sarcastic readme. sry not sry :3

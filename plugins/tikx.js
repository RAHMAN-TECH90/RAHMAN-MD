const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

module.exports = {
  command: ["tikx", "tx"],
  description: "Download TikTok video (No Watermark) with Buttons",
  async handler(m, { sock, args }) {
    try {
      const url = args[0];
      if (!url) {
        return sock.sendMessage(m.key.remoteJid, { text: "⚠️ TikTok link do!" });
      }

      // API call
      let api = `https://apis.nexoracle.com/downloader/tiktok?apikey=58b3609c238b2b6bb6&url=${encodeURIComponent(url)}`;
      let res = await fetch(api);
      let data = await res.json();

      if (!data || !data.result || !data.result.nowm) {
        return sock.sendMessage(m.key.remoteJid, { text: "❌ Download failed!" });
      }

      // Info
      let videoUrl = data.result.nowm;
      let audioUrl = data.result.music || null;
      let title = data.result.title || "No Title";
      let author = data.result.author || "Unknown Author";
      let likes = data.result.likes || "0";
      let views = data.result.views || "0";
      let shares = data.result.shares || "0";

      let filePath = path.join(__dirname, "tiktok_nowm.mp4");

      // Download video
      let vid = await fetch(videoUrl);
      let buffer = await vid.buffer();
      fs.writeFileSync(filePath, buffer);

      // Stylish Caption
      let caption = `*_ʀᴀʜᴍᴀɴ-ᴍᴅ ᴛɪᴋᴛᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_* 🎶
*‎╭─────────────────━⊷*
*‎│▸*👤 *ᴀᴜᴛʜᴏʀ:* ${author.nickname} (@${author.username})
*‎│▸ℹ️ ᴛɪᴛʟᴇ:* ${title}
*‎│▸*👍 *ʟɪᴋᴇs:* ${like}
*‎│▸*💬 *ᴄᴏᴍᴍᴇɴᴛs:* ${comment}
*‎│▸*🔁 *sʜᴀʀᴇs:* ${share}
*‎‎╰─•*◈ *_ᴾᵒʷᵉʳᵉᵈ ᵇʸ ᴿᵃʰᵐᵃⁿ ᵀᵉᶜʰ_* ◈━⊷`;

      // Send video with 3 buttons
      await sock.sendMessage(m.key.remoteJid, {
        video: fs.readFileSync(filePath),
        caption,
        buttons: [
          { buttonId: `.ttvideo ${url}`, buttonText: { displayText: "📥 Download Video" }, type: 1 },
          { buttonId: `.ttaudio ${url}`, buttonText: { displayText: "🎵 Download Audio" }, type: 1 },
          { buttonId: url, buttonText: { displayText: "🔗 Open TikTok Link" }, type: 1 }
        ],
        headerType: 4
      });

      fs.unlinkSync(filePath);

    } catch (e) {
      console.error(e);
      sock.sendMessage(m.key.remoteJid, { text: "❌ Error: " + e.message });
    }
  }
};
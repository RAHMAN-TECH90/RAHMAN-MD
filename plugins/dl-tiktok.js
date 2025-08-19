const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "tiktok",
  alias: ["ttdl", "tiktokdl","tt"],
  react: '⏰',
  desc: "Download TikTok videos.",
  category: "download",
  use: ".tiktok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    // Check if the user provided a TikTok video URL
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('Please provide a valid TikTok video URL. Example: `.tiktok https://tiktok.com/...`');
    }

    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = `https://apis.davidcyriltech.my.id/download/tiktok?url=${encodeURIComponent(tiktokUrl)}`;

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    // Extract the video details
    const { title, thumbnail, author, metrics, url } = response.data.result;

    // Inform the user that the video is being downloaded
   // await reply(`📥 *Downloading TikTok video by @${author.username}... Please wait.*`);

    // Download the video
    const videoResponse = await axios.get(url, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      return reply('❌ Failed to download the video. Please try again later.');
    }

    // Prepare the video buffer
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    // Send the video with details
    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: `*_ʀᴀʜᴍᴀɴ-ᴍᴅ ᴛɪᴋᴛᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_* 🎶
*‎╭─────────────────━⊷*
*‎│▸*👤 *ᴀᴜᴛʜᴏʀ:* ${author.nickname} (@${author.username})
*‎│▸*ℹ️ *ᴛɪᴛʟᴇ:* ${title}
*‎│▸*👍 *ʟɪᴋᴇs:* ${like}
*‎│▸*💬 *ᴄᴏᴍᴍᴇɴᴛs:* ${comment}
*‎│▸*🔁 *sʜᴀʀᴇs:* ${share}
*‎‎╰─•*◈ *_ᴾᵒʷᵉʳᵉᵈ ᵇʸ ᴿᵃʰᵐᵃⁿ ᵀᵉᶜʰ_* ◈━⊷`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363201214007503@newsletter',
          newsletterName: 'ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error downloading TikTok video:', error);
    reply('❌ Unable to download the video. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

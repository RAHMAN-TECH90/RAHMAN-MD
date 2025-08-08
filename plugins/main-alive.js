const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
‎*_Rᴀʜᴍᴀɴ-ᴍᴅ Rᴜɴɴɪɴɢ Sɪɴᴄᴇ_*
‎╭─────────────━┈⍟
‎┋📆 ${days} Day
‎┋🕰️ ${hours} Hour
‎┋⏳ ${minutes} Minute
‎┋⏲️ ${seconds} Second
‎╰─────────────━┈⍟
`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363201214007503@newsletter',
                    newsletterName: 'ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

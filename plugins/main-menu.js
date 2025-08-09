const config = require('../config');
const { cmd } = require('../command');
const path = require('path'); 
const os = require("os");
const fs = require('fs');
const { runtime } = require('../lib/functions');
const axios = require('axios');

// Default mode agar config me na ho
const mode = config.MODE || "public"; 

cmd({
    pattern: "menu",
    alias: ["allmenu", "fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `‎‎*╭─══════════════⊷❍*
‎*┋❁┋. ʙᴏᴛ ɴᴀᴍᴇ: ʀᴀʜᴍᴀɴ-ᴍᴅ*
‎*┋❁┋. ᴠᴇʀꜱɪᴏɴ: 4.0.0*
‎*┋❁┋. ᴏᴡɴᴇʀ : ʀᴀʜᴍᴀɴ ᴛᴇᴄʜ*      
‎*┋❁┋. ɴᴜᴍʙᴇʀ: 923015954782*
‎*┋❁┋. ᴘʟᴀᴛғᴏʀᴍ: ${os.platform()}*
‎*┋❁┋. ᴍᴏᴅᴇ: ${mode}*
‎*┋❁┋. ᴘʀᴇғɪx: [${config.PREFIX}]*
‎*┋❁╰───────────────*
‎*╰═════════════════⍟*

‎*╭─❍ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ══════⊷❍*
‎*┋❀┃. ᴛɪᴋᴛᴏᴋ*
‎*┋❀┃. ғᴀᴄᴇʙᴏᴏᴋ*
‎*┋❀┃. ᴀᴘᴋ*
‎*┋❀┃. ɪɴsᴛᴀ*
‎*┋❀┃. ᴛᴡɪᴛᴛᴇʀ*
‎*┋❀┃. ᴘʟᴀʏ*
‎*┋❀┃. ᴘʟᴀʏ2*
‎*┋❀┃. ᴘɪɴᴛᴇʀᴇsᴛ*
‎*┋❀┃. sᴘᴏᴛɪғʏ*
‎*┋❀┃. ᴀᴜᴅɪᴏ*
‎*┋❀┃. ᴠɪᴅᴇᴏ*
‎*┋❀┃. ᴠɪᴅᴇᴏ2*
‎*┋❀┃. ʏᴛᴍᴘ4*
‎*┋❀┃. ᴍᴇᴅɪᴀғɪʀᴇ*
‎*┋❀┃. ɢᴅʀɪᴠᴇ*
‎*┋❀┃. ᴛɪᴋs*
‎*┋❀┃. ssᴡᴇʙ*
‎*┋❀┃. ᴅᴀʀᴀᴍᴀ*
‎*┋❀╰────────────────*
‎*╰══════════════════⍟*

‎*╭─❍ 𝙻𝙾𝙶𝙾 𝙼𝙰𝙺𝙴𝚁 ══════⊷❍*
‎*┋❀┃. ᴅʀᴀɢᴏɴʙᴀʟʟ*
‎*┋❀┃. ʙʟᴀᴄᴋᴘɪɴᴋ*
‎*┋❀┃. ɴᴇᴏɴʟɪɢʜᴛ*
‎*┋❀┃. sᴀᴅɢɪʀʟ*
‎*┋❀┃. ɴᴀʀᴜᴛᴏ*
‎*┋❀┃. 3ᴅᴄᴏᴍɪᴄ*
‎*┋❀┃. 3ᴅᴘᴀᴘᴇʀ*
‎*┋❀┃. ғᴜᴛᴜʀɪsᴛɪᴄ*
‎*┋❀┃. ᴄʟᴏᴜᴅs*
‎*┋❀┃. ʟᴇᴀғ*
‎*┋❀┃. ᴇʀᴀsᴇʀ*
‎*┋❀┃. sᴜɴsᴇᴛ*
‎*┋❀┃. ɢᴀʟᴀxʏ*
‎*┋❀┃. sᴀɴs*
‎*┋❀┃. ʙᴏᴏᴍ*
‎*┋❀┃. ʜᴀᴄᴋᴇʀ*
‎*┋❀┃. ᴅᴇᴠɪʟᴡɪɴɢs*
‎*┋❀┃. ɴɪɢᴇʀɪᴀ*
‎*┋❀┃. ʙᴜʟʙ*
‎*┋❀┃. ᴀɴɢᴇʟᴡɪɴɢs*
‎*┋❀┃. ᴢᴏᴅɪᴀᴄ*
‎*┋❀┃. ʟᴜxᴜʀʏ*
‎*┋❀┃. ᴘᴀɪɴᴛ*
‎*┋❀┃. ғʀᴏᴢᴇɴ*
‎*┋❀┃. ᴄᴀsᴛʟᴇ*
‎*┋❀┃. ᴛᴀᴛᴏᴏ*
‎*┋❀┃. ᴠᴀʟᴏʀᴀɴᴛ*
‎*┋❀┃. ʙᴇᴀʀ*
‎*┋❀┃. ᴛʏᴘᴏɢʀᴀᴘʜʏ*
‎*┋❀┃. ʙɪʀᴛʜᴅᴀʏ*
‎*┋❀╰────────────────*
‎*╰══════════════════⍟*

‎*... (baaki tumhara poora menu yahan jaayega) ...*`;

        // Send menu image with caption
        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/t3p1at.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363201214007503@newsletter',
                        newsletterName: config.BOT_NAME || 'RAHMAN-MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send local audio menu if file exists
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: true,
            }, { quoted: mek });
        } else {
            console.warn("⚠ menu.m4a file not found!");
        }
        
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "alive",
    react: "🙋",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Sound file URLs
        const audioFiles = [
            'https://files.catbox.moe/triobt.mp3',
            'https://files.catbox.moe/6kvcfg.mp4'
        ];

        // Randomly pick an audio file
        const vn = audioFiles[Math.floor(Math.random() * audioFiles.length)];

        // Other variables
        const name = pushname || conn.getName(sender);
        const url = 'https://github.com/RAHMAN-TECH90/RAHMAN-MD';
        const murl = 'https://wa.me//923015954782';

        // Constructing the contact message
        const con = {
            key: {
                fromMe: false,
                participant: `${sender.split('@')[0]}@s.whatsapp.net`,
                ...(isGroup ? { remoteJid: '923015954782@s.whatsapp.net' } : {}),
            },
            message: {
                contactMessage: {
                    displayName: name,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                },
            },
        };
        // Audio file message with external ad reply info
        const doc = {
            audio: {
                url: vn,
            },
            mimetype: 'audio/mpeg',
            ptt: true,
            waveform: [100, 0, 100, 0, 100, 0, 100],
            fileName: 'shizo',
            contextInfo: {
                mentionedJid: [sender],
                externalAdReply: {
                    title: config.BOT_NAME || 'RAHMAN-MD',
                    body: config.DESCRIPTION || 'POWERED BY RAHMAN TECH',
                    thumbnailUrl: config.ALIVE_IMG || 'https://files.catbox.moe/84jssf.jpg',
                    sourceUrl: murl,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        };

        // Send the message
        await conn.sendMessage(from, doc, { quoted: con });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
                  

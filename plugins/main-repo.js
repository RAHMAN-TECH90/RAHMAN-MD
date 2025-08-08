const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/JawadYT36/KHAN-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `‎╭╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╮
‎*_ ʀᴀʜᴍᴀɴ-ᴍᴅ ᴡᴏʀʟᴅ ғᴀsᴛ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ_*
‎🗼 *ɴᴀᴍᴇ:* ${name}
‎⭐ *sᴛᴀʀs:* ${stargazers_count}
‎🧧 *ғᴏʀᴋs:* ${forks_count}
‎📅 *ᴄʀᴇᴀᴛᴇᴅ ᴀᴛ:* ${new Date(created_at).toLocaleDateString()}
‎🕐 *ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${new Date(updated_at).toLocaleDateString()}
‎👨‍💻 *ᴏᴡɴᴇʀ:* ${owner.login}
‎╰╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╯`;

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/t3p1at.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363201214007503@newsletter',
                    newsletterName: 'ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send local audio file
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363201214007503@newsletter',
                    newsletterName: 'ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});

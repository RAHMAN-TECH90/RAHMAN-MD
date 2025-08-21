
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "script",
    alias: ["repo", "sc", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "🎗️",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/bot/under-deployment';

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
        const formattedInfo = `*𝐇𝐄𝐋𝐋𝐎* 

> *sɪᴍᴘʟᴇ, ɪᴄʏ, ᴄᴏʟᴅ  & ʀɪᴄʜ ʟᴏᴀᴅᴇᴅ ʙᴏᴛ ᴡɪᴛʜ ᴀᴍᴀᴢɪɴɢ ғᴇᴀᴛᴜʀᴇs, ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ & ғᴏʀᴋ ᴛʜᴇ ʀᴇᴘᴏ🌟🍴*

*\`REPO LINK:\`📮*
> https://github.com/bot/under-deployment/

*\`BOT SUPPORT GC:\`🪀*
https://whatsapp.com/channel/0029VaEV2x85kg7Eid9iK43R

*\`BOT NAME:\`🤖*
> ${repoData.name}

*\`OWNER NAME:\`👨‍💻*
> RAHMAN TECH̽

*\`STARS:\`🌟*
> ${repoData.stargazers_count}

*\`FORKS:\`🍴*
> ${repoData.forks_count}

*\`DESCRIPTION:\`📑*
> ${repoData.description || 'No description'}\n
\n> *⎯꯭̽🐍*`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, { 
    image: { url: config.ALIVE_IMG || 'https://files.catbox.moe/84jssf.jpg' }, 
    caption: formattedInfo, 
    contextInfo: { 
        mentionedJid: [m.sender], 
        forwardingScore: 999, 
        isForwarded: true, 
        forwardedNewsletterMessageInfo: { 
            newsletterJid: '120363201214007503@newsletter', 
            newsletterName: 'ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ͛',
            serverMessageId: 143 
        } 
    } 
}, { quoted: mek });

} catch (e) { 
    console.log(e); 
    reply(`Error: ${e}`); 
} 
});

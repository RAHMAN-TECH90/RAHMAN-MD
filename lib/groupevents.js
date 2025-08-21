
//Give Me Credit If Using This File Give Me Credit On Your Channel ✅ 
// Credits JawadTechX - KHAN-MD 💜 

const { isJidGroup } = require('baileys');
const config = require('../config');

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363201214007503@newsletter',
            newsletterName: 'ʀᴀʜᴍᴀɴ-ᴍᴅ',
            serverMessageId: 143,
        },
    };
};

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc;
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*\n` +
`*│  ̇─̣─̇─̣〘 ωєℓ¢σмє 〙̣─̇─̣─̇*\n` +
`*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n` +
`*│❀ нєу* @${userName}\n` +
`*│❀ gʀσᴜᴘ* ${metadata.subject}\n` +
`*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n` +
`*│● ѕтαу ѕαfє αɴ∂ fσℓℓσω*\n` +
`*│● тнє gʀσυᴘѕ ʀᴜℓєѕ!*\n` +
`*│● ᴊσιɴє∂ ${groupMembersCount}*\n` +
`*│● ©ᴘσωєʀє∂ ву яαнмαη-м∂*\n` +
`*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*\n` +
`${desc}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.GOODBYE === "true") {
                const GoodbyeText = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*\n` +
`*│  ̇─̣─̇─̣〘 gσσ∂вує 〙̣─̇─̣─̇*\n` +
`*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n` +
`*│❀ ᴜѕєʀ* @${userName}\n` +
`*│● мємвєʀѕ ιѕ ℓєfт тнє gʀσᴜᴘ*\n` +
`*│● мємвєʀs ${groupMembersCount}*\n` +
`*│● ©ᴘσωєʀє∂ ву яαнмαη-м∂*\n` +
`*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_STATUS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡────* \n` +
`*├▢ @${demoter} нαѕ ∂ємσтє∂*\n` +
`*├▢ @${userName} fʀσм α∂мιɴ*\n` +
`*├▢ тιмє : ${timestamp}*\n` +
`*├▢ gʀσᴜᴘ :* ${metadata.subject}\n` +
`*╰────────────────────*`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_STATUS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡────* \n` +
`*├▢ @${promoter} нαѕ ᴘʀσмσтє∂*\n` +
`*├▢ @${userName} тσ α∂мιɴ*\n` +
`*├▢ тιмє : ${timestamp}*\n` +
`*├▢ gʀσᴜᴘ : ${metadata.subject}*\n` +
`*╰────────────────────*`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
  

/* 
   Created by RAHMAN TECH 🕵
   Contact Dev: +923015954782 ♻️
   © Copy coder alert ⚠
*/

const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu2",
    react: "🤖",
    desc: "Get full command list",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Initialize menu categories safely
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: ''
        };

        // Add commands to respective categories
        for (let i = 0; i < commands.length; i++) {
            let cmdInfo = commands[i];
            if (cmdInfo.pattern && !cmdInfo.dontAddCommandList && menu.hasOwnProperty(cmdInfo.category)) {
                menu[cmdInfo.category] += `*┋* ${cmdInfo.pattern}\n`;
            }
        }

        // Generate formatted menu
        let madeMenu = `
*╭─────────────────❒*
*⇆ ʜɪ ᴍʏ ᴅᴇᴀʀ ғʀɪᴇɴᴅ ⇆*
     *${pushname || 'User'}*
*┕─────────────────❒*

┏━━━━━━━━━━━━━━━━━━━
  *_ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
┗━━━━━━━━━━━━━━━━━━━

*╭───────────────❒*
*│* *❂ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
${menu.download || '*No commands found!*'}

*╭───────────────❒*
*│* *❂ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
${menu.main || '*No commands found!*'}

*╭───────────────❒*
*│* *❂ɢʀᴏᴜᴘ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
${menu.group || '*No commands found!*'}

*╭───────────────❒*
*│* *❂ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
${menu.owner || '*No commands found!*'}

*╭───────────────❒*
*│* *❂ᴄᴏɴᴠᴇʀᴛ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
${menu.convert || '*No commands found!*'}

*╭───────────────❒*
*│* *❂sᴇᴀʀᴄʜ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
${menu.search || '*No commands found!*'}

*╭────◉◉◉──────────៚*
   *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
*╰────◉◉◉──────────៚*
╰━❁ ═══ ❃•⇆•❃ ═══ ❁━╯
`;

        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: madeMenu
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

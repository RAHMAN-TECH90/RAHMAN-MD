const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "lockgc",
    alias: ["lock"],
    react: "🔒",
    desc: "Lock the group (Prevents new members from joining).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to lock the group.");

        await conn.groupSettingUpdate(from, "locked");
        reply("*_ɢʀᴏᴜᴘ ʜᴀs ʙᴇᴇɴ ʟᴏᴄᴋᴇᴅ. ɴᴇᴡ ᴍᴇᴍʙᴇʀs ᴄᴀɴɴᴏᴛ ᴊᴏɪɴ._*");
    } catch (e) {
        console.error("Error locking group:", e);
        reply("❌ Failed to lock the group. Please try again.");
    }
});
    

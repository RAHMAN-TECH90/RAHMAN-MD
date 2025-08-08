const { cmd } = require('../command');
const { getAnti, setAnti } = require('../data/antidel');

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'del'],
    desc: "Toggle anti-delete feature",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {
    if (!isCreator) return reply('This command is only for the bot owner');
    
    try {
        const currentStatus = await getAnti();
        
        if (!text || text.toLowerCase() === 'status') {
            return reply(`*AntiDelete Status:* ${currentStatus ? '✅ ON' : '❌ OFF'}\n\nUsage:\n• .antidelete on - Enable\n• .antidelete off - Disable`);
        }
        
        const action = text.toLowerCase().trim();
        
        if (action === 'on') {
            await setAnti(true);
            return reply('𝘈𝘯𝘵𝘪-𝘥𝘦𝘭𝘦𝘵𝘦 𝘩𝘢𝘴 𝘣𝘦𝘦𝘯 𝘦𝘯𝘢𝘣𝘭𝘦𝘥 ✅');
        } 
        else if (action === 'off') {
            await setAnti(false);
            return reply('𝘈𝘯𝘵𝘪-𝘥𝘦𝘭𝘦𝘵𝘦 𝘩𝘢𝘴 𝘣𝘦𝘦𝘯 𝘥𝘪𝘴𝘢𝘣𝘭𝘦𝘥 ❌');
        } 
        else {
            return reply('Invalid command. Usage:\n• .antidelete on\n• .antidelete off\n• .antidelete status');
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("An error occurred while processing your request.");
    }
});

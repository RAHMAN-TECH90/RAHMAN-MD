const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const axios = require('axios');

cmd({ 
    pattern: "sgx", 
    alias: ["ytdl3", "song1"], 
    react: "🎶", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("*❌ Please provide a YouTube URL or song name!*");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://jawad-tech.vercel.app/download/yt?url=${encodeURIComponent(yts.url)}`;
        
        const { data } = await axios.get(apiUrl);
        
        if (!data || !data.result || !data.result.audio) {
            return reply("❌ Failed to fetch audio. Please try again later.");
        }
        
        let ytmsg = `🎵 *Now Playing:* ${yts.title}\n📺 *Channel:* ${yts.author}\n⏱ *Duration:* ${yts.duration}`;
        
        // Send thumbnail with caption
        await conn.sendMessage(from, { 
            image: { url: yts.thumbnail }, 
            caption: ytmsg,  
        }, { quoted: mek });

        // Send the audio file
        await conn.sendMessage(from, { 
            audio: { url: data.result.audio }, 
            mimetype: "audio/mpeg", 
            fileName: `${yts.title}.mp3`, 
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply("⚠️ Error fetching song. Please try again later.");
    }
});
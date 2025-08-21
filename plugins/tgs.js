const axios = require('axios');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const config = require('../config');
const { cmd, commands } = require('../command');


cmd({
  pattern: 'tgs',
  alias: ['tgsticker', 'telegramsticker'],
  react: '🎴',
  desc: 'Download and convert Telegram sticker packs to WhatsApp stickers',
  category: 'Mods',
  filename: __filename
}, async (conn, mek, m, { from, reply, args, sender, isAdmin }) => {
  try {
  /*  // Check if the user is a mod or admin
    if (!isAdmin) {
      reply('Only Mods can use this command.');
      return;
    }
    */

    // Check if a Telegram sticker link is provided
    if (!args[0]) {
      reply('*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛᴇʟᴇɢʀᴀᴍ sᴛɪᴄᴋᴇʀ ᴘᴀᴄᴋ ʟɪɴᴋ.*\n\n *ᴇxᴀᴍᴘʟᴇ* `.tgs` https://t.me/addstickers/telegramali ');
      return;
    }

    const lien = args.join(' ');
    const name = lien.split('/addstickers/')[1];

    if (!name) {
      reply('Invalid Telegram sticker link.');
      return;
    }

    const api = `https://api.telegram.org/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/getStickerSet?name=${encodeURIComponent(name)}`;

    // Fetch sticker pack details
    const stickers = await axios.get(api);

    let type = stickers.data.result.is_animated ? 'animated sticker' : 'not animated sticker';

    let message = `*ʀᴀʜᴍᴀɴ-ᴍᴅ ᴛᴇʟᴇɢʀᴀᴍ sᴛɪᴄᴋᴇʀs🧩*\n\n` +
                  `*Producer:* ${stickers.data.result.name}\n` +
                  `*Type:* ${type}\n` +
                  `*Length:* ${stickers.data.result.stickers.length}\n\n` +
                  `> *ʀᴀʜᴍᴀɴ-ᴍᴅ sᴛɪᴄᴋᴇʀs sᴇɴᴅɪɴɢ*`;

   // await reply(message);
await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/kgL73wq8/mrfrankofc.jpg` },
                caption: message,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363201214007503@newsletter',
                        newsletterName: '『ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ』',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
    

    // Loop through each sticker in the pack
    for (let i = 0; i < stickers.data.result.stickers.length; i++) {
      const file = await axios.get(`https://api.telegram.org/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/getFile?file_id=${stickers.data.result.stickers[i].file_id}`);

      const buffer = await axios({
        method: 'get',
        url: `https://api.telegram.org/file/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/${file.data.result.file_path}`,
        responseType: 'arraybuffer',
      });

      // Create a WhatsApp sticker
      const sticker = new Sticker(buffer.data, {
        pack: 'ʀᴀʜᴍᴀɴ-ᴍᴅ',
        author: '🐝',
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer();

      // Send the sticker
      await conn.sendMessage(
        from,
        { sticker: stickerBuffer },
        { quoted: mek }
      );

      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    reply('_*Sticker Pack Download Complete!*_');

  } catch (error) {
    console.error('Error processing Telegram sticker pack:', error);
    reply('An error occurred while processing the sticker pack. Please try again.');
  }
});

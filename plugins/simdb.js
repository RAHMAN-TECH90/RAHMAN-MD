const fetch = require("node-fetch");

module.exports = {
  command: ["simdb", "siminfo", "database"],
  description: "Rahman SIM Database Lookup",
  async handler(m, { sock, args }) {
    try {
      const number = args[0];
      if (!number) {
        return sock.sendMessage(m.key.remoteJid, { text: "⚠️ Example: .simdb 03015954782" });
      }

      // API endpoint
      const apiUrl = `https://fam-official.serv00.net/sim/api.php?num=${encodeURIComponent(number)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.data) && data.data.length > 0) {
        const user = data.data[0];

        const msg = `
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
   『 𝑹𝑨𝑯𝑴𝑨𝑵 ⌬ 𝑫𝑨𝑻𝑨𝑩𝑨𝑺𝑬 』
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📱 𝗠𝗢𝗕𝗜𝗟𝗘   »  ${user.Mobile || "✘ NOT FOUND"}
👤 𝗡𝗔𝗠𝗘     »  ${user.Name || "✘ NOT FOUND"}
🆔 𝗖𝗡𝗜𝗖     »  ${user.CNIC || "✘ NOT FOUND"}
🏠 𝗔𝗗𝗗𝗥𝗘𝗦𝗦  »  ${user.Address || "✘ NOT FOUND"}
📡 𝗢𝗣𝗘𝗥𝗔𝗧𝗢𝗥 »  ${user.Operator || "✘ NOT FOUND"}

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
🔗 Powered By: 『 𝑹𝒂𝒉𝒎𝒂𝒏 𝑻𝒆𝒄𝒉 』
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ `;

        await sock.sendMessage(m.key.remoteJid, { text: msg });
      } else {
        await sock.sendMessage(m.key.remoteJid, { text: "❌ 𝙀𝙍𝙍𝙊𝙍 404: 𝘿𝘼𝙏𝘼 𝙉𝙊𝙏 𝙁𝙊𝙐𝙉𝘿" });
      }
    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "⚠️ 𝙎𝙔𝙎𝙏𝙀𝙈 𝙀𝙍𝙍𝙊𝙍: 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉 𝙁𝘼𝙄𝙇𝙀𝘿" });
    }
  }
};
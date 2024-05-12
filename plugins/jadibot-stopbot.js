
let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
   await conn.reply(m.chat, 'Kenapa tidak langsung ke terminal?', m);
  } else {
    await conn.reply(m.chat, `✅ Bot terputus`, m);
    conn.ws.close();
  }
};
handler.help = ['stop']
handler.tags = ['jadibot']
handler.command = ['stop', 'stopbot', 'stopbebot']
handler.owner = true

export default handler

import fs from "fs"
let handler = async (m, { conn, usedPrefix }) => {
    
    let session = m.sender.split('@')[0]
    if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, `Perintah ini hanya untuk *Sub Bot Aktif*`, m)
    else {
    await conn.reply(m.chat, `✅ Kode baru telah dikirim ke pesan pribadi Anda`, m)
    global.conn.reply(conn.user.jid, `${usedPrefix}botclone ${Buffer.from(fs.readFileSync("./yuzu/" + session + "/creds.json"), "utf-8").toString("base64")}`, m)
    m.react(done)
    }
}
handler.help = ['getcode']
handler.tags = ['jadibot']
handler.command = ['getcode']

export default handler
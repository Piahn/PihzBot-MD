let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `*MESSAGE:* ${pesan}`
let teks = `*⺀INFO DARI ADMIN⺀*\n\n${oi}\n\n*All MEMBER*\n`
for (let mem of participants) {
teks += `@${mem.id.split('@')[0]}\n`}
teks += ``
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}
handler.help = ['tagall']
handler.tags = ['group']
handler.command = /^(tagall|alltag)$/i
handler.admin = true
handler.group = true
export default handler

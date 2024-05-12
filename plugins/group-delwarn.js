
let handler = async (m, { conn, args, groupMetadata}) => {
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `tag/reply user nya kak`
        if (!(who in global.db.data.users)) throw `dia belum daftar & tidak ada di database yuzu`
       let warn = global.db.data.users[who].warn
       if (warn > 0) {
         global.db.data.users[who].warn -= 1
         m.reply(`⚠️ *Unwarn*
         
Peringatan: *-1*
Peringatan total: *${warn - 1}*`)
         m.reply(`Admin/owner mengurangi peringatan Anda, sekarang Anda memiliki *${warn - 1}*`, who)
         } else if (warn == 0) {
            m.reply(`Pengguna tidak memiliki peringatan`)
        }

}
handler.help = ['delwarn @user']
handler.tags = ['group']
handler.command = ['delwarn', 'unwarn'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

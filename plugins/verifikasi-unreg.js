import db from '../lib/database.js'

import { createHash } from 'crypto'
let handler = async function (m, { conn, args, usedPrefix}) {
  if (!args[0]) throw `*Masukkan nomor seri*\nVerifikasi nomor seri Anda dengan perintah...\n\n*${usedPrefix}ceksn*`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '⚠️ *Nomor seri salah*'
  user.registered = false
  m.reply(`✅ Success`)
}
handler.help = ['unregister <Nomor Seri>'] 
handler.tags = ['verifikasi']

handler.command = ['unregister', 'unreg'] 
handler.register = true

export default handler


let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
      
      case 'detect':
        if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
          throw false
        }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
     break
    
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break

    case 'document':
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
    chat.useDocument = isEnable
    break
    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'antilink':
    case 'antilinkwa':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
      
      
      case 'captcha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.captcha = isEnable
      break
     
    case 'autolevelup':
    isUser = true
     user.autolevelup = isEnable
     break
     
     case 'chatbot':
     case 'autosimi':
     isUser = true
      user.chatbot = isEnable
     break
     
    case 'restrict':
    isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
    
    case 'onlypv':
    case 'onlydm':
    case 'solopv':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      //global.opts['solopv'] = isEnable
      bot.solopv = isEnable
      break
      
    case 'gponly':
    case 'onlygp':
    case 'grouponly':
    case 'sologp':
    isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      //global.opts['sologp'] = isEnable
      bot.sologp = isEnable
      break
      
    default:
      //if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, listMessage, { quoted: m })
      if (!/[01]/.test(command)) return m.reply(`
captcha
welcome
antilink
detect 
document
autolevelup
chatbot 
public
solopv
sologp
`)
      throw false
}

m.reply(`
*Type:*  ${type}  
*Status:* Succes ✅ 
*Options:* ${isEnable ? 'Diaktifkan' : 'Dinonaktifkan'} ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk obrolan ini'}
`.trim()) 

}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler

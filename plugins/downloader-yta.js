
import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `Contoh :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ Link yt nya mana kak ?`
   m.react(rwait)
 let chat = global.db.data.chats[m.chat]
 let q = '128kbps'
 
 try {
		const yt = await fg.yta(args[0])
		let { title, dl_url, quality, size, sizeB } = yt
		
		conn.sendFile(m.chat, dl_url, title + '.mp3', `YT MP3
		
*Judul* : ${title}
*Size* : ${size}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done)
 	} catch {
  try {
		let yt = await fg.ytmp3(args[0])
        let { title, size, sizeB, dl_url } = yt
		conn.sendFile(m.chat, dl_url, title + '.mp3', `YT MP3 2
  
*Judul* : ${title}
*Size* : ${size}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done)
        } catch {
			await m.reply(`❎ Error`)
} 
}

}
handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'fgmp3'] 

export default handler

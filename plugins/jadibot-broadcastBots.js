
let handler = async (m, { conn, usedPrefix, text }) => {
    if (conn.user.jid !== global.conn.user.jid) throw false
    let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
    let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
    let teks = text ? text : cc.text
    conn.reply(m.chat, `✅ broadcast terkirim \n\n*total :* *${users.length}* sub bots\n\n${users.map((v, i) => `*${i + 1}.* wa.me/${v.replace(/[^0-9]/g, '')}?text=${usedPrefix}help`).join('\n')}`.trim(), m)
    
    let content = conn.cMod(m.chat, cc, /txbot|broadcast/i.test(teks) ? teks : `BROADCAST ┃ SUB BOTS\n_____________________\n\n${teks}`)
    for (let id of users) {
      await delay(1500)
      await conn.copyNForward(id, content, true)
    }
   m.reply('✅ Berhasil broadcast ke semua Sub-Bot')
    
} 
handler.help = ['txbot']
handler.tags = ['jadibot']
handler.command = ['txbot', 'bcbot'] 
handler.rowner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))

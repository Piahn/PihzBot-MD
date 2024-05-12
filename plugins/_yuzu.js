import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  
m.reply(`*INFO SCRIPT*\n\n> Creator : ryuuotsuka, niaa, fg98\n> Base sena bot\n> full recode by ryuu otsuka\n\n> No enc ? silahkan hubungi ryuu\n> IG : @ryuuwxyz | TELE : @UserUnavailable122`.trim())
    
}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['sc', 'script'] 

export default handler
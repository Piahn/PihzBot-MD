// sc ini free mau no enc ? buy
// knp harus buy ? anggap aja donasi ke creator
// bilang aja pelit :v yaudah jangan nanya no enc kan ada yang free

// tertarik buy : ig @ryuuwxyz
// tele : @UserUnavailable122

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url' 
import fs from 'fs'

global.owner = [
  ['62xxxxxx', 'RYUU', true],
  ['62xxxxxx']
] // owner nya |  // kurang ? tambahin sendiri.

global.mods = [''] 
global.prems = ['62xxxx', '573143917092'] // premium permanen

// api key
global.APIs = { 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = {
  'https://api.fgmods.xyz': 'api lu' // di isi biar work smua
}

// sticker wm
global.packname = 'Yuzu md by' 
global.author = '@ryuuwxyz' 

// info bot
global.botName = 'yuzu md'
global.ownName = 'ryuu otsuka'

// info social media
global.ig = 'https://Instagram.com/'
global.git = 'https://github.com/'
global.tele = 'https://t.me/'
global.wa = 'https://wa.me/'
global.yt = 'https://youtube.com/' 

// fake group jangan di ubah
global.fake = 'https://chat.whatsapp.com/Ryuuuuuuuuuuuuuuuuuuuuuu'

// ubah jangan di hapus
global.wait = '⌛ > loading....'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '3' // max warn

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
import { JSDOM } from 'jsdom'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya?\nExample: *.soundcloud https://soundcloud.com/ndaa-212683099/dj-coba-kau-ingat-ingat-kembali-seharusnya-aku-jungle-dutch-terbaru-2021-full-bass-viral-tik?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing*`
  let res = await SoundCloud(text)
  let doc = {
    audio: {
      url: res.link
    },
mimetype: 'audio/mp4', fileName: `${res.title}`, contextInfo: { externalAdReply: { showAdAttribution: true,
mediaType:  2,
mediaUrl: text,
title: res.title,
body: '© ryuuotsuka',
sourceUrl: text,
thumbnail: await(await conn.getFile(res.img)).data
      }
    }
  }

  return conn.sendMessage(m.chat, doc, { quoted: m })
}
handler.help = ['soundcloud']
handler.tags = ['downloader']
handler.command = /^(soundcloud)$/i

export default handler

async function SoundCloud(url){ 
   return new Promise(async(resolve, reject) => { 
     try { 
       const getToken = await axios.get('https://soundcloudmp3.org/', { 
         headers: { 
           "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0", 
           "cookie": "XSRF-TOKEN=eyJpdiI6ImsrUTZJTVQxbWwwSGZHWkFVem16SkE9PSIsInZhbHVlIjoiMFA0RFk1ZFE0dzI4emJ0VWZFZGVSSGxwd3U2NkhzK2g5XC9xekFtNE1kajdGaVJvUHZMdUJ6SUR6XC9qQm55NUtaZGVlU0llSE5TRmtGM2xKOGRnYUJQZz09IiwibWFjIjoiY2YxNjQxOWRiNDNkODlmYzQ4M2Q0ZTdlNTUxNmQ0MDVhNTFkMGI0MTVlNzZlY2NlMDNhYTBkODg2MzE4YTk5YyJ9; laravel_session=eyJpdiI6Im8zbUk1UkRSOHpDanBXVzJpdmRNZXc9PSIsInZhbHVlIjoiWlNTRnVYZVwvb21PRjJhaU81UFRKRDRIb0dOUWRPSjAxcGV1MEhYV1NnbTA4M0FvT2lJQmQrb3JDRzh4Y3UxTkdlNFwvSlhLSnF4TmZUTHRUUVBPNGNTQT09IiwibWFjIjoiMDQwZTFlNDNkYzFlOWNhOTVlM2E3NDNlM2M5N2MyNTkyMTQ1ZTQwNGYwNGQ2ZDlhYTY0MTE4Nzc0M2UzMGEwMCJ9" 
         } 
       }) 
       const dom = new JSDOM(getToken.data).window.document 
       const a = dom.querySelector('#conversionForm').innerHTML 
       const token = /<input name="_token" type="hidden" value="(.*?)">/g.exec(a)[1] 
       const config = { 
         _token: token, 
         lang: "en", 
         url: url, 
         submit: '' 
       } 
  
       const { data, status } = await axios('https://soundcloudmp3.org/converter', { 
         method: 'POST', 
         data: new URLSearchParams(Object.entries(config)), 
         headers: { 
           "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0", 
           "cookie": "XSRF-TOKEN=eyJpdiI6ImsrUTZJTVQxbWwwSGZHWkFVem16SkE9PSIsInZhbHVlIjoiMFA0RFk1ZFE0dzI4emJ0VWZFZGVSSGxwd3U2NkhzK2g5XC9xekFtNE1kajdGaVJvUHZMdUJ6SUR6XC9qQm55NUtaZGVlU0llSE5TRmtGM2xKOGRnYUJQZz09IiwibWFjIjoiY2YxNjQxOWRiNDNkODlmYzQ4M2Q0ZTdlNTUxNmQ0MDVhNTFkMGI0MTVlNzZlY2NlMDNhYTBkODg2MzE4YTk5YyJ9; laravel_session=eyJpdiI6Im8zbUk1UkRSOHpDanBXVzJpdmRNZXc9PSIsInZhbHVlIjoiWlNTRnVYZVwvb21PRjJhaU81UFRKRDRIb0dOUWRPSjAxcGV1MEhYV1NnbTA4M0FvT2lJQmQrb3JDRzh4Y3UxTkdlNFwvSlhLSnF4TmZUTHRUUVBPNGNTQT09IiwibWFjIjoiMDQwZTFlNDNkYzFlOWNhOTVlM2E3NDNlM2M5N2MyNTkyMTQ1ZTQwNGYwNGQ2ZDlhYTY0MTE4Nzc0M2UzMGEwMCJ9" 
         } 
       }) 
       if (status === 200) { 
         const tot = [] 
         const $ = cheerio.load(data) 
         const link = $('#ready-group > a').attr('href') 
         if (typeof link === 'undefined') return resolve({ developer: '@xorizn', mess: 'no result found' }) 
         const img = $('#preview > div.info.clearfix > img').attr('src') 
         $('#preview > div.info.clearfix > p').each(function (i, u) { tot.push($(u).text().replace(':', ': ')) }) 
         const hasil = { 
           title: tot[0], 
           link: link ? link : 'err', 
           img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png', 
           cap: `${tot.join("\n")}` 
         } 
         resolve(hasil) 
       } else { 
         console.log('No result found') 
       } 
     } catch (error) { 
       console.error(error) 
     } 
   }) 
 }

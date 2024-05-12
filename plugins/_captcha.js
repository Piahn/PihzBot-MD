 
export async function before(m, { conn, isAdmin, isBotAdmin, isOwner }) {
    const chat = global.db.data.chats[m.chat];
    const userID = m.messageStubParameters[0];
    conn.captchaCodes = conn.captchaCodes || {};
    
    let delay = time => new Promise(res => setTimeout(res, time))

    if (chat.captcha && m.messageStubType === 27) {
        let code = Math.floor(1000 + Math.random() * 9000);
        let cap = `🤖 CAPTCHA

��

Halo! @${userID.split('@')[0]}
Mohon balas pesan ini dengan kode 4 digit yang terletak di bawah teks ini.
Anda memiliki waktu *1 menit* untuk menjawab atau Anda akan dihapus dari grup.

➪: *${code}*


🇺🇸
Hello! @${userID.split('@')[0]}
Please respond to this message with the captcha code.
*You have 1 minutes* to respond, or you will be removed from the group.

➪: *${code}*`;


        conn.captchaCodes[userID] = {
            chat: await conn.reply(m.chat, cap, null, { mentions: [userID] } ),
            id: userID,
            code,
            time: setTimeout(async () => {
                if (conn.captchaCodes[userID]) {
                    await conn.reply(m.chat, `⏰ Waktu habis! *@${userID.split('@')[0]}*\nAnda akan dihapus dari grup`, null, { mentions: [userID] });
                    
                    await delay(3000); // Espera 3 Detik
                    
                    conn.groupParticipantsUpdate(m.chat, [userID], 'remove');
                    delete conn.captchaCodes[userID];
                }
            }, 80000 ) //1 Menit
        }
    }
    //
}
 

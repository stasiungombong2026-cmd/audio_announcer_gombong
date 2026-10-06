# Stasiun Gombong — Voice Clone Narrator (Vercel)

Versi final ini memakai Voice Clone ElevenLabs untuk narator utama dan tidak menggunakan OmniVoice.

## Struktur
- `index.html` — aplikasi utama, termasuk MP3 referensi yang tertanam.
- `api/clone.js` — membuat Instant Voice Clone.
- `api/tts.js` — menghasilkan audio pengumuman dari voice clone.
- `api/health.js` — endpoint pemeriksaan deployment.
- `vercel.json` — konfigurasi fungsi Vercel.
- `package.json` — memakai Node.js 24.x.

## Deploy
1. Upload **isi folder ini** ke root repository GitHub, sehingga `api` berada langsung di bawah root repository.
2. Pastikan Vercel Project → Settings → General/Build & Deployment menggunakan root repository tersebut, bukan subfolder lain.
3. Environment Variables → Production: `ELEVENLABS_API_KEY`.
4. Redeploy setelah file dan variable tersedia.
5. Tes `https://DOMAIN-VERCEL/api/health`. Harus muncul JSON `ok:true`.
6. Tes `https://DOMAIN-VERCEL/api/clone` dengan browser. GET sengaja mengembalikan JSON `method: POST required`; ini membuktikan fungsi sudah ter-deploy dan bukan 404.
7. Buka aplikasi dan tekan `Aktifkan Klon Suara`.

## Catatan
MP3 referensi yang tersedia sekitar 11,5 detik. Untuk kemiripan suara yang lebih baik, gunakan rekaman bersih yang lebih panjang dari pembicara yang sama.

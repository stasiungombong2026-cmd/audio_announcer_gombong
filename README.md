# Stasiun Gombong — Voice Clone Narrator

Versi ini mempertahankan aplikasi HTML Gombong dan menambahkan **Voice Clone** sebagai narator utama. MP3 referensi yang sudah tertanam di HTML dipakai sebagai sumber voice cloning. OmniVoice tidak digunakan.

## Deploy ke Vercel

1. Upload isi folder ini ke repository GitHub.
2. Import repository tersebut ke Vercel.
3. Di Vercel buka **Settings → Environment Variables**.
4. Tambahkan:
   - Name: `ELEVENLABS_API_KEY`
   - Value: API key ElevenLabs milik Anda.
5. Redeploy.
6. Buka aplikasi dan pilih **⭐ Narator Utama — Klon Suara Rekaman Gombong**.
7. Tekan **🎙️ Aktifkan Klon Suara** atau jalankan pengumuman pertama. Aplikasi akan membuat voice clone dari MP3 referensi, lalu menyimpan `voice_id` di browser.

## Catatan kualitas

MP3 referensi yang tersedia hanya sekitar 11,5 detik. Voice cloning dapat menangkap karakter/timbre, tetapi hasil tidak dijamin identik 100%. Untuk kemiripan yang lebih tinggi, gunakan lebih banyak rekaman bersih dari pembicara yang sama jika tersedia.

## Arsitektur

- `index.html`: aplikasi utama.
- `api/clone.js`: membuat Instant Voice Clone secara server-side sehingga API key tidak ditaruh di HTML.
- `api/tts.js`: menghasilkan audio pengumuman dari voice clone.
- Chime tetap memakai sistem audio aplikasi yang sudah ada.
- Profil Google tetap tersedia sebagai fallback.

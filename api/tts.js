export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ok:true, endpoint:'/api/tts', method:'POST required'});
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return res.status(500).json({error:'ELEVENLABS_API_KEY belum diatur di Vercel.'});
  try {
    const { voiceId, text, languageCode } = req.body || {};
    if (!voiceId || !text) return res.status(400).json({error:'voiceId dan text wajib diisi.'});
    if (String(text).length > 5000) return res.status(400).json({error:'Teks terlalu panjang; aplikasi seharusnya memecahnya otomatis.'});
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voiceId) + '?output_format=mp3_44100_128';
    const r = await fetch(url, {
      method:'POST', headers:{'xi-api-key':key,'Content-Type':'application/json','Accept':'audio/mpeg'},
      body:JSON.stringify({text:String(text),model_id:'eleven_multilingual_v2',language_code:languageCode || 'id',voice_settings:{stability:0.68,similarity_boost:0.90,style:0.12,use_speaker_boost:true,speed:0.92}})
    });
    if (!r.ok) {
      const raw = await r.text(); let msg=raw;
      try { const j=JSON.parse(raw); msg=j?.detail?.message || j?.detail || j?.error || raw; } catch {}
      return res.status(r.status).json({error:String(msg)});
    }
    const audio = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type','audio/mpeg'); res.setHeader('Cache-Control','no-store');
    return res.status(200).send(audio);
  } catch (e) {
    console.error(e); return res.status(500).json({error:e.message || 'Gagal menghasilkan audio.'});
  }
}

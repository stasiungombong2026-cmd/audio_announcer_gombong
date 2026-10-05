module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return res.status(500).json({error:'ELEVENLABS_API_KEY belum diatur di Vercel.'});
  try {
    const { audioDataUrl, name, description } = req.body || {};
    if (!audioDataUrl || typeof audioDataUrl !== 'string' || !audioDataUrl.startsWith('data:audio/')) {
      return res.status(400).json({error:'audioDataUrl tidak valid.'});
    }
    const m = audioDataUrl.match(/^data:(audio\/[a-zA-Z0-9.+-]+);base64,(.+)$/s);
    if (!m) return res.status(400).json({error:'Format audio base64 tidak dikenali.'});
    const mime = m[1];
    const buffer = Buffer.from(m[2], 'base64');
    if (!buffer.length) return res.status(400).json({error:'Audio referensi kosong.'});
    const form = new FormData();
    form.append('name', String(name || 'Narator Gombong — Deep Warm Station PA'));
    form.append('description', String(description || 'Klon suara narator pria untuk pengumuman Stasiun Gombong.'));
    form.append('remove_background_noise', 'false');
    form.append('files[]', new Blob([buffer], {type: mime}), 'gombong-reference.mp3');
    const r = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method:'POST',
      headers:{'xi-api-key':key},
      body:form
    });
    const data = await r.json().catch(()=>({}));
    if (!r.ok) return res.status(r.status).json({error:data?.detail?.message || data?.detail || data?.error || ('ElevenLabs HTTP '+r.status)});
    return res.status(200).json({voice_id:data.voice_id, requires_verification:data.requires_verification});
  } catch (e) {
    console.error(e);
    return res.status(500).json({error:e.message || 'Gagal membuat voice clone.'});
  }
};

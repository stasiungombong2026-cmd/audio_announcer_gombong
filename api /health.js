export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'stasiun-gombong-voice-clone',
    hasElevenLabsKey: Boolean(process.env.ELEVENLABS_API_KEY),
    runtime: 'nodejs',
    time: new Date().toISOString()
  });
}

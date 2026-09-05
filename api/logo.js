export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('https://a.espncdn.com/')) {
    return res.status(400).send('Missing or invalid url parameter');
  }

  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('ESPN CDN returned ' + r.status);

    const buffer = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/png');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).send(buffer);
  } catch (err) {
    res.status(502).send('Could not fetch logo: ' + err.message);
  }
}

export default async function handler(req, res) {
  try {
    const r = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=32');
    if (!r.ok) throw new Error('ESPN returned ' + r.status);
    const data = await r.json();

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Could not reach ESPN', detail: err.message });
  }
}

// In-memory store: WARNING: resets whenever the function container restarts!
// For production, use a database (see note below)
let KEYS = global.KEYS || (global.KEYS = []);

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Only POST allowed" });
  }
  const { key } = req.body ?? {};
  if (!key) {
    return res.status(400).json({ success: false, message: "Missing key" });
  }
  if (KEYS.includes(key.trim())) {
    return res.status(200).json({ success: true, message: "Key valid" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid key" });
  }
}

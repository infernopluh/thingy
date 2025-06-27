import { randomBytes } from "crypto";

// In-memory store: WARNING: resets whenever the function container restarts!
// For production, use a database (see note below)
let KEYS = global.KEYS || (global.KEYS = []);

function generateKey() {
  // e.g., "ELUX:5F3A-2B8C-7E1D"
  return (
    "ELUX:" +
    randomBytes(2).toString("hex").toUpperCase() +
    "-" +
    randomBytes(2).toString("hex").toUpperCase() +
    "-" +
    randomBytes(2).toString("hex").toUpperCase()
  );
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Only POST allowed" });
  }
  const newKey = generateKey();
  KEYS.push(newKey);
  return res.status(200).json({ success: true, key: newKey });
}

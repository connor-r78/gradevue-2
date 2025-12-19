import StudentVue from "studentvue.js";
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { district, username, password } = req.body;

    if (!username || !password) {
      const cookieHeader = req.headers.cookie || "";
      const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
      
      if (cookies.auth_token) {
        try {
          const jsonStr = decrypt(cookies.auth_token);
          const creds = JSON.parse(jsonStr);
          district = creds.district;
          username = creds.username;
          password = creds.password;
        } catch (e) {
          console.error("Login failed", e);
        }
      }
    }

    if (!district || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const client = await StudentVue.login(district, username, password);
    const gradebook = await client.getGradebook();

    const encryptedCookie = encrypt(JSON.stringify({ district, username, password }));

    res.setHeader("Set-Cookie", `auth_token=${encryptedCookie}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict`);

    return res.status(200).json(gradebook);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
}

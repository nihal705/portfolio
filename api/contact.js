// api/contact.js
// Vercel Serverless Function – handles contact form with rate limiting and spam protection

const rateLimitStore = new Map();

const RATE_LIMIT_MAX = 2;                       
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;  
const MIN_FORM_FILL_TIME = 3000;                

export default async function handler(req, res) {
  // CORS headers (safety)
  res.setHeader("Access-Control-Allow-Origin", "https://gnihal.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, honeypot, formStartTime } = req.body || {};

  // 1. Honeypot check
  if (honeypot && honeypot.length > 0) {
    return res.status(400).json({ error: "Spam detected." });
  }

  // 2. Time-based check
  if (formStartTime && Date.now() - formStartTime < MIN_FORM_FILL_TIME) {
    return res.status(400).json({ error: "Form submitted too quickly. Please try again." });
  }

  // 3. Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: "Input too long." });
  }

  // 4. Get client IP
  const ip =
    (req.headers["x-forwarded-for"]?.split(",")[0] || "").trim() ||
    req.headers["x-real-ip"] ||
    "unknown";

  // 5. Rate limit check
  const now = Date.now();
  const record = rateLimitStore.get(ip) || [];
  const recent = record.filter((ts) => now - ts < RATE_LIMIT_WINDOW);

  if (recent.length >= RATE_LIMIT_MAX) {
    const oldest = recent[0];
    const hoursLeft = Math.ceil((RATE_LIMIT_WINDOW - (now - oldest)) / (1000 * 60 * 60));
    return res.status(429).json({
      error: `Too many messages. Please wait ${hoursLeft} hour(s) before trying again.`,
    });
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);

  // 6. Send email via EmailJS REST API
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY, 
        template_params: {
          from_name: name,
          from_email: email,
          message: message,
          to_name: "Nihal",
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("EmailJS error:", text); 
      return res.status(500).json({ error: "Failed to send email. Please try again later." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
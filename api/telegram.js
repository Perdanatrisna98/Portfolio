export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  const text = `
📨 PESAN BARU DARI WEBSITE

👤 Nama: ${name}
📧 Email: ${email}
📝 Subjek: ${subject}
💬 Pesan:
${message}

⏰ Waktu: ${new Date().toLocaleString('id-ID')}
  `;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text
    })
  });

  res.status(200).json({ success: true });
}

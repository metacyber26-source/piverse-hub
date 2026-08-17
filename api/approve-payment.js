export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { paymentId } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY; // Ambil dari Environment Variables Vercel

    if (!paymentId) {
        return res.status(400).json({ error: 'Payment ID required' });
    }

    try {
        // Panggil API Pi Platform untuk menyetujui pembayaran
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true, data });
        } else {
            return res.status(400).json({ success: false, error: data });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', reply: 'Method tidak diizinkan.' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ status: 'error', reply: 'Pesan tidak boleh kosong.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    return res.status(200).json({ 
      status: 'success', 
      reply: response.text 
    });
  } catch (error) {
    console.error('Gemini Error:', error);
    return res.status(500).json({ 
      status: 'error', 
      reply: 'Gagal mendapatkan respon dari Oracle (API Error).' 
    });
  }
}

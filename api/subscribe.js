// Endpoint serverless para el lead magnet "Tu Primer Control del Impulso"
// Fase 2: solo la estructura. Todavía NO se conecta con Resend (eso es la Fase 3).
//
// Este archivo está pensado para desplegarse en Vercel. Vercel detecta
// automáticamente cualquier archivo dentro de la carpeta /api como un
// endpoint. No hace falta configuración adicional para que esto funcione
// como POST /api/subscribe una vez desplegado.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  const { name, email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Falta el email.' });
  }

  // ---------------------------------------------------------------
  // FASE 3 (todavía no implementado):
  // Acá vamos a conectar con Resend para enviar el lead magnet.
  // La API key y el email de envío NUNCA se escriben acá directamente.
  // Se leen desde las variables de entorno del proyecto en Vercel:
  //
  //   const RESEND_API_KEY = process.env.RESEND_API_KEY;
  //   const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
  //
  // Esas variables se cargan en el panel de Vercel (Settings → Environment
  // Variables), nunca en este archivo ni en ningún chat.
  // ---------------------------------------------------------------

  console.log('Nuevo registro recibido (sin enviar email todavía):', { name, email });

  return res.status(200).json({ success: true });
}

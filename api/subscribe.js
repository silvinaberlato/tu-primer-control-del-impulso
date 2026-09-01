// Endpoint serverless para el lead magnet "Tu Primer Control del Impulso"
// Fase 3: conectado con Resend para (1) mandar el email de bienvenida y
// (2) guardar el contacto en la Audience, para poder mandarle campañas
// más adelante.
//
// La API key se lee desde las variables de entorno del proyecto en Vercel —
// NUNCA está escrita acá. El ID de la Audience SÍ puede ir directo en el
// código: no es un dato secreto, es solo un identificador (como el nombre
// de una carpeta), no una clave de acceso.

const AUDIENCE_ID = '0515f80d-fdde-4020-8fe0-dd4fd75dabc8';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  const { name, email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Falta el email.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

  const primerNombre = (name || '').trim().split(' ')[0];
  const saludo = primerNombre ? `Hola ${primerNombre},` : 'Hola,';
  const subject = primerNombre
    ? `${primerNombre}, tu Primer Control del Impulso ya está disponible`
    : 'Tu Primer Control del Impulso ya está disponible';

  const emailHtml = `
  <div style="background-color:#F5EDE3; padding:32px 16px; font-family:Helvetica, Arial, sans-serif;">
    <div style="max-width:520px; margin:0 auto; background-color:#FBF6EF; border-radius:20px; padding:36px 28px;">

      <h1 style="font-family:Georgia, 'Times New Roman', serif; font-size:22px; color:#8B2F45; margin:0 0 20px;">
        Tu Primer Control del Impulso™
      </h1>

      <p style="font-size:15px; line-height:24px; color:#3a2418; margin:0 0 16px;">
        ${saludo} gracias por dar este paso. Pediste algo concreto para el
        momento exacto en que aparece la tentación de escribirle, y eso ya
        dice mucho sobre lo en serio que te estás tomando este proceso.
      </p>

      <p style="font-size:15px; line-height:24px; color:#3a2418; margin:0 0 16px;">
        Vas a atravesar una mini experiencia guiada de 3 pasos: primero tu
        Checklist de Emergencia de 60 Segundos real, con un cronómetro en
        pantalla y seis acciones concretas para hacer una por una — y
        después una probadita de otras dos herramientas del sistema, todo
        pensado para el momento exacto en que aparece la tentación de
        escribirle.
      </p>

      <p style="font-size:15px; line-height:24px; color:#3a2418; margin:0 0 16px;">
        Esto funciona mejor cuanto antes lo pruebes — no porque tenga fecha
        de vencimiento, sino porque cuanto más fresca esté la idea, más
        fácil te va a resultar recordarla la próxima vez que sientas el
        impulso de verdad.
      </p>

      <p style="font-size:15px; line-height:24px; color:#3a2418; margin:0 0 28px;">
        Haz clic en el botón de abajo para entrar ahora mismo. Te toma
        unos 3 minutos, y vas a salir con algo concreto en la mano.
      </p>

      <div style="text-align:center;">
        <a href="https://tu-primer-control-del-impulso.vercel.app/herramienta"
           style="display:inline-block; background-color:#8A3E22; color:#F5EDE3; text-decoration:none;
                  font-weight:bold; font-size:16px; padding:16px 28px; border-radius:12px;">
          Empezar mi Control del Impulso
        </a>
      </div>

    </div>
  </div>
  `;

  // 1) Mandar el email de bienvenida
  let emailEnviado = true;
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: subject,
        html: emailHtml
      })
    });

    if (!resendResponse.ok) {
      emailEnviado = false;
      const errorBody = await resendResponse.text();
      console.error('Resend respondió con error al enviar el email:', resendResponse.status, errorBody);
    }
  } catch (err) {
    emailEnviado = false;
    console.error('Error al llamar a Resend (envío de email):', err);
  }

  // 2) Guardar el contacto en la Audience (para poder mandarle campañas después)
  let contactoGuardado = true;
  try {
    const contactResponse = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        first_name: primerNombre || undefined,
        unsubscribed: false
      })
    });

    if (!contactResponse.ok) {
      contactoGuardado = false;
      const errorBody = await contactResponse.text();
      console.error('Resend respondió con error al guardar el contacto:', contactResponse.status, errorBody);
    }
  } catch (err) {
    contactoGuardado = false;
    console.error('Error al llamar a Resend (guardar contacto):', err);
  }

  // SIEMPRE devolvemos success:true. El acceso a la herramienta nunca debe
  // depender de que Resend haya funcionado bien — es un beneficio extra,
  // no un candado. El estado real de cada llamada queda en los logs de
  // Vercel para que puedas revisarlo si algo falla.
  return res.status(200).json({ success: true, emailEnviado, contactoGuardado });
}

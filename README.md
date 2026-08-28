# Tu Primer Control del Impulso — Lead Magnet

Lead magnet para **Protocolo de Resistencia al Contacto Cero™**.

## Qué hay en esta fase (Fase 3)

- **`/` (`index.html`)** — página de captura: nombre, email, checkbox de consentimiento
  y botón que se activa recién cuando se marca el checkbox.
- **`/herramienta` (`herramienta/index.html`)** — placeholder. La herramienta interactiva
  real se construye en la Fase 4.
- **`/api/subscribe`** — ahora conectado de verdad con Resend: al enviar el formulario,
  manda un email de bienvenida con un botón que lleva a `/herramienta`.

Pase lo que pase con Resend (falle o no), la persona siempre es redirigida a
`/herramienta` después de enviar el formulario — la captura de email es un
beneficio extra, nunca un candado para acceder a la herramienta gratuita.

## Variables de entorno que hay que cargar en Vercel (ahora sí)

A diferencia de la Fase 2, **este código ya usa estas dos variables**, así que hay
que cargarlas para que el envío de emails funcione:

1. En tu proyecto dentro de Vercel, andá a **Settings → Environment Variables**.
2. Agregá:
   - `RESEND_API_KEY` → tu API key de Resend
   - `RESEND_FROM_EMAIL` → `hola@contactocero.tuherramientadigital.com`
3. Guardá, y volvé a desplegar el proyecto (Vercel te va a ofrecer un botón para
   redesplegar apenas guardes las variables).

**Nunca pegues estos valores en ningún archivo de código ni se los muestres a
nadie fuera del panel de Vercel.**

## Cómo actualizar el proyecto ya desplegado

Como el repositorio de GitHub ya existe y ya está conectado a Vercel, no hace
falta crear nada nuevo:

1. Subí estos archivos nuevos/actualizados al mismo repositorio de GitHub
   (`tu-primer-control-del-impulso`), reemplazando `api/subscribe.js` y sumando
   `index.html` y la carpeta `herramienta/`.
2. Vercel va a detectar el cambio y volver a desplegar automáticamente — no
   hace falta hacer nada más ahí.

## Pendiente para la Fase 4

- Construir la herramienta interactiva real en `/herramienta` (reemplaza el
  placeholder actual).
- Opcional: guardar cada contacto en una **Audience** de Resend, para poder
  mandarle campañas más adelante (no solo el email de bienvenida). Esto
  requiere crear una Audience desde el panel de Resend primero — si te
  interesa, lo sumamos como un paso aparte.

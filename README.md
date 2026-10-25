# Tu Primer Control del Impulso — Lead Magnet

Lead magnet completo para **Protocolo de Resistencia al Contacto Cero™**.

## Estado: completo

- **`/` (`index.html`)** — página de captura: nombre, email, checkbox de consentimiento
  y botón que se activa recién cuando se marca el checkbox.
- **`/herramienta` (`herramienta/index.html`)** — la herramienta interactiva real:
  - **Tu experiencia**: 3 pasos guiados (Checklist de Emergencia de 60 Segundos real
    con cronómetro, probadita de Frases de Contención, probadita del Diario de
    Registro de Impulsos) → resultado personalizado → transición → botón a la
    página de ventas.
  - **Para cuando la tentación vuelva**: 3 posts de valor (estructura Why/What/How)
    con botón a la página de ventas en cada uno.
  - Carrusel de 6 testimonios al final de la experiencia.
  - Los 4 botones apuntan a la página de ventas (`https://contactocero.tuherramientadigital.com`).
    Ya no queda ningún placeholder pendiente.
- **`/api/subscribe`** — conectado con Resend. Hace tres cosas, en este orden:
  1. Envía el email de bienvenida (HTML y texto plano).
  2. Guarda el contacto en la Audience.
  3. Dispara el evento `lead.capturado`, que arranca la secuencia de carrito abandonado.

  Pase lo que pase con Resend (falle o no), la persona siempre es redirigida a
  `/herramienta`: la captura de email es un beneficio extra, nunca un candado.

## Emails

Todos los emails de este proyecto salen por Resend y comparten estas reglas:

| Regla | Valor |
|---|---|
| Remitente de la bienvenida | `RESEND_FROM_EMAIL` (variable de entorno en Vercel) |
| Remitente de la secuencia | `Sofía Herrera <sofia@contactocero.tuherramientadigital.com>` |
| `reply_to` (todos) | `soporte@tuherramientadigital.com` |
| Línea al final de cada email | "¿Tienes dudas? Responde a este email o escríbenos a soporte@tuherramientadigital.com." |

Los remitentes (`hola@`, `sofia@`) no reciben correo: por eso todos los emails llevan
`reply_to` a soporte. Si agregas un email nuevo, ponle el mismo `reply_to` y la misma línea.

### Email de bienvenida

Está en este repo: `api/subscribe.js`.

### Secuencia de carrito abandonado (6 emails)

**No está en este repo:** vive en Resend, en la automatización **"Carrito Abandonado - Protocolo
Contacto Cero"** y en sus 6 plantillas (`carrito-email-1…6`). Si cambias algo ahí, anótalo en esta
sección.

- **Disparador:** el evento `lead.capturado` (lo envía `api/subscribe.js`).
- **Cómo avanza:** antes de cada email, la automatización espera el evento `compra.protocolo`
  con un tiempo máximo de 1 día. Si el evento llega, la secuencia termina. Si no llega, envía el
  siguiente email. Así los 6 emails salen en los días 1 a 6, y se detienen si la persona compra.
- **Quién envía `compra.protocolo`:** la app de miembros (`protocolo-app`), cuando Hotmart
  confirma la compra (`PURCHASE_APPROVED`). Necesita en Vercel la variable
  `RESEND_EVENTS_API_KEY` (una API key de Resend con acceso completo; la de solo envío no sirve
  para eventos).
- **Cómo se asocia la compra con el contacto:** por email. Para que coincida, el botón de cada email
  lleva el email de la persona (`?email=`), la página de ventas lo pasa al enlace de Hotmart y el
  checkout lo recibe prellenado. Lo mismo hacen los 4 botones de `herramienta/index.html`, que leen el
  email guardado en `localStorage` (`lead_email`) al registrarse.
  - En los emails se usa la variable de plantilla `{{{LEAD_EMAIL}}}`, que cada paso de la automatización
    rellena con `contact.email`. No uses la variable reservada `{{{EMAIL}}}`: dentro de una automatización
    llega vacía.
  - La página de ventas (`pagina-ventas-contacto-cero/index.html`) copia `?email=` a los enlaces de Hotmart y lo
    quita de la barra de direcciones. Un "+" del email llega como espacio en la URL y se restaura.
- **Limitación:** si la persona compra con un email distinto al que dejó aquí (por ejemplo, borra el
  prellenado), la secuencia no se detiene y seguirá recibiendo los emails hasta el final. Por eso cada
  email dice "Si ya compraste, puedes ignorar este mensaje." y tiene el enlace de baja a la vista.

| Día | Asunto |
|---|---|
| 1 | ¿Te fuiste a mitad de camino? |
| 2 | Esto es exactamente lo que incluye tu Protocolo |
| 3 | Las tres dudas que probablemente tienes |
| 4 | Carla rompió el contacto cero tres veces en un mes |
| 5 | Por qué tu Protocolo cuesta solo $7 (por ahora) |
| 6 | Este es mi último mensaje sobre esto |

El enlace de baja del pie de cada email usa la variable `{{{RESEND_UNSUBSCRIBE_URL}}}`, en
12 px y color `#7A5240` (contraste 6,3:1 sobre el fondo `#FBF6EF`; antes era 2,2:1).

## Variables de entorno en Vercel

Ya deberían estar cargadas. Si hace falta revisarlas o volver a cargarlas:

1. En tu proyecto dentro de Vercel, ve a **Settings → Environment Variables**.
2. Confirma que existan:
   - `RESEND_API_KEY` → tu API key de Resend (permiso "Full access", para poder
     mandar emails, guardar contactos en la Audience y disparar eventos)
   - `RESEND_FROM_EMAIL` → `hola@contactocero.tuherramientadigital.com`

**Nunca pegues estos valores en ningún archivo de código ni se los muestres a
nadie fuera del panel de Vercel.**

## Cómo actualizar el proyecto ya desplegado

El repositorio de GitHub ya existe y ya está conectado a Vercel — no hace falta
crear nada nuevo:

1. Sube los cambios al mismo repositorio de GitHub (`tu-primer-control-del-impulso`).
2. Vercel va a detectar el cambio y volver a desplegar automáticamente.

## Más contexto

La app de miembros, el webhook de Hotmart y el envío de `compra.protocolo` están en el
repositorio `protocolo-app`; la página de ventas, en `pagina-ventas-contacto-cero`.

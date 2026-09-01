# Tu Primer Control del Impulso — Lead Magnet

Lead magnet completo para **Protocolo de Resistencia al Contacto Cero™**.

## Estado: completo (Fases 2, 3 y 4)

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
- **`/api/subscribe`** — conectado con Resend: manda el email de bienvenida y
  guarda el contacto en la Audience. Pase lo que pase con Resend (falle o no),
  la persona siempre es redirigida a `/herramienta` — la captura de email es un
  beneficio extra, nunca un candado.

## ⚠️ Pendiente antes de lanzar tráfico de verdad

**Reemplazar el placeholder de la página de ventas.** Buscá `TU-PAGINA-DE-VENTAS-AQUI.com`
en `herramienta/index.html` (aparece 4 veces: el CTA del resultado y los 3 CTA de los
posts) y reemplazalo por la URL real una vez que la página de ventas esté publicada.

## Variables de entorno en Vercel

Ya deberían estar cargadas desde la Fase 3. Si hace falta revisarlas o volver a
cargarlas:

1. En tu proyecto dentro de Vercel, andá a **Settings → Environment Variables**.
2. Confirmá que existan:
   - `RESEND_API_KEY` → tu API key de Resend (permiso "Full access", para poder
     mandar emails y guardar contactos en la Audience)
   - `RESEND_FROM_EMAIL` → `hola@contactocero.tuherramientadigital.com`

**Nunca pegues estos valores en ningún archivo de código ni se los muestres a
nadie fuera del panel de Vercel.**

## Cómo actualizar el proyecto ya desplegado

El repositorio de GitHub ya existe y ya está conectado a Vercel — no hace falta
crear nada nuevo:

1. Subí estos archivos al mismo repositorio de GitHub (`tu-primer-control-del-impulso`),
   reemplazando `index.html`, `api/subscribe.js`, `README.md`, `package.json`, y
   toda la carpeta `herramienta/`.
2. Vercel va a detectar el cambio y volver a desplegar automáticamente.

## Próximo paso del proyecto

Migración de todo el embudo (esta pieza incluida) a Claude Code, con dominio
real unificado para la página de ventas, el área de miembros y este lead magnet.

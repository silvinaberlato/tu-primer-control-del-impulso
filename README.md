# Tu Primer Control del Impulso — Backend

Backend del lead magnet para **Protocolo de Resistencia al Contacto Cero™**.

## Qué es esto (Fase 2)

Un único endpoint (`/api/subscribe`) que por ahora **recibe el nombre y el email de quien
se registra, y responde que todo salió bien** — todavía no manda ningún email de verdad.
Eso se conecta en la Fase 3, cuando sumemos Resend.

## Cómo desplegarlo en Vercel (gratis)

No hace falta saber programar para estos pasos, son todos con clics.

1. **Creá una cuenta en GitHub** (si no tenés una): [github.com](https://github.com) — es gratis.
2. **Creá un repositorio nuevo** en GitHub y subí esta carpeta completa
   (`tu-primer-control-del-impulso`) ahí. La forma más simple sin usar la
   terminal es con **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)):
   abrís la app, elegís "Add local folder", seleccionás esta carpeta, y le das "Publish repository".
3. **Creá una cuenta en Vercel**: [vercel.com](https://vercel.com) — podés entrar directamente
   con tu cuenta de GitHub, es un solo clic.
4. En Vercel, tocá **"Add New Project"**, elegí el repositorio que acabás de subir, y
   tocá **"Deploy"**. No hace falta cambiar ninguna configuración por ahora.
5. En un par de minutos vas a tener una URL como `tu-proyecto.vercel.app` — ese es tu
   backend, ya funcionando.

## Variables de entorno (cuando lleguemos a la Fase 3)

Esto **todavía no hace falta hacerlo** — el código de esta fase no las usa todavía.
Cuando conectemos Resend, vas a tener que cargar dos valores directamente en Vercel
(nunca en el código, nunca en un chat):

1. En tu proyecto dentro de Vercel, andá a **Settings → Environment Variables**.
2. Agregá:
   - `RESEND_API_KEY` → tu API key de Resend (la que ya generaste)
   - `RESEND_FROM_EMAIL` → `hola@contactocero.tuherramientadigital.com`
3. Guardá, y volvé a desplegar el proyecto para que tome los cambios (Vercel te lo va a ofrecer solo).

## Probar que funciona (una vez desplegado)

Podés probar el endpoint enviándole una petición POST con `name` y `email`. Por ejemplo,
desde una herramienta como [Postman](https://www.postman.com) o con este comando en la
terminal (opcional, no obligatorio):

```
curl -X POST https://tu-proyecto.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"Prueba","email":"prueba@ejemplo.com"}'
```

Deberías recibir: `{"success":true}`

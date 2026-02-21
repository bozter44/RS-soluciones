# RS Soluciones Landing

Landing page de ventas desarrollada con React + Tailwind CSS.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Integración con Google Sheets

En `src/App.jsx` debes reemplazar:

- `APPS_SCRIPT_URL` por la URL pública de tu Google Apps Script desplegado como Web App.
- `WHATSAPP_NUMBER` por el número real de contacto en formato internacional, sin símbolos.

El formulario envía `POST` JSON con nombre, teléfono, email, mensaje, fuente y fecha de creación.

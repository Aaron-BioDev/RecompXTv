# RecompXtv

Repositorio estático de apps para Android TV, Fire TV, LG webOS, Samsung Tizen, Roku TV y Android móvil. Incluye códigos de Downloader, enlaces a tiendas oficiales y una guía de instalación por app.

## Estructura

```text
RecompXTV/
├── index.html          # Página principal (única versión activa)
├── css/styles.css      # Estilos propios y accesibilidad
├── js/app.js           # Datos de apps y lógica de la interfaz
├── img/                # Logo original + favicons + imagen Open Graph
├── manifest.json       # Metadatos PWA
├── robots.txt          # Indexación
├── sitemap.xml         # Mapa del sitio
├── 404.html            # Página de error
└── _old/               # Versión anterior conservada como respaldo
```

`recompxtv_repository.html` era la versión antigua con los datos duplicados dentro del HTML. Se movió a `_old/` para evitar dos fuentes de verdad. No la enlaces desde el sitio.

## Cómo añadir o editar una app

Todo se edita en el array `apps` de `js/app.js`:

```js
{
    id: 'mi-app',                    // único, sin espacios
    name: 'Mi App',
    categories: ['smarttv'],         // smarttv | mobile | herramientas | reproductores
    platforms: ['androidtv'],        // androidtv | lg | tizen | roku | mobile
    tag: 'Android TV',
    code: null,                      // código de Downloader o null
    verified: false,                 // true cuando confirmaste el código
    installLabel: 'Google Play',     // texto cuando no hay código
    iconClass: 'fa-tv',              // icono de Font Awesome
    bgColor: 'from-purple-600 to-indigo-600',
    desc: 'Descripción corta.',
    guide: 'Guía de instalación.',
    directUrl: 'https://...',        // null si aún no hay enlace oficial
}
```

Si `directUrl` es `null`, la tarjeta muestra "Enlace pendiente de confirmar" y no genera un enlace roto.

## Datos que debes completar antes de publicar

Estos valores siguen siendo de ejemplo y **no deben publicarse tal cual**:

1. **Códigos de Downloader**: deben ser de **6 dígitos**. Los códigos actuales (`74829`, `11111`, `39201`, `82043`, `50291`, `94012`) son de 5 dígitos y probablemente no funcionan. Mientras no los verifiques, la interfaz muestra la etiqueta **"Sin verificar"**. Cuando confirmes uno, cambia `verified: false` a `verified: true`.
2. **Enlaces de descarga**: varias apps tienen `directUrl: null` a propósito hasta confirmar el enlace oficial. No uses la portada de MediaFire como enlace de descarga.
3. **Donaciones**: `index.html` apunta a `https://ko-fi.com` y `https://buymeacoffee.com` genéricos. Reemplázalos por tus perfiles reales.
4. **Dominio y contacto**: `canonical`, `og:url`, `sitemap.xml`, `robots.txt` y el correo del aviso de privacidad usan `recompxtv.com` / `contacto@recompxtv.com` como marcadores. Cámbialos si tu dominio o correo son distintos.

## Probar en local

Abre `index.html` directamente o levanta un servidor estático:

```bash
npx serve .
```

Para que el portapapeles moderno (`navigator.clipboard`) funcione, usa `localhost` o HTTPS. En `file://` se usa el fallback con `execCommand`.

## Despliegue

Es un sitio estático: puedes subir la carpeta a Netlify, Vercel, Cloudflare Pages o GitHub Pages sin compilación.

## Nota sobre Tailwind

Actualmente se usa `cdn.tailwindcss.com`, que compila en el navegador. Para producción conviene compilar Tailwind a un CSS estático y quitar el CDN. La configuración ya está centralizada en `index.html`.

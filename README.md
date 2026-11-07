# RecompXtv

Repositorio estático de apps para Android TV, Fire TV, LG webOS, Samsung Tizen, Roku TV y Android móvil. Incluye códigos de Downloader, enlaces a tiendas oficiales, un apartado de descarga directa con archivos oficiales y una guía de instalación por app.

## Estructura

```text
RecompXTV/
├── index.html          # Página principal (única versión activa)
├── css/styles.css      # Estilos propios y accesibilidad
├── js/app.js           # Datos de apps y lógica de la interfaz
├── img/                # Logo original + favicons + imagen Open Graph
├── manifest.json       # Metadatos PWA
├── version.json        # Versión publicada de la web para el aviso de actualización
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
    format: 'APK',                   // APK | IPK | WGT | ZIP (puede combinarse)
    code: null,                      // código de Downloader o null
    verified: false,                 // true cuando confirmaste el código
    installLabel: 'Google Play',     // texto del enlace oficial o tienda
    iconClass: 'fa-tv',              // icono de Font Awesome (respaldo)
    iconImage: 'img/apps/mi-app.png', // logo local 256x256; si falta, se usa iconClass
    bgColor: 'from-purple-600 to-indigo-600',
    desc: 'Descripción corta.',
    guide: 'Guía de instalación.',
    directUrl: 'https://...',        // página oficial o tienda; null si no existe
    downloads: [                     // opcional: archivos oficiales directos
        {
            label: 'Android TV',
            format: 'APK',
            variant: 'Universal',
            version: '1.0.0',
            source: 'GitHub Releases',
            url: 'https://github.com/.../archivo.apk',
        },
    ],
}
```

Si `directUrl` es `null`, la tarjeta muestra "Enlace pendiente de confirmar" y no genera un enlace roto. `downloads` solo debe contener URLs de archivos publicados por el desarrollador; no alojes APK, IPK, WGT ni ZIP en el proyecto.

La sección `#descarga-directa` se genera automáticamente:

- Las apps con `downloads` muestran botones de descarga directa con formato, variante, versión y fuente.
- Las apps con `directUrl` pero sin `downloads` aparecen en "También desde la página oficial".
- Las apps sin `directUrl` no se incluyen en esa sección.

Los iconos locales viven en `img/apps/`. Las fuentes de cada logo están documentadas en `img/apps/SOURCES.md`.

### Formatos de instalación

| Formato | Plataforma | Notas |
| --- | --- | --- |
| `APK` | Android TV, Fire TV y Android móvil | Paquete de aplicación Android. |
| `IPK` | LG webOS | Paquete de app webOS; se usa con Developer Mode o sideload. |
| `WGT` | Samsung Tizen | Paquete de app Tizen; se instala con Tizen Studio, TizenBrew o el instalador oficial. |
| `ZIP` | Roku | Paquete para sideload en modo desarrollador. Los canales firmados de la tienda usan `.pkg`. |

En LG, Tizen y Roku, si la app está disponible en la tienda oficial, se instala desde ahí. Los formatos `IPK`, `WGT` y `ZIP` son para instalación manual o sideload.

### Descargas directas actuales

| App | Archivo | Formato | Versión | Fuente |
| --- | --- | --- | --- | --- |
| Nuvio | Android TV / Fire TV | APK | 1.0.0 | GitHub Releases |
| Nuvio | LG webOS | IPK | 1.3.7 | GitHub Releases |
| Nuvio | Samsung Tizen | WGT | 1.3.7 | GitHub Releases |
| Nuvio | Android móvil | APK | 0.6.9-beta | GitHub Releases |
| Stremio | Android móvil | APK | 2.3.2 | Stremio |
| VLC | Android TV / móvil | APK | 3.7.1 | VideoLAN |
| Jellyfin | Android TV | APK | 0.19.10 | GitHub Releases |
| Jellyfin | Roku | ZIP | 3.2.4 | GitHub Releases |
| Jellyfin | Android móvil | APK | 2.7.3 | GitHub Releases |
| Kodi | Android TV / móvil | APK | 21.3 | Kodi |

Las URLs incluyen la versión exacta. Cuando el desarrollador publique una nueva release, actualiza a la vez `url` y `version` en `downloads`; después comprueba que el archivo siga descargándose. No cambies la URL por una página intermedia si quieres que el botón descargue el archivo directamente.

Actualmente la sección muestra 5 apps con 10 archivos directos y 9 páginas oficiales. `mx-player-pro` sigue pendiente de un enlace oficial confirmado.

## Datos que debes completar antes de publicar

Estos valores siguen siendo de ejemplo y **no deben publicarse tal cual**:

1. **Códigos de Downloader**: deben ser de **6 dígitos**. Los códigos actuales (`74829`, `11111`, `39201`, `82043`, `50291`, `94012`) son de 5 dígitos y probablemente no funcionan. Mientras no los verifiques, la interfaz muestra la etiqueta **"Sin verificar"**. Cuando confirmes uno, cambia `verified: false` a `verified: true`.
2. **Enlaces de descarga**: `mx-player-pro` sigue con `directUrl: null` a propósito hasta confirmar el enlace oficial. Las demás apps tienen página oficial o tienda; las que aparecen en `downloads` usan archivos oficiales. No uses la portada de MediaFire como enlace de descarga.
3. **Donaciones**: `index.html` apunta a `https://ko-fi.com` y `https://buymeacoffee.com` genéricos. Reemplázalos por tus perfiles reales.
4. **Dominio y contacto**: `canonical`, `og:url`, `sitemap.xml`, `robots.txt` y el correo del aviso de privacidad usan `recompxtv.com` / `contacto@recompxtv.com` como marcadores. Cámbialos si tu dominio o correo son distintos.

## Probar en local

Abre `index.html` directamente o levanta un servidor estático:

```bash
npx serve .
```

Para que el portapapeles moderno (`navigator.clipboard`) funcione, usa `localhost` o HTTPS. En `file://` se usa el fallback con `execCommand`.

## Actualización de la web

La web solo avisa de sus propias actualizaciones; no comprueba las versiones de las apps del catálogo. Cada usuario actualiza sus apps desde los enlaces oficiales o la descarga directa.

Hay dos valores que deben coincidir:

- `APP_VERSION` en `js/app.js`.
- `version` en `version.json`.

Al publicar cambios:

1. Cambia `APP_VERSION` y `version` al mismo valor nuevo, por ejemplo `2026.11.15.1`.
2. Actualiza `updatedAt` en `version.json` con la fecha ISO.
3. Publica el sitio.

Si un usuario tiene una versión anterior abierta, la página consulta `version.json` cada 5 minutos, al recuperar el foco y al volver a la pestaña. Si detecta una versión distinta, muestra el aviso **"Hay una versión nueva de RecompXtv"** con un botón para recargar. El botón añade un parámetro `?v=...` para evitar que el navegador reutilice el HTML antiguo.

La comprobación se desactiva en `file://` porque los navegadores no permiten leer `version.json` en ese contexto. Para probarla, usa `localhost` o un dominio con HTTPS.

## Publicidad

Los anuncios de terceros se cargan al final de `index.html`, después del footer, para no bloquear el renderizado:

```html
<script data-cfasync="false" src="https://bauval.org/14/6d9e4d23e96e383e9f59af17d418ba59"></script>
<script data-cfasync="false" src="https://abscloud.org/1/d74ff0654af1e2ff6ec19ba2d07a9bcd"></script>
```

El aviso de privacidad ya indica que los proveedores de publicidad pueden usar cookies o identificadores. Si el sitio recibe visitantes de la Unión Europea, conviene añadir un banner de consentimiento antes de cargar estos scripts; cargarlos siempre puede incumplir la normativa de cookies.

## Despliegue

Es un sitio estático: puedes subir la carpeta a Netlify, Vercel, Cloudflare Pages o GitHub Pages sin compilación.

## Nota sobre Tailwind

Actualmente se usa `cdn.tailwindcss.com`, que compila en el navegador. Para producción conviene compilar Tailwind a un CSS estático y quitar el CDN. La configuración ya está centralizada en `index.html`.

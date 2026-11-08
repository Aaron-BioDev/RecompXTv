# RecompXTv

Repositorio estático de apps para Android TV, Fire TV, LG webOS, Samsung Tizen, Roku TV y Android móvil. Incluye códigos de Downloader, enlaces a tiendas oficiales, un apartado de descarga directa con archivos oficiales y una guía de instalación por app.

## Estructura

```text
RecompXTV/
├── apps/               # Paquetes y archivos para descarga directa (APK, IPK, WGT, ZIP)
│   ├── Android/
│   ├── Android TV  Fire OS/
│   ├── LG WebOs/
│   ├── Roku/
│   └── Samsung Tizen/
├── index.html          # Página principal (única versión activa)
├── css/
│   ├── tailwind.css      # Tailwind compilado y minificado (generado)
│   ├── tailwind.input.css# Directivas de entrada para compilar Tailwind
│   └── styles.css        # Estilos propios y accesibilidad
├── js/app.js           # Datos de apps y lógica de la interfaz
├── tailwind.config.js  # Configuración de Tailwind y colores de marca
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

Actualmente la sección muestra 10 apps con archivos directos (26 archivos enlazados) y 8 páginas oficiales. `mx-player-pro` sigue pendiente de un enlace oficial confirmado.

## Datos que debes completar antes de publicar

Estos valores siguen siendo de ejemplo y **no deben publicarse tal cual**:

1. **Códigos de Downloader**: deben ser de **6 dígitos**. Los códigos actuales (`74829`, `11111`, `39201`, `82043`, `50291`, `94012`) son de 5 dígitos y probablemente no funcionan. Mientras no los verifiques, la interfaz muestra la etiqueta **"Sin verificar"**. Cuando confirmes uno, cambia `verified: false` a `verified: true`.
2. **Enlaces de descarga**: `mx-player-pro` sigue con `directUrl: null` a propósito hasta confirmar el enlace oficial. Las demás apps tienen página oficial o tienda; las que aparecen en `downloads` usan archivos oficiales. No uses la portada de MediaFire como enlace de descarga.
3. **Donaciones**: `index.html` apunta a `https://ko-fi.com` y `https://buymeacoffee.com` genéricos. Reemplázalos por tus perfiles reales.
4. **Dominio y contacto**: el sitio está publicado en `https://recompxtv.vercel.app/`, y esa URL se usa en `canonical`, `og:url`, `sitemap.xml`, `robots.txt` y el JSON-LD. El correo del aviso de privacidad (`contacto@recompxtv.com`) sigue siendo un marcador; cámbialo por uno real.

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

Si un usuario tiene una versión anterior abierta, la página consulta `version.json` cada 5 minutos, al recuperar el foco y al volver a la pestaña. Si detecta una versión distinta, muestra el aviso **"Hay una versión nueva de RecompXTv"** con un botón para recargar. El botón añade un parámetro `?v=...` para evitar que el navegador reutilice el HTML antiguo.

La comprobación se desactiva en `file://` porque los navegadores no permiten leer `version.json` en ese contexto. Para probarla, usa `localhost` o un dominio con HTTPS.

## Privacidad y publicidad

El sitio muestra anuncios servidos por proveedores externos. Los scripts de publicidad están al final de `index.html` y pueden usar cookies, almacenamiento local o identificadores del dispositivo para mostrar y medir los anuncios; RecompXTv no controla esas prácticas. El aviso de privacidad de `index.html` lo explica.

No hay detección de bloqueadores: el contenido está disponible directamente para todos los usuarios.

Los enlaces a tiendas, webs oficiales y plataformas de donación abren sitios externos con sus propias políticas.

## Anuncios

Los scripts de monetización están al final de `index.html`:

```html
<script data-cfasync="false" src="https://bauval.org/14/6d9e4d23e96e383e9f59af17d418ba59"></script>
<script data-cfasync="false" src="https://abscloud.org/1/d74ff0654af1e2ff6ec19ba2d07a9bcd"></script>
```

Se cargan después del contenido para no bloquear el renderizado. Según la prueba en navegador, `bauval.org` corresponde al **Social Bar** de Adsterra (barra fija en la parte superior) y `abscloud.org` al **Popunder**. Ambos son autoinyectables, así que no necesitan un contenedor `<div>` en la página.

Para añadir un banner visible dentro del contenido (por ejemplo 300x250 o 728x90) hay que crear una unidad **Banner** distinta en Adsterra y pegar su código, que normalmente incluye `atOptions` y un `invoke.js` con una clave propia. La clave del Social Bar no sirve para ese formato.

Si cambias de red publicitaria, actualiza también `SITE_AD_PROBES` en `js/app.js` para que el detector de bloqueadores siga funcionando.

## Bloqueo de anuncios

`js/app.js` muestra el aviso `#adblockModal` cuando detecta que los anuncios no se cargan. Usa tres señales:

- Un elemento cebo con clases típicas de publicidad (uBlock Origin, AdBlock, AdGuard).
- Peticiones a los dominios de anuncios del sitio y a dominios publicitarios conocidos. Esto también detecta el bloqueo por DNS (AdGuard DNS, NextDNS, Pi-hole).
- `navigator.brave.isBrave()` para identificar Brave y pedir que se desactiven los Shields.

La comprobación se omite en `file://`, en buscadores y navegadores automatizados (`navigator.userAgent` / `navigator.webdriver`) y cuando falla la petición de control (`version.json`), para no bloquear a usuarios sin conexión ni afectar al SEO. Los dominios de prueba están en `SITE_AD_PROBES` y `GENERIC_AD_PROBES` dentro de `js/app.js`; actualízalos si cambias de red publicitaria.

## Alojamiento de descargas

Los archivos pesados (APK, IPK, WGT y ZIP) se enlazan desde MediaFire mediante el mapa `mediafireMap` de `js/app.js`. Así la web se mantiene ligera y no consume el ancho de banda de GitHub Pages.

Para cambiar o añadir un enlace:

1. Sube el archivo a MediaFire (o a otro hosting oficial).
2. Añade su nombre exacto y la URL en `mediafireMap`.
3. Usa ese mismo nombre al llamar a `resolveDownloadUrl(...)` dentro de `apps`.

Si un archivo no está en el mapa, se usa la ruta local dentro de `apps/` como respaldo para probar en desarrollo.

## Despliegue en GitHub Pages

Es un sitio estático ultra ligero (~3.5 MB):
1. `git init`
2. `git add .`
3. `git commit -m "Lanzamiento RecompXTv"`
4. `git branch -M main`
5. `git remote add origin https://github.com/TU_USUARIO/RecompXTV.git`
6. `git push -u origin main`
7. En GitHub: **Settings** → **Pages** → seleccionar rama `main` y guardar.

## Nota sobre Tailwind

Tailwind se compila en local y se sirve como `css/tailwind.css` (minificado). La página **no** carga `cdn.tailwindcss.com`, por lo que no hay compilación en el navegador ni parpadeo de estilos.

Si cambias clases de Tailwind en `index.html` o `js/app.js`, vuelve a generar el CSS:

```bash
npx -y tailwindcss@3.4.17 -c tailwind.config.js -i css/tailwind.input.css -o css/tailwind.css --minify
```

La configuración de colores de marca y la tipografía está en `tailwind.config.js`.

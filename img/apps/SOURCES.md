# Iconos de las apps

Los archivos de esta carpeta son logos de marca usados únicamente para identificar cada aplicación. Los derechos pertenecen a sus respectivos titulares.

Todos se descargaron de una fuente oficial o de la ficha de Google Play de la app y se redimensionaron a **256×256 PNG**.

| Archivo | App | Origen |
| --- | --- | --- |
| `nuvio.png` | Nuvio | Avatar oficial de GitHub de NuvioMedia: `https://github.com/NuvioMedia.png` |
| `stremio.png` | Stremio | Google Play: `com.stremio.one` |
| `xuper-tv.png` | Xuper TV | Google Play: `com.xuper.tv` |
| `downloader.png` | Downloader (AFTVnews) | Google Play: `com.esaba.downloader` |
| `vlc.png` | VLC Media Player / VLC for Android | Google Play: `org.videolan.vlc` |
| `smart-iptv.png` | Smart IPTV | Sitio oficial: `https://siptv.app/apple-touch-icon.png` |
| `send-files-tv.png` | Send Files to TV | Google Play: `com.yablio.sendfilestotv` |
| `mx-player.png` | MX Player | Google Play: `com.mxtech.videoplayer.ad` |
| `plex.png` | Plex | Google Play: `com.plexapp.android` |
| `jellyfin.png` | Jellyfin | Google Play: `org.jellyfin.mobile` |
| `emby.png` | Emby | Sitio oficial: `https://emby.media/android-chrome-192x192.png` |
| `kodi.png` | Kodi | Google Play: `org.xbmc.kodi` |

## Cómo se usan

Cada app en `js/app.js` tiene un campo `iconImage` con la ruta local del icono. Si la imagen no existe o falla al cargar, la tarjeta y el modal muestran el icono de Font Awesome definido en `iconClass`.

Para añadir una app nueva:

1. Guarda su logo en esta carpeta como `nombre-de-la-app.png` (recomendado 256×256).
2. Añade `iconImage: 'img/apps/nombre-de-la-app.png'` al objeto de la app.
3. Mantén `iconClass` como respaldo.

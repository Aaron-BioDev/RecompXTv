/**
 * RecompXTv - Configuración, datos y lógica de la interfaz.
 *
 * Para añadir una app, agrega un objeto al array `apps`:
 *   id:           identificador único (sin espacios)
 *   categories:   ['smarttv' | 'mobile' | 'herramientas' | 'reproductores']
 *   platforms:    ['androidtv' | 'lg' | 'tizen' | 'roku' | 'mobile']
 *   code:         código de Downloader o null si se instala desde tienda/APK
 *   verified:     true si el código fue comprobado; false muestra "Sin verificar"
 *   installLabel: texto del enlace oficial o tienda (ej. 'Google Play')
 *   directUrl:    enlace oficial de descarga o null si aún no se conoce
 */
(function () {
    'use strict';

    /* ======================================================================
       1. Tailwind se compila en local (css/tailwind.css). Este archivo solo
          contiene los datos y la lógica de la interfaz.
       ====================================================================== */

    /* ======================================================================
       2. Categorías, plataformas y textos de ayuda
       ====================================================================== */
    const categoryLabels = {
        all: 'Todas',
        smarttv: 'Smart TV',
        mobile: 'Móviles',
        herramientas: 'Herramientas',
        reproductores: 'Reproductores',
    };

    const platformConfig = {
        androidtv: {
            label: 'Android TV / Fire TV',
            short: 'Android TV',
            icon: 'fa-brands fa-android',
            color: 'text-emerald-400',
        },
        lg: {
            label: 'LG webOS',
            short: 'LG webOS',
            icon: 'fa-solid fa-tv',
            color: 'text-red-400',
        },
        tizen: {
            label: 'Samsung Tizen',
            short: 'Tizen TV',
            icon: 'fa-solid fa-tv',
            color: 'text-blue-400',
        },
        roku: {
            label: 'Roku TV',
            short: 'Roku TV',
            icon: 'fa-solid fa-tv',
            color: 'text-purple-400',
        },
        mobile: {
            label: 'Android Móvil',
            short: 'Móvil',
            icon: 'fa-solid fa-mobile-screen-button',
            color: 'text-emerald-400',
        },
    };

    const subcategoryConfig = {
        smarttv: [
            { id: 'all', label: 'Todas', icon: 'fa-solid fa-layer-group', color: 'text-gray-400' },
            { id: 'androidtv', label: 'Android TV', icon: 'fa-brands fa-android', color: 'text-emerald-400' },
            { id: 'lg', label: 'LG webOS', icon: 'fa-solid fa-tv', color: 'text-red-400' },
            { id: 'tizen', label: 'Tizen TV', icon: 'fa-solid fa-tv', color: 'text-blue-400' },
            { id: 'roku', label: 'Roku TV', icon: 'fa-solid fa-tv', color: 'text-purple-400' },
        ],
        mobile: [
            { id: 'all', label: 'Todas', icon: 'fa-solid fa-layer-group', color: 'text-gray-400' },
            { id: 'mobile', label: 'Android APK', icon: 'fa-brands fa-android', color: 'text-emerald-400' },
        ],
    };

    const platformHints = {
        smarttv: {
            all: 'Los códigos de Downloader solo funcionan en Android TV, Google TV y Fire TV. Las demás plataformas usan su propia tienda oficial.',
            androidtv: 'Compatible con Android TV, Google TV y Fire TV. Instala la app con el código en Downloader.',
            lg: 'LG webOS no instala APK ni usa Downloader. Estas apps se instalan desde LG Content Store.',
            tizen: 'Samsung Tizen no instala APK ni usa Downloader. Estas apps se instalan desde Samsung Smart Hub.',
            roku: 'Roku TV no instala APK ni usa Downloader. Estas apps se instalan desde Roku Channel Store.',
        },
        mobile: {
            all: 'APKs y apps para Android móvil. En el teléfono no se usan códigos de Downloader: descarga desde el enlace oficial.',
            mobile: 'APK para Android. Descarga desde el enlace oficial de cada app; no requiere código de Downloader.',
        },
    };

    /* ======================================================================
       Descargas directas: nombres de archivo -> URL oficial
       ====================================================================== */
    const mediafireMap = {
        'WiwyXuper_patched.apk': 'https://www.mediafire.com/file/qts49wop40nj7mq/WiwyXuper_patched.apk/file',
        'Xuper NF.apk': 'https://www.mediafire.com/file/7gudjrd4klsy1q7/Xuper_NF.apk/file',
        'Xuper_beshaka_patched.apk': 'https://www.mediafire.com/file/rorpoip24duqgc9/Xuper_beshaka_patched.apk/file',
        'Xuper_EMGv3_patched.apk': 'https://www.mediafire.com/file/v85rshssxpz572l/Xuper_EMGv3_patched.apk/file',
        'Xuper_mobile_patched.apk': 'https://www.mediafire.com/file/6tjqky3zxm3ov0v/Xuper_mobile_patched.apk/file',
        'Xuper_patched.apk': 'https://www.mediafire.com/file/9vjx1jpip5vdtua/Xuper_patched.apk/file',
        'Xuper_secneo_patched.apk': 'https://www.mediafire.com/file/wiqlxhabwmdiozh/Xuper_secneo_patched.apk/file',
        'com.webosflux.xuptertv.fidelity_patched.ipk': 'https://www.mediafire.com/file/3ra3nosnnb47et9/com.webosflux.xuptertv.fidelity_patched.ipk/file',
        'XuperTV-LG-PLUS-v2.25patched.ipk': 'https://www.mediafire.com/file/8bdp62ez1qvjv7e/XuperTV-LG-PLUS-v2.25patched.ipk/file',
        '4k_xsuper_lil.zip': 'https://www.mediafire.com/file/gku6jtskir93gpi/4k_xsuper_lil.zip/file',
        'Instalación XUPER TV para Roku.rtf': 'https://www.mediafire.com/file/kzdizfy5bzrk46b/Instalacio%25CC%2581n_XUPER_TV_para_Roku.rtf/file',
        'Roku_plus_X_HD_patched.zip': 'https://www.mediafire.com/file/71c1t26wibrl4sb/Roku_plus_X_HD_patched.zip/file',
        'XuperTV-v3_patched.zip': 'https://www.mediafire.com/file/hx9d1anokalb5ul/XuperTV-v3_patched.zip/file',
        'XuperTVnuevo_patched.zip': 'https://www.mediafire.com/file/uixktj2e3ecws50/XuperTVnuevo_patched.zip/file',
        'EpmStreamTv_patched.wgt.zip': 'https://www.mediafire.com/file/rnr6ja3cut7m1ap/EpmStreamTv_patched.wgt.zip/file',
    };


    /** Devuelve la URL oficial del archivo o el archivo local como respaldo. */
    function resolveDownloadUrl(filename, localPath) {
        return Object.prototype.hasOwnProperty.call(mediafireMap, filename)
            ? mediafireMap[filename]
            : localPath;
    }
    

    /* ======================================================================
       3. Datos de las aplicaciones
       ====================================================================== */
    // IMPORTANTE: los códigos de Downloader son de 6 dígitos.
    // Verifica cada código antes de publicarlo y reemplaza los valores de ejemplo.
    // `directUrl: null` oculta el botón de descarga cuando aún no hay enlace oficial.
    const apps = [
        {
            id: 'nuvio',
            name: 'Nuvio',
            categories: ['smarttv', 'mobile', 'reproductores'],
            platforms: ['androidtv', 'lg', 'tizen', 'mobile'],
            tag: 'Open source',
            format: 'APK · IPK · WGT',
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-photo-film',
            iconImage: 'img/apps/nuvio.png',
            bgColor: 'from-cyan-500 to-blue-700',
            desc: 'Cliente multimedia open source para organizar tu biblioteca, perfiles y progreso de reproducción en Android TV, Fire TV, LG webOS, Samsung Tizen y Android móvil.',
            guide: 'Descarga Nuvio desde nuvio.tv o desde sus releases oficiales de GitHub. En Android TV/Fire TV instala el APK; en LG webOS y Samsung Tizen requiere instalación manual (Developer Mode o TizenBrew). No hay versión oficial para Roku.',
            directUrl: 'https://nuvio.tv/',
            downloads: [
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Universal',
                    version: '1.0.0',
                    source: 'GitHub',
                    url: 'https://github.com/NuvioMedia/NuvioTV/releases/download/1.0.0/app-full-universal-release.apk',
                },
                {
                    label: 'LG webOS',
                    format: 'IPK',
                    variant: 'webOS',
                    version: '1.3.7',
                    source: 'GitHub',
                    url: 'https://github.com/NuvioMedia/NuvioTVSmart/releases/download/1.3.7/NuvioTV-webOS-1.3.7.ipk',
                },
                {
                    label: 'Samsung Tizen',
                    format: 'WGT',
                    variant: 'Tizen',
                    version: '1.3.7',
                    source: 'GitHub',
                    url: 'https://github.com/NuvioMedia/NuvioTVSmart/releases/download/1.3.7/NuvioTV-Tizen-1.3.7.wgt',
                },
                {
                    label: 'Android móvil',
                    format: 'APK',
                    variant: 'ARM64',
                    version: '0.6.9-beta',
                    source: 'GitHub',
                    url: 'https://github.com/NuvioMedia/NuvioMobile/releases/download/0.6.9-beta/androidApp-full-arm64-v8a-release.apk',
                },
            ],
        },
        {
            id: 'stremio',
            name: 'Stremio',
            categories: ['mobile', 'reproductores'],
            platforms: ['mobile'],
            tag: 'Android',
            format: 'APK',
            code: null,
            installLabel: 'Google Play',
            iconClass: 'fa-clapperboard',
            iconImage: 'img/apps/stremio.png',
            bgColor: 'from-indigo-500 to-purple-600',
            desc: 'Reproductor y centro multimedia para Android con catálogo de películas y series, addons y sincronización de progreso.',
            guide: 'Instala Stremio desde Google Play o descarga el APK oficial en stremio.com/downloads. Abre la app, crea tu cuenta y añade los addons que quieras. No requiere código de Downloader.',
            directUrl: 'https://play.google.com/store/apps/details?id=com.stremio.one',
            downloads: [
                {
                    label: 'Android móvil',
                    format: 'APK',
                    variant: 'ARM64',
                    version: '2.3.2',
                    source: 'Stremio',
                    url: 'https://dl.strem.io/android/v2.3.2-android/com.stremio.one-2.3.2-7145730-arm64-v8a.apk',
                },
            ],
        },
        {
            id: 'xuper-tv',
            name: 'Xuper TV (Android TV)',
            categories: ['smarttv', 'reproductores'],
            platforms: ['androidtv'],
            tag: 'Android TV / Fire OS',
            format: 'APK',
            code: '74829',
            verified: false,
            installLabel: 'Descarga Directa APK',
            iconClass: 'fa-tv',
            iconImage: 'img/apps/xuper-tv.png',
            bgColor: 'from-purple-600 to-indigo-600',
            desc: 'Edición oficial para Smart TVs con Android TV, Google TV y Fire TV Stick. Múltiples versiones adaptadas para control remoto sin cursor.',
            guide: 'Abre Downloader en tu Android TV o Fire TV, ingresa el código 74829 y pulsa Go. O descarga directamente cualquiera de los APKs oficiales disponibles abajo.',
            directUrl: resolveDownloadUrl('Xuper NF.apk', 'apps/Android TV  Fire OS/Xuper NF.apk'),
            downloads: [
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Edición NF (Estilo Netflix)',
                    version: '4.35.0',
                    size: '50.8 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper NF.apk', 'apps/Android TV  Fire OS/Xuper NF.apk'),
                },
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Edición Wiwy (Deportes y Eventos)',
                    version: '4.34.59',
                    size: '44.2 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('WiwyXuper_patched.apk', 'apps/Android TV  Fire OS/WiwyXuper_patched.apk'),
                },
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Edición SecNeo (Optimizada)',
                    version: '6.2.4',
                    size: '27.2 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper_secneo_patched.apk', 'apps/Android TV  Fire OS/Xuper_secneo_patched.apk'),
                },
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Edición Estándar Estable',
                    version: '4.34.4',
                    size: '34.3 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper_patched.apk', 'apps/Android TV  Fire OS/Xuper_patched.apk'),
                },
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Edición EMG v3',
                    version: '3.0',
                    size: '38.1 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper_EMGv3_patched.apk', 'apps/Android TV  Fire OS/Xuper_EMGv3_patched.apk'),
                },
                {
                    label: 'Android TV / Fire TV',
                    format: 'APK',
                    variant: 'Edición Beshaka',
                    version: '4.34.4',
                    size: '34.4 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper_beshaka_patched.apk', 'apps/Android TV  Fire OS/Xuper_beshaka_patched.apk'),
                },
            ],
        },
        {
            id: 'xuper-tv-mobile',
            name: 'Xuper TV (Android Móvil)',
            categories: ['mobile', 'reproductores'],
            platforms: ['mobile'],
            tag: 'Android Móvil (Touch)',
            format: 'APK',
            code: null,
            installLabel: 'Descargar APK Móvil',
            iconClass: 'fa-mobile-screen-button',
            iconImage: 'img/apps/xuper-tv.png',
            bgColor: 'from-indigo-600 to-purple-600',
            desc: 'Versión adaptada exclusivamente para celulares y tablets Android con controles táctiles nativos en pantalla.',
            guide: 'Descarga el APK en tu celular Android, abre el archivo descargado desde tu barra de notificaciones y selecciona "Instalar". Habilita la instalación desde fuentes desconocidas si tu navegador te lo solicita.',
            directUrl: resolveDownloadUrl('Xuper_mobile_patched.apk', 'apps/Android/Xuper_mobile_patched.apk'),
            downloads: [
                {
                    label: 'Android Móvil',
                    format: 'APK',
                    variant: 'Edición Móvil Táctil Oficial',
                    version: '6.5.9',
                    size: '52.9 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper_mobile_patched.apk', 'apps/Android/Xuper_mobile_patched.apk'),
                },
                {
                    label: 'Android Móvil',
                    format: 'APK',
                    variant: 'Edición NF Móvil',
                    version: '4.35.0',
                    size: '50.8 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Xuper NF.apk', 'apps/Android/Xuper NF.apk'),
                },
            ],
        },
        {
            id: 'xuper-tv-lg',
            name: 'Xuper TV (LG webOS)',
            categories: ['smarttv'],
            platforms: ['lg'],
            tag: 'LG webOS (Smart TV)',
            format: 'IPK',
            code: null,
            installLabel: 'Descargar paquete IPK',
            iconClass: 'fa-tv',
            iconImage: 'img/apps/xuper-tv.png',
            bgColor: 'from-red-600 to-rose-700',
            desc: 'Paquete de instalación oficial .ipk para televisores inteligentes LG con sistema webOS (compatible desde webOS 3.0 hasta webOS 24).',
            guide: 'Los televisores LG no instalan APK de Android ni usan Downloader. Para instalar:\n1. Descarga el paquete .ipk en tu PC.\n2. Conecta tu TV LG mediante la aplicación gratuita webOS Dev Manager (o Device Manager for webOS).\n3. Presiona "Install Package" y selecciona el archivo .ipk.',
            directUrl: resolveDownloadUrl('com.webosflux.xuptertv.fidelity_patched.ipk', 'apps/LG WebOs/com.webosflux.xuptertv.fidelity_patched.ipk'),
            downloads: [
                {
                    label: 'LG webOS',
                    format: 'IPK',
                    variant: 'Fidelity Edition (webOS 3.0+)',
                    version: '2.2.45',
                    size: '21.5 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('com.webosflux.xuptertv.fidelity_patched.ipk', 'apps/LG WebOs/com.webosflux.xuptertv.fidelity_patched.ipk'),
                },
                {
                    label: 'LG webOS',
                    format: 'IPK',
                    variant: 'LG Plus Edition',
                    version: '1.6.15 (v2.25)',
                    size: '21.6 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('XuperTV-LG-PLUS-v2.25patched.ipk', 'apps/LG WebOs/XuperTV-LG-PLUS-v2.25patched.ipk'),
                },
            ],
        },
        {
            id: 'xuper-tv-tizen',
            name: 'Xuper TV / EPM (Samsung Tizen)',
            categories: ['smarttv'],
            platforms: ['tizen'],
            tag: 'Samsung Tizen',
            format: 'WGT',
            code: null,
            installLabel: 'Descargar paquete WGT',
            iconClass: 'fa-tv',
            iconImage: 'img/apps/xuper-tv.png',
            bgColor: 'from-blue-600 to-cyan-600',
            desc: 'Paquete de instalación oficial .wgt (EPM Stream TV / Xuper TV) para televisores inteligentes Samsung Smart TV con sistema Tizen 3.0 o superior.',
            guide: 'Las Smart TV Samsung usan Tizen (no admiten APKs ni Downloader). Para instalar:\n1. Descarga el archivo .wgt.\n2. En tu televisor Samsung, ve a la sección Apps y teclea "12345" en el control remoto para activar Developer Mode.\n3. Configura la IP de tu PC y reinicia la TV.\n4. Desde tu PC con Tizen Studio o SDB ejecuta: sdb install EpmStreamTv_patched.wgt',
            directUrl: resolveDownloadUrl('EpmStreamTv_patched.wgt.zip', 'apps/Samsung Tizen/EpmStreamTv_patched.wgt.zip'),
            downloads: [
                {
                    label: 'Samsung Tizen',
                    format: 'WGT',
                    variant: 'EPM Stream TV Widget (Tizen 3.0+)',
                    version: '1.0.1',
                    size: '138 KB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('EpmStreamTv_patched.wgt.zip', 'apps/Samsung Tizen/EpmStreamTv_patched.wgt.zip'),
                },
            ],
        },
        {
            id: 'xuper-tv-roku',
            name: 'Xuper TV (Roku TV)',
            categories: ['smarttv'],
            platforms: ['roku'],
            tag: 'Roku TV / Roku Box',
            format: 'ZIP',
            code: null,
            installLabel: 'Descargar canal ZIP',
            iconClass: 'fa-tv',
            iconImage: 'img/apps/xuper-tv.png',
            bgColor: 'from-purple-600 to-violet-700',
            desc: 'Canal oficial de Xuper TV para reproductores Roku y Roku TV en formato .zip para instalación mediante Modo Desarrollador (Sideloading oficial).',
            guide: 'Roku no instala APKs de Android. Para instalar mediante Modo Desarrollador:\n1. En tu control de Roku presiona: HOME 3 veces, ARRIBA 2 veces, DERECHA, IZQUIERDA, DERECHA, IZQUIERDA, DERECHA.\n2. Acepta los términos, fija una contraseña y anota la dirección IP de tu Roku.\n3. En tu navegador web (PC o móvil) ingresa a http://IP_DE_TU_ROKU (usuario: rokudev y la clave asignada).\n4. Carga el archivo .zip descargado (sin descomprimir) y pulsa "Install".',
            directUrl: resolveDownloadUrl('XuperTVnuevo_patched.zip', 'apps/Roku/XuperTVnuevo_patched.zip'),
            downloads: [
                {
                    label: 'Roku TV',
                    format: 'ZIP',
                    variant: 'XuperTV Nuevo (+ Manual PDF)',
                    version: '2.0.41',
                    size: '1.8 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('XuperTVnuevo_patched.zip', 'apps/Roku/XuperTVnuevo_patched.zip'),
                },
                {
                    label: 'Roku TV',
                    format: 'ZIP',
                    variant: 'XuperTV v3 Lite',
                    version: '2.0.41',
                    size: '583 KB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('XuperTV-v3_patched.zip', 'apps/Roku/XuperTV-v3_patched.zip'),
                },
                {
                    label: 'Roku TV',
                    format: 'ZIP',
                    variant: 'Roku Plus X HD',
                    version: '1.7.2',
                    size: '2.2 MB',
                    source: 'MediaFire',
                    url: resolveDownloadUrl('Roku_plus_X_HD_patched.zip', 'apps/Roku/Roku_plus_X_HD_patched.zip'),
                },
                {
                    label: 'Roku TV',
                    format: 'ZIP',
                    variant: 'xsuper Lil 4K (Streaming + IPTV)',
                    version: '1.0.39',
                    size: '700 KB',
                    source: 'Descarga Directa',
                    url: resolveDownloadUrl('4k_xsuper_lil.zip', 'apps/Roku/4k_xsuper_lil.zip'),
                },
                {
                    label: 'Roku TV (Manual)',
                    format: 'RTF',
                    variant: 'Manual Paso a Paso Modo Desarrollador',
                    version: 'Oficial',
                    size: '5.3 KB',
                    source: 'Documentación',
                    url: resolveDownloadUrl('Instalación XUPER TV para Roku.rtf', 'apps/Roku/Instalacio%CC%81n%20XUPER%20TV%20para%20Roku.rtf'),
                },
            ],
        },
        {
            id: 'downloader',
            name: 'Downloader (Official)',
            categories: ['smarttv', 'herramientas'],
            platforms: ['androidtv'],
            tag: 'Herramienta Clave',
            format: 'APK',
            code: '11111',
            verified: false,
            installLabel: 'Sitio oficial',
            iconClass: 'fa-download',
            iconImage: 'img/apps/downloader.png',
            bgColor: 'from-amber-600 to-orange-600',
            desc: 'La herramienta fundamental para instalar aplicaciones APK directamente en dispositivos Fire TV y Android TV mediante URLs o códigos cortos.',
            guide: 'Si tu Smart TV tiene Google Play Store, búscala directamente como "Downloader". Si usas una TV alternativa, usa este código de respaldo.',
            directUrl: 'https://www.aftvnews.com/downloader/',
        },
        {
            id: 'vlc-player',
            name: 'VLC Media Player',
            categories: ['smarttv', 'reproductores'],
            platforms: ['androidtv'],
            tag: 'Android 7.0+',
            format: 'APK',
            code: '39201',
            verified: false,
            installLabel: 'VideoLAN',
            iconClass: 'fa-play',
            iconImage: 'img/apps/vlc.png',
            bgColor: 'from-orange-500 to-amber-600',
            desc: 'Reproductor multimedia libre y de código abierto compatible con todos los formatos de video, subtítulos y listas de reproducción externas.',
            guide: 'Excelente opción como reproductor secundario para aplicaciones que no tienen reproductor nativo integrado.',
            directUrl: 'https://www.videolan.org/vlc/download-android.html',
            downloads: [
                {
                    label: 'Android TV / móvil',
                    format: 'APK',
                    variant: 'ARM64',
                    version: '3.7.1',
                    source: 'VideoLAN',
                    url: 'https://download.videolan.org/pub/videolan/vlc-android/3.7.1/VLC-Android-3.7.1-arm64-v8a.apk',
                },
            ],
        },
        {
            id: 'smart-iptv-helper',
            name: 'Smart IPTV Utility',
            categories: ['smarttv'],
            platforms: ['androidtv'],
            tag: 'Fire TV / Shield TV',
            format: 'APK',
            code: '82043',
            verified: false,
            installLabel: 'Google Play',
            iconClass: 'fa-list-check',
            iconImage: 'img/apps/smart-iptv.png',
            bgColor: 'from-blue-600 to-cyan-600',
            desc: 'Utilidad ligera para organizar enlaces de reproducciones y listas M3U en pantallas grandes sin lag.',
            guide: 'Instala Smart IPTV desde Google Play o usa el código de Downloader si está disponible. Abre la app y conecta tu lista M3U mediante la configuración de red rápida.',
            directUrl: 'https://play.google.com/store/apps/details?id=iptv.app',
        },
        {
            id: 'send-files-tv',
            name: 'Send Files to TV',
            categories: ['smarttv', 'herramientas'],
            platforms: ['androidtv'],
            tag: 'Móvil & Smart TV',
            format: 'APK',
            code: '50291',
            verified: false,
            installLabel: 'Google Play',
            iconClass: 'fa-share-nodes',
            iconImage: 'img/apps/send-files-tv.png',
            bgColor: 'from-emerald-600 to-teal-600',
            desc: 'Te permite enviar archivos APK y documentos desde tu teléfono celular a tu Smart TV a través de la red WiFi local en segundos.',
            guide: 'Instala esta app tanto en tu teléfono Android como en tu Smart TV para transferir archivos descargados en tu celular directamente a la TV.',
            directUrl: 'https://play.google.com/store/apps/details?id=com.yablio.sendfilestotv',
        },
        {
            id: 'mx-player-pro',
            name: 'MX Player Lite TV',
            categories: ['smarttv', 'reproductores'],
            platforms: ['androidtv'],
            tag: 'Optimizado TV',
            format: 'APK',
            code: '94012',
            verified: false,
            iconClass: 'fa-film',
            iconImage: 'img/apps/mx-player.png',
            bgColor: 'from-pink-600 to-rose-600',
            desc: 'Versión ligera de MX Player optimizada para hardware modesto en Smart TVs y decodificadores económicos.',
            guide: 'Recomendado si notas trabas en la reproducción de video en HD con reproductores tradicionales.',
            directUrl: null,
        },
        {
            id: 'plex',
            name: 'Plex',
            categories: ['smarttv', 'mobile', 'reproductores'],
            platforms: ['androidtv', 'lg', 'tizen', 'roku', 'mobile'],
            tag: 'Multiplataforma',
            format: 'APK · IPK · WGT · ZIP',
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-film',
            iconImage: 'img/apps/plex.png',
            bgColor: 'from-amber-500 to-yellow-600',
            desc: 'Cliente de streaming y servidor multimedia disponible en Android TV, LG webOS, Samsung Tizen, Roku y Android móvil.',
            guide: 'En Android TV/Fire TV puedes usar Google Play o el APK oficial. En LG usa LG Content Store; en Samsung, Smart Hub; en Roku, el Channel Store. No requiere código de Downloader.',
            directUrl: 'https://www.plex.tv/apps-devices/',
        },
        {
            id: 'jellyfin',
            name: 'Jellyfin',
            categories: ['smarttv', 'mobile', 'reproductores'],
            platforms: ['androidtv', 'roku', 'mobile'],
            tag: 'Código abierto',
            format: 'APK · ZIP',
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-server',
            iconImage: 'img/apps/jellyfin.png',
            bgColor: 'from-indigo-600 to-blue-700',
            desc: 'Cliente libre para tu servidor multimedia. Disponible para Android TV, Roku y Android móvil.',
            guide: 'Instala el cliente desde Google Play o F-Droid en Android, desde el Channel Store en Roku o descarga el APK oficial. No requiere código de Downloader.',
            directUrl: 'https://jellyfin.org/downloads/',
            downloads: [
                {
                    label: 'Android TV',
                    format: 'APK',
                    variant: 'Universal',
                    version: '0.19.10',
                    source: 'GitHub',
                    url: 'https://github.com/jellyfin/jellyfin-androidtv/releases/download/v0.19.10/jellyfin-androidtv-v0.19.10-release.apk',
                },
                {
                    label: 'Roku',
                    format: 'ZIP',
                    variant: 'Sideload',
                    version: '3.2.4',
                    source: 'GitHub',
                    url: 'https://github.com/jellyfin/jellyfin-roku/releases/download/3.2.4/jellyfin-roku.zip',
                },
                {
                    label: 'Android móvil',
                    format: 'APK',
                    variant: 'Libre',
                    version: '2.7.3',
                    source: 'GitHub',
                    url: 'https://github.com/jellyfin/jellyfin-android/releases/download/v2.7.3/jellyfin-android-v2.7.3-libre-release.apk',
                },
            ],
        },
        {
            id: 'emby',
            name: 'Emby',
            categories: ['smarttv', 'mobile', 'reproductores'],
            platforms: ['androidtv', 'lg', 'tizen', 'roku', 'mobile'],
            tag: 'Multiplataforma',
            format: 'APK · IPK · WGT · ZIP',
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-photo-film',
            iconImage: 'img/apps/emby.png',
            bgColor: 'from-emerald-600 to-green-700',
            desc: 'Cliente multimedia compatible con Android TV, LG webOS, Samsung Tizen, Roku y Android móvil.',
            guide: 'Busca Emby en la tienda de tu TV (LG Content Store, Samsung Smart Hub o Roku Channel Store) o descarga el APK para Android. No requiere código de Downloader.',
            directUrl: 'https://emby.media/download.html',
        },
        {
            id: 'kodi',
            name: 'Kodi',
            categories: ['smarttv', 'mobile', 'reproductores'],
            platforms: ['androidtv', 'mobile'],
            tag: 'Código abierto',
            format: 'APK',
            code: null,
            installLabel: 'APK oficial',
            iconClass: 'fa-play',
            iconImage: 'img/apps/kodi.png',
            bgColor: 'from-sky-600 to-blue-700',
            desc: 'Centro multimedia libre para Android TV y Android móvil. No está disponible para LG webOS, Tizen ni Roku.',
            guide: 'Descarga el APK oficial desde kodi.tv, habilita orígenes desconocidos e instálalo. No requiere código de Downloader.',
            directUrl: 'https://kodi.tv/download/android/',
            downloads: [
                {
                    label: 'Android TV / móvil',
                    format: 'APK',
                    variant: 'ARMv7',
                    version: '21.3',
                    source: 'Kodi',
                    url: 'https://mirrors.kodi.tv/releases/android/arm/kodi-21.3-Omega-armeabi-v7a.apk',
                },
            ],
        },
        {
            id: 'vlc-mobile',
            name: 'VLC for Android',
            categories: ['mobile', 'reproductores'],
            platforms: ['mobile'],
            tag: 'Android 5.0+',
            format: 'APK',
            code: null,
            installLabel: 'APK oficial',
            iconClass: 'fa-play',
            iconImage: 'img/apps/vlc.png',
            bgColor: 'from-orange-500 to-amber-600',
            desc: 'Reproductor de video y audio para Android con soporte para casi todos los formatos, subtítulos y transmisión en red.',
            guide: 'Descarga el APK desde el sitio oficial de VideoLAN, habilita "Instalar apps desconocidas" y abre el archivo. En móvil no se usa Downloader.',
            directUrl: 'https://www.videolan.org/vlc/download-android.html',
        },
        {
            id: 'mx-player-mobile',
            name: 'MX Player (Móvil)',
            categories: ['mobile', 'reproductores'],
            platforms: ['mobile'],
            tag: 'Android',
            format: 'APK',
            code: null,
            installLabel: 'Google Play',
            iconClass: 'fa-film',
            iconImage: 'img/apps/mx-player.png',
            bgColor: 'from-pink-600 to-rose-600',
            desc: 'Reproductor multimedia para Android con gestos, subtítulos y decodificación por hardware.',
            guide: 'Instala desde Google Play o descarga el APK desde el enlace oficial de la app. No requiere código de Downloader.',
            directUrl: 'https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.ad',
        },
        {
            id: 'send-files-mobile',
            name: 'Send Files to TV (Móvil)',
            categories: ['mobile', 'herramientas'],
            platforms: ['mobile'],
            tag: 'Móvil → TV',
            format: 'APK',
            code: null,
            installLabel: 'Google Play',
            iconClass: 'fa-share-nodes',
            iconImage: 'img/apps/send-files-tv.png',
            bgColor: 'from-emerald-600 to-teal-600',
            desc: 'Envía APKs, fotos y archivos desde tu móvil Android a tu Smart TV por WiFi local.',
            guide: 'Instala la app desde Google Play en el móvil y en la TV. Abre la app en ambos dispositivos, elige el archivo y envíalo. No requiere código de Downloader.',
            directUrl: 'https://play.google.com/store/apps/details?id=com.yablio.sendfilestotv',
        },
    ];

    /**
     * Precalcula el texto de búsqueda de cada app una sola vez.
     * Evita repetir el mismo trabajo en cada pulsación del buscador.
     */
    function buildSearchIndex() {
        apps.forEach((app) => {
            const downloadTerms = (app.downloads || []).flatMap((item) => [
                item.label,
                item.variant,
                item.format,
                item.version,
            ]);

            app.searchText = normalize([
                app.name,
                app.desc,
                app.tag,
                app.code,
                app.installLabel,
                categoryLabels[app.categories[0]],
                ...getPlatformNames(app),
                ...downloadTerms,
            ].join(' '));
        });
    }

    /* ======================================================================
       4. Estado y referencias del DOM
       ====================================================================== */
    const state = {
        category: 'all',
        platform: 'all',
        query: '',
    };

    const APP_VERSION = '2026.11.07.7';
    const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000;

    let els = {};
    let searchTimer = null;
    let toastTimer = null;
    let lastFocusedElement = null;
    let updateBannerShown = false;

    function cacheElements() {
        els = {
            grid: document.getElementById('appGrid'),
            emptyState: document.getElementById('emptyState'),
            emptyTitle: document.getElementById('emptyTitle'),
            emptyText: document.getElementById('emptyText'),
            resultsCount: document.getElementById('resultsCount'),
            search: document.getElementById('searchInput'),
            searchClear: document.getElementById('searchClear'),
            categoryBar: document.getElementById('categoryBar'),
            subcategoryWrapper: document.getElementById('subcategoryWrapper'),
            subcategoryBar: document.getElementById('subcategoryBar'),
            platformHint: document.getElementById('platformHint'),
            modal: document.getElementById('appModal'),
            modalIcon: document.getElementById('modalIcon'),
            modalTitle: document.getElementById('modalTitle'),
            modalTag: document.getElementById('modalTag'),
            modalFormat: document.getElementById('modalFormat'),
            modalFormatText: document.getElementById('modalFormatText'),
            modalDesc: document.getElementById('modalDesc'),
            modalGuide: document.getElementById('modalGuide'),
            modalCodeBox: document.getElementById('modalCodeBox'),
            modalCode: document.getElementById('modalCode'),
            modalCodeStatus: document.getElementById('modalCodeStatus'),
            modalCopyBtn: document.getElementById('modalCopyBtn'),
            modalStoreBox: document.getElementById('modalStoreBox'),
            modalStoreText: document.getElementById('modalStoreText'),
            modalStoreLink: document.getElementById('modalStoreLink'),
            modalDownloadsBox: document.getElementById('modalDownloadsBox'),
            modalDownloadsCount: document.getElementById('modalDownloadsCount'),
            modalDownloadsList: document.getElementById('modalDownloadsList'),
            modalDirectLink: document.getElementById('modalDirectLink'),
            modalDirectLinkLabel: document.getElementById('modalDirectLinkLabel'),
            modalCloseBtn: document.getElementById('modalCloseBtn'),
            updateBanner: document.getElementById('updateBanner'),
            directDownloadGrid: document.getElementById('directDownloadGrid'),
            directDownloadEmpty: document.getElementById('directDownloadEmpty'),
            officialDownloadList: document.getElementById('officialDownloadList'),
            privacyModal: document.getElementById('privacyModal'),
            toast: document.getElementById('toast'),
            toastMsg: document.getElementById('toastMsg'),
        };
    }

    /* ======================================================================
       5. Utilidades
       ====================================================================== */
    const HTML_ENTITIES = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
    }

    /** Normaliza texto: minúsculas y sin acentos, para búsquedas más tolerantes. */
    function normalize(value) {
        return String(value ?? '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function getPlatformNames(app) {
        return (app.platforms || [])
            .map((id) => platformConfig[id]?.label)
            .filter(Boolean);
    }

    /* ======================================================================
       6. Filtrado
       ====================================================================== */
    function getFilteredApps() {
        const query = normalize(state.query);

        return apps.filter((app) => {
            const matchesCategory =
                state.category === 'all' || app.categories.includes(state.category);
            if (!matchesCategory) return false;

            const matchesPlatform =
                state.platform === 'all' || app.platforms.includes(state.platform);
            if (!matchesPlatform) return false;

            if (!query) return true;
            return (app.searchText || '').includes(query);
        });
    }

    /* ======================================================================
       7. Render de tarjetas
       ====================================================================== */
    function createPlatformBadges(app) {
        const names = getPlatformNames(app);
        const icons = (app.platforms || [])
            .map((id) => platformConfig[id])
            .filter(Boolean)
            .map(
                (platform) =>
                    `<i class="${platform.icon} ${platform.color}" title="${escapeHtml(platform.label)}" aria-hidden="true"></i>`
            )
            .join('');

        return `
            <span class="flex items-center gap-1.5 text-[11px]" aria-hidden="true">${icons}</span>
            <span class="sr-only">Disponible en: ${escapeHtml(names.join(', '))}</span>
        `;
    }

    function createInstallBlock(app) {
        const format = app.format
            ? `<span class="install-format" data-format="${escapeHtml(app.format)}">Formato: <strong>${escapeHtml(app.format)}</strong></span>`
            : '';

        if (app.code) {
            const codeBadge =
                app.verified === false
                    ? '<span class="ml-1.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 align-middle">Sin verificar</span>'
                    : '';

            return `
                <div class="install-block">
                    <div class="min-w-0">
                        <span class="install-label">Código Downloader</span>
                        <span class="install-code">${escapeHtml(app.code)}</span>${codeBadge}
                        ${format}
                    </div>
                    <button type="button"
                            data-copy="${escapeHtml(app.code)}"
                            data-copy-label="Código"
                            class="btn btn-primary btn-sm shrink-0"
                            aria-label="Copiar código ${escapeHtml(app.code)} de ${escapeHtml(app.name)}">
                        <i class="fa-regular fa-copy" aria-hidden="true"></i> Copiar
                    </button>
                </div>
            `;
        }

        if (!app.directUrl) {
            return `
                <div class="install-block">
                    <div class="min-w-0">
                        <span class="install-label">Instalación</span>
                        <span class="text-xs font-semibold text-gray-400">Enlace pendiente de confirmar</span>
                        ${format}
                    </div>
                    <span class="px-2.5 py-1.5 rounded-lg bg-darkbg text-[11px] font-semibold text-gray-500 border border-darkborder shrink-0">
                        Próximamente
                    </span>
                </div>
            `;
        }

        const isFileDownload = Boolean(
            app.directUrl.startsWith('apps/') || /\.(apk|ipk|wgt|zip|rtf)$/i.test(app.directUrl)
        );

        return `
            <div class="install-block">
                <div class="min-w-0">
                    <span class="install-label">Instalación</span>
                    <span class="install-value">${escapeHtml(app.installLabel || (isFileDownload ? 'Descarga directa' : 'Enlace oficial'))}</span>
                    ${format}
                </div>
                <a href="${escapeHtml(app.directUrl)}"
                   ${isFileDownload ? 'download' : ''}
                   target="_blank"
                   rel="noopener noreferrer"
                   class="btn btn-success btn-sm shrink-0">
                    <i class="fa-solid ${isFileDownload ? 'fa-download' : 'fa-arrow-up-right-from-square'}" aria-hidden="true"></i> ${isFileDownload ? 'Descargar' : 'Abrir'}
                </a>
            </div>
        `;
    }

    function createCard(app) {
        const card = document.createElement('article');
        card.className = 'app-card';
        card.innerHTML = `
            <div class="flex items-start justify-between gap-3">
                <div class="relative w-11 h-11 rounded-xl bg-gradient-to-tr ${escapeHtml(app.bgColor)} flex items-center justify-center text-white text-lg shadow-md shrink-0" aria-hidden="true">
                    <i class="fa-solid ${escapeHtml(app.iconClass)}"></i>
                    ${app.iconImage ? `<img src="${escapeHtml(app.iconImage)}" alt="" width="28" height="28" loading="lazy" decoding="async" class="absolute inset-0 m-auto w-7 h-7 object-contain drop-shadow" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ''}
                </div>
                <div class="flex flex-col items-end gap-1 min-w-0">
                    <span class="app-tag">${escapeHtml(app.tag)}</span>
                    ${createPlatformBadges(app)}
                </div>
            </div>

            <h3 class="app-title">${escapeHtml(app.name)}</h3>
            <p class="app-desc">${escapeHtml(app.desc)}</p>

            <div class="mt-auto pt-4">
                ${createInstallBlock(app)}

                <button type="button"
                        data-app-id="${escapeHtml(app.id)}"
                        class="card-action">
                    <i class="fa-solid fa-circle-info text-brand-400" aria-hidden="true"></i> Ver guía e instalación
                </button>
            </div>
        `;
        return card;
    }

    function createAppIconMarkup(app, size = 'md') {
        const sizes = {
            sm: { box: 'w-9 h-9 rounded-lg text-base', image: 'w-6 h-6' },
            md: { box: 'w-11 h-11 rounded-xl text-lg', image: 'w-7 h-7' },
        };
        const selected = sizes[size] || sizes.md;

        return `
            <div class="relative ${selected.box} bg-gradient-to-tr ${escapeHtml(app.bgColor)} flex items-center justify-center text-white font-bold shadow-md shrink-0" aria-hidden="true">
                <i class="fa-solid ${escapeHtml(app.iconClass)}"></i>
                ${app.iconImage ? `<img src="${escapeHtml(app.iconImage)}" alt="" width="28" height="28" loading="lazy" decoding="async" class="absolute inset-0 m-auto ${selected.image} object-contain drop-shadow" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ''}
            </div>
        `;
    }

    function createDirectDownloadCard(app) {
        const card = document.createElement('article');
        card.className = 'download-card';
        card.dataset.downloadAppId = app.id;

        const platformNames = (app.platforms || [])
            .map((id) => platformConfig[id]?.short || id)
            .join(' · ');

        card.innerHTML = `
            <div class="flex items-start gap-3">
                ${createAppIconMarkup(app)}
                <div class="min-w-0 flex-1">
                    <h3 class="text-base font-bold text-white">${escapeHtml(app.name)}</h3>
                    <p class="text-[11px] text-gray-500 mt-0.5">${escapeHtml(platformNames)}</p>
                </div>
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shrink-0">Directo</span>
            </div>

            <div class="space-y-2 max-h-96 overflow-y-auto pr-1">
                ${(app.downloads || []).map((item) => `
                    <a href="${escapeHtml(item.url)}"
                       download
                       target="_blank"
                       rel="noopener noreferrer"
                       data-direct-download
                       data-download-format="${escapeHtml(item.format)}"
                       aria-label="Descargar ${escapeHtml(item.label)} de ${escapeHtml(app.name)} en formato ${escapeHtml(item.format)}"
                       class="download-row">
                        <span class="min-w-0">
                            <span class="download-row-title">${escapeHtml(item.label)}</span>
                            <span class="download-row-meta">
                                ${escapeHtml(item.variant)}${item.version ? ` · v${escapeHtml(item.version)}` : ''}${item.size ? ` · ${escapeHtml(item.size)}` : ''}${item.source ? ` · ${escapeHtml(item.source)}` : ''}
                            </span>
                        </span>
                        <span class="download-format">
                            ${escapeHtml(item.format)} <i class="fa-solid fa-download" aria-hidden="true"></i>
                        </span>
                    </a>
                `).join('')}
            </div>

            ${app.directUrl ? `
                <a href="${escapeHtml(app.directUrl)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-white transition-colors">
                    <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Página oficial
                </a>
            ` : ''}
        `;

        return card;
    }

    function createOfficialDownloadItem(app) {
        const link = document.createElement('a');
        link.href = app.directUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.dataset.officialAppId = app.id;
        link.className = 'flex items-center gap-3 p-3 rounded-xl bg-darkcard/70 hover:bg-darkcard border border-darkborder hover:border-emerald-500/40 transition-colors group/official';
        link.innerHTML = `
            ${createAppIconMarkup(app, 'sm')}
            <span class="min-w-0 flex-1">
                <span class="block text-xs font-bold text-white truncate">${escapeHtml(app.name)}</span>
                <span class="block text-[10px] text-gray-500 truncate">${escapeHtml(app.installLabel || 'Página oficial')}</span>
            </span>
            <i class="fa-solid fa-arrow-up-right-from-square text-gray-500 group-hover/official:text-emerald-400 transition-colors" aria-hidden="true"></i>
        `;
        return link;
    }

    function renderDirectDownloads() {
        const directApps = apps.filter(
            (app) => Array.isArray(app.downloads) && app.downloads.length > 0
        );
        const officialApps = apps.filter(
            (app) =>
                app.directUrl &&
                !(Array.isArray(app.downloads) && app.downloads.length > 0)
        );

        if (els.directDownloadGrid) {
            els.directDownloadGrid.replaceChildren(...directApps.map(createDirectDownloadCard));
            els.directDownloadEmpty.hidden = directApps.length > 0;
        }

        if (els.officialDownloadList) {
            els.officialDownloadList.replaceChildren(...officialApps.map(createOfficialDownloadItem));
        }
    }

    /** Pinta el total de apps por categoría en los botones del filtro. */
    function updateCategoryCounts() {
        const counts = { all: apps.length };

        apps.forEach((app) => {
            app.categories.forEach((category) => {
                counts[category] = (counts[category] || 0) + 1;
            });
        });

        document.querySelectorAll('[data-count]').forEach((element) => {
            element.textContent = counts[element.dataset.count] ?? 0;
        });

        const statApps = document.getElementById('statApps');
        if (statApps) statApps.textContent = apps.length;
    }

    function render() {
        const filtered = getFilteredApps();
        const hasResults = filtered.length > 0;

        els.grid.replaceChildren(...filtered.map(createCard));
        els.grid.hidden = !hasResults;
        els.emptyState.hidden = hasResults;

        els.resultsCount.textContent = hasResults
            ? `${filtered.length} ${filtered.length === 1 ? 'app encontrada' : 'apps encontradas'}`
            : 'Sin resultados';

        if (!hasResults) {
            const platformLabel =
                state.platform !== 'all' ? platformConfig[state.platform]?.label : '';

            if (state.query) {
                els.emptyTitle.textContent = 'No se encontraron aplicaciones';
                els.emptyText.textContent = 'Intenta buscar con otro término o limpia la búsqueda.';
            } else if (platformLabel) {
                els.emptyTitle.textContent = `Aún no hay apps para ${platformLabel}`;
                els.emptyText.textContent = 'Prueba con otra plataforma o selecciona "Todas".';
            } else {
                els.emptyTitle.textContent = 'No se encontraron aplicaciones';
                els.emptyText.textContent =
                    'Intenta buscar con otro término o selecciona otra categoría.';
            }
        }
    }

    /* ======================================================================
       8. Subcategorías de plataforma
       ====================================================================== */
    function syncPlatformButtons() {
        els.subcategoryBar.querySelectorAll('[data-platform]').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.platform === state.platform));
        });
    }

    function updatePlatformHint() {
        const hint = platformHints[state.category]?.[state.platform] || '';
        els.platformHint.hidden = !hint;

        if (hint) {
            els.platformHint.innerHTML =
                '<i class="fa-solid fa-circle-info mr-1.5 text-brand-400" aria-hidden="true"></i>' +
                escapeHtml(hint);
        }
    }

    function renderSubcategories() {
        const list = subcategoryConfig[state.category];

        if (!list) {
            els.subcategoryWrapper.hidden = true;
            els.subcategoryBar.replaceChildren();
            els.platformHint.hidden = true;
            return;
        }

        els.subcategoryWrapper.hidden = false;
        els.subcategoryBar.replaceChildren(
            ...list.map((item) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.platform = item.id;
                button.className = 'subcat-btn';
                button.innerHTML = `<i class="${item.icon} ${item.color}" aria-hidden="true"></i> ${escapeHtml(item.label)}`;
                return button;
            })
        );

        syncPlatformButtons();
        updatePlatformHint();
    }

    function setPlatform(platform) {
        state.platform = platform;
        syncPlatformButtons();
        updatePlatformHint();
        render();
    }

    /* ======================================================================
       9. Búsqueda y filtros
       ====================================================================== */
    function updateSearch() {
        state.query = els.search.value.trim();
        els.searchClear.hidden = state.query.length === 0;
        render();
    }

    function clearSearch() {
        els.search.value = '';
        updateSearch();
        els.search.focus();
    }

    function setCategory(category, { focus = false } = {}) {
        state.category = category;
        state.platform = 'all';

        els.categoryBar.querySelectorAll('[data-category]').forEach((button) => {
            const isActive = button.dataset.category === category;
            button.setAttribute('aria-pressed', String(isActive));

            if (isActive && focus) button.focus();
        });

        renderSubcategories();
        render();
    }

    function resetFilters({ focus = false } = {}) {
        els.search.value = '';
        state.query = '';
        els.searchClear.hidden = true;
        setCategory('all', { focus });
        if (focus) els.search.focus();
    }

    /* ======================================================================
       10. Modal
       ====================================================================== */
    function openModal(appId) {
        const app = apps.find((item) => item.id === appId);
        if (!app) return;

        const hasCode = Boolean(app.code);

        lastFocusedElement = document.activeElement;

        els.modalTitle.textContent = app.name;
        els.modalTag.textContent = app.tag;
        els.modalFormat.hidden = !app.format;
        els.modalFormatText.textContent = app.format || '';
        els.modalDesc.textContent = app.desc;
        els.modalGuide.textContent = app.guide;

        els.modalIcon.className = `relative w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.bgColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0`;
        els.modalIcon.replaceChildren();
        const icon = document.createElement('i');
        icon.className = `fa-solid ${app.iconClass}`;
        icon.setAttribute('aria-hidden', 'true');
        els.modalIcon.appendChild(icon);

        if (app.iconImage) {
            const iconImage = document.createElement('img');
            iconImage.src = app.iconImage;
            iconImage.alt = '';
            iconImage.setAttribute('aria-hidden', 'true');
            iconImage.className = 'absolute inset-0 m-auto w-9 h-9 object-contain drop-shadow';
            iconImage.addEventListener('load', () => {
                icon.style.display = 'none';
            });
            iconImage.addEventListener('error', () => {
                iconImage.remove();
            });
            els.modalIcon.appendChild(iconImage);
        }

        els.modalCodeBox.hidden = !hasCode;

        if (hasCode) {
            els.modalCode.textContent = app.code;
            els.modalCopyBtn.dataset.copy = app.code;
            els.modalCopyBtn.dataset.copyLabel = 'Código';
            els.modalCopyBtn.setAttribute(
                'aria-label',
                `Copiar código ${app.code} de ${app.name}`
            );
        }

        els.modalCodeStatus.hidden = !hasCode || app.verified !== false;

        const hasLink = Boolean(app.directUrl);

        els.modalStoreBox.hidden = hasCode || !hasLink;
        els.modalStoreLink.hidden = !hasLink;
        els.modalDirectLink.hidden = !hasLink;

        if (!hasCode) {
            els.modalStoreText.textContent = hasLink
                ? app.installLabel || 'Enlace oficial'
                : 'Enlace pendiente de confirmar';
        }

        if (hasLink) {
            els.modalStoreLink.href = app.directUrl;
            els.modalDirectLink.href = app.directUrl;
        }

        // Descargas directas en el modal
        const hasDownloads = Array.isArray(app.downloads) && app.downloads.length > 0;
        if (els.modalDownloadsBox) {
            els.modalDownloadsBox.hidden = !hasDownloads;
            if (hasDownloads && els.modalDownloadsList) {
                if (els.modalDownloadsCount) {
                    els.modalDownloadsCount.textContent = `${app.downloads.length} ${
                        app.downloads.length === 1 ? 'opción' : 'opciones'
                    }`;
                }
                els.modalDownloadsList.replaceChildren(
                    ...app.downloads.map((item) => {
                        const a = document.createElement('a');
                        a.href = item.url;
                        a.download = '';
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        a.className =
                            'flex items-center justify-between gap-3 p-2.5 rounded-lg bg-darkbg/80 border border-darkborder hover:border-emerald-500/50 hover:bg-darkbg transition-colors group/mdown';
                        a.innerHTML = `
                            <span class="min-w-0">
                                <span class="block text-xs font-bold text-white group-hover/mdown:text-emerald-400 transition-colors">${escapeHtml(item.label)}</span>
                                <span class="block text-[10px] text-gray-400 mt-0.5">
                                    ${escapeHtml(item.variant)}${item.version ? ` · v${escapeHtml(item.version)}` : ''}${item.size ? ` · ${escapeHtml(item.size)}` : ''}
                                </span>
                            </span>
                            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-600 group-hover/mdown:bg-emerald-500 text-[10px] font-bold text-white shrink-0">
                                ${escapeHtml(item.format)} <i class="fa-solid fa-download" aria-hidden="true"></i>
                            </span>
                        `;
                        return a;
                    })
                );
            }
        }

        const isDirectFile = Boolean(
            app.directUrl && (app.directUrl.startsWith('apps/') || /\.(apk|ipk|wgt|zip|rtf)$/i.test(app.directUrl))
        );
        if (isDirectFile) {
            els.modalDirectLink.setAttribute('download', '');
        } else {
            els.modalDirectLink.removeAttribute('download');
        }

        els.modalDirectLinkLabel.textContent = isDirectFile
            ? `Descargar ${app.format || 'archivo'}`
            : hasCode
              ? app.installLabel
                  ? `Abrir ${app.installLabel}`
                  : 'Página oficial'
              : 'Abrir enlace oficial';

        els.modal.hidden = false;
        document.body.classList.add('modal-open');
        els.modalCloseBtn.focus();
    }

    function closeModal() {
        if (els.modal.hidden) return;

        els.modal.hidden = true;
        if (els.privacyModal.hidden) {
            document.body.classList.remove('modal-open');
        }

        restoreFocus();
    }

    /* ======================================================================
       10b. Modal de privacidad
       ====================================================================== */
    function openPrivacy() {
        lastFocusedElement = document.activeElement;
        els.privacyModal.hidden = false;
        document.body.classList.add('modal-open');

        const closeBtn = els.privacyModal.querySelector('[data-action="close-privacy"]');
        if (closeBtn) closeBtn.focus();
    }

    function closePrivacy() {
        if (els.privacyModal.hidden) return;

        els.privacyModal.hidden = true;
        if (els.modal.hidden) {
            document.body.classList.remove('modal-open');
        }

        restoreFocus();
    }

    function restoreFocus() {
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
        lastFocusedElement = null;
    }

    function trapFocus(event, container) {
        if (event.key !== 'Tab') return;

        const focusable = Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => element.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    /* ======================================================================
       11. Portapapeles
       ====================================================================== */
    async function copyToClipboard(text) {
        // API moderna (requiere contexto seguro: https o localhost)
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                /* Continúa con el fallback */
            }
        }

        // Fallback para file:// o navegadores/TV antiguos
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.top = '-9999px';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            const copied = document.execCommand('copy');
            textarea.remove();
            return copied;
        } catch {
            return false;
        }
    }

    async function copyCode(code, label = 'Código') {
        if (!code) return;

        const copied = await copyToClipboard(code);
        showToast(
            copied
                ? `${label} ${code} copiado al portapapeles`
                : `No se pudo copiar automáticamente. ${label}: ${code}`
        );
    }

    /* ======================================================================
       12. Toast
       ====================================================================== */
    function showToast(message) {
        els.toastMsg.textContent = message;
        window.clearTimeout(toastTimer);

        els.toast.classList.remove('translate-y-20', 'opacity-0');
        els.toast.classList.add('translate-y-0', 'opacity-100');

        toastTimer = window.setTimeout(() => {
            els.toast.classList.remove('translate-y-0', 'opacity-100');
            els.toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }

    /* ======================================================================
       12b. Actualización de la web
       ====================================================================== */
    function showUpdateBanner(version) {
        if (!els.updateBanner || updateBannerShown) return;

        updateBannerShown = true;
        const detail = els.updateBanner.querySelector('[data-update-version]');
        if (detail) {
            detail.textContent = version
                ? `Versión ${version} disponible. Actualiza para ver los cambios.`
                : 'Actualiza la página para ver los últimos cambios.';
        }
        els.updateBanner.hidden = false;
    }

    async function checkForWebUpdate() {
        if (!els.updateBanner) return;
        if (!/^https?:$/.test(window.location.protocol)) return;

        try {
            const response = await fetch(`version.json?t=${Date.now()}`, {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' },
            });
            if (!response.ok) return;

            const data = await response.json();
            if (data.version && data.version !== APP_VERSION) {
                showUpdateBanner(data.version);
            }
        } catch {
            /* Sin conexión o version.json no disponible */
        }
    }

    function reloadForUpdate() {
        const url = new URL(window.location.href);
        url.searchParams.set('v', Date.now().toString());
        window.location.replace(url.toString());
    }

    /* ======================================================================
       13. Eventos
       ====================================================================== */
    function bindEvents() {
        // Búsqueda con debounce
        els.search.addEventListener('input', () => {
            window.clearTimeout(searchTimer);
            searchTimer = window.setTimeout(updateSearch, 120);
        });

        els.search.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && els.search.value) {
                event.preventDefault();
                clearSearch();
            }
        });

        if (els.searchClear) {
            els.searchClear.addEventListener('click', clearSearch);
        }

        // Categorías principales
        els.categoryBar.addEventListener('click', (event) => {
            const button = event.target.closest('[data-category]');
            if (button) setCategory(button.dataset.category);
        });

        // Subcategorías de plataforma
        els.subcategoryBar.addEventListener('click', (event) => {
            const button = event.target.closest('[data-platform]');
            if (button) setPlatform(button.dataset.platform);
        });

        // Abrir modal desde las tarjetas
        els.grid.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-app-id]');
            if (trigger) openModal(trigger.dataset.appId);
        });

        // Acciones globales y copiado (delegación de eventos)
        document.addEventListener('click', (event) => {
            const actionElement = event.target.closest('[data-action]');
            if (actionElement) {
                const action = actionElement.dataset.action;

                if (action === 'reset') resetFilters({ focus: true });
                if (action === 'close-modal') closeModal();
                if (action === 'close-privacy') closePrivacy();
                if (action === 'privacy') openPrivacy();
                if (action === 'reload-app') reloadForUpdate();
                return;
            }

            const copyElement = event.target.closest('[data-copy]');
            if (copyElement) {
                copyCode(copyElement.dataset.copy, copyElement.dataset.copyLabel || 'Código');
            }
        });

        // Cerrar modales con Escape y atrapar el foco
        document.addEventListener('keydown', (event) => {
            const activeModal = !els.privacyModal.hidden
                ? els.privacyModal
                : !els.modal.hidden
                  ? els.modal
                  : null;

            if (!activeModal) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                if (activeModal === els.privacyModal) closePrivacy();
                else closeModal();
                return;
            }

            trapFocus(event, activeModal);
        });

        // Cerrar modales al hacer clic en el fondo
        els.modal.addEventListener('click', (event) => {
            if (event.target === els.modal) closeModal();
        });

        els.privacyModal.addEventListener('click', (event) => {
            if (event.target === els.privacyModal) closePrivacy();
        });

        // Sincroniza el buscador si el usuario vuelve con el historial
        window.addEventListener('pageshow', () => {
            if (els.search.value) updateSearch();
        });
    }

    /* ======================================================================
       14. Inicialización
       ====================================================================== */
    const SCHEMA_OS = {
        androidtv: 'Android TV',
        lg: 'webOS',
        tizen: 'Tizen',
        roku: 'Roku OS',
        mobile: 'Android',
    };

    // Genera un ItemList de schema.org con las apps del catálogo para SEO.
    function injectAppListSchema() {
        if (document.getElementById('appListSchema')) return;

        const itemListElement = apps.map((app, index) => {
            const operatingSystems = [...new Set(
                app.platforms.map((platform) => SCHEMA_OS[platform]).filter(Boolean)
            )];

            return {
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'SoftwareApplication',
                    name: app.name,
                    description: app.desc,
                    applicationCategory: 'MultimediaApplication',
                    operatingSystem: operatingSystems.join(', '),
                    ...(app.directUrl ? { url: app.directUrl } : {}),
                },
            };
        });

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'appListSchema';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Apps para Smart TV, Roku y Android',
            itemListElement,
        });
        document.head.appendChild(script);
    }

    function init() {
        cacheElements();
        if (!els.grid || !els.emptyState) return;

        bindEvents();
        renderDirectDownloads();
        buildSearchIndex();
        injectAppListSchema();
        updateCategoryCounts();
        setCategory('all');
        els.searchClear.hidden = true;

        if (/^https?:$/.test(window.location.protocol)) {
            checkForWebUpdate();
            window.setInterval(checkForWebUpdate, UPDATE_CHECK_INTERVAL);
            window.addEventListener('focus', checkForWebUpdate);
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) checkForWebUpdate();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

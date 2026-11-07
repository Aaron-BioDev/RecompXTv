/**
 * RecompXtv - Configuración, datos y lógica de la interfaz.
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
       1. La configuración de Tailwind (Play CDN) se define en index.html.
          Este archivo solo contiene los datos y la lógica de la interfaz.
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
                    source: 'GitHub Releases',
                    url: 'https://github.com/NuvioMedia/NuvioTV/releases/download/1.0.0/app-full-universal-release.apk',
                },
                {
                    label: 'LG webOS',
                    format: 'IPK',
                    variant: 'webOS',
                    version: '1.3.7',
                    source: 'GitHub Releases',
                    url: 'https://github.com/NuvioMedia/NuvioTVSmart/releases/download/1.3.7/NuvioTV-webOS-1.3.7.ipk',
                },
                {
                    label: 'Samsung Tizen',
                    format: 'WGT',
                    variant: 'Tizen',
                    version: '1.3.7',
                    source: 'GitHub Releases',
                    url: 'https://github.com/NuvioMedia/NuvioTVSmart/releases/download/1.3.7/NuvioTV-Tizen-1.3.7.wgt',
                },
                {
                    label: 'Android móvil',
                    format: 'APK',
                    variant: 'ARM64',
                    version: '0.6.9-beta',
                    source: 'GitHub Releases',
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
            name: 'Xuper TV',
            categories: ['smarttv'],
            platforms: ['androidtv'],
            tag: 'Android TV / Firestick',
            format: 'APK',
            code: '74829',
            verified: false,
            installLabel: 'Google Play',
            iconClass: 'fa-tv',
            iconImage: 'img/apps/xuper-tv.png',
            bgColor: 'from-purple-600 to-indigo-600',
            desc: 'Aplicación optimizada para streaming en Smart TV y TV Boxes. Interfaz ligera diseñada específicamente para control remoto sin necesidad de mouse.',
            guide: 'Abre Downloader en tu Firestick o TV Box, ingresa el código que aparece en la tarjeta y pulsa Go. Permite la instalación de orígenes desconocidos si tu sistema lo solicita. También puedes abrir la ficha oficial de Google Play desde el enlace.',
            directUrl: 'https://play.google.com/store/apps/details?id=com.xuper.tv',
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
                    source: 'GitHub Releases',
                    url: 'https://github.com/jellyfin/jellyfin-androidtv/releases/download/v0.19.10/jellyfin-androidtv-v0.19.10-release.apk',
                },
                {
                    label: 'Roku',
                    format: 'ZIP',
                    variant: 'Sideload',
                    version: '3.2.4',
                    source: 'GitHub Releases',
                    url: 'https://github.com/jellyfin/jellyfin-roku/releases/download/3.2.4/jellyfin-roku.zip',
                },
                {
                    label: 'Android móvil',
                    format: 'APK',
                    variant: 'Libre',
                    version: '2.7.3',
                    source: 'GitHub Releases',
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

    /* ======================================================================
       4. Estado y referencias del DOM
       ====================================================================== */
    const state = {
        category: 'all',
        platform: 'all',
        query: '',
    };

    const APP_VERSION = '2026.11.07.1';
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
            adblockModal: document.getElementById('adblockModal'),
            adblockCard: document.getElementById('adblockCard'),
            adblockCheckBtn: document.getElementById('adblockCheckBtn'),
            adblockStatusMsg: document.getElementById('adblockStatusMsg'),
            braveDetectedBadge: document.getElementById('braveDetectedBadge'),
            braveGuideBox: document.getElementById('braveGuideBox'),
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

            return [
                app.name,
                app.desc,
                app.tag,
                app.code,
                app.installLabel,
                categoryLabels[app.categories[0]],
                ...getPlatformNames(app),
            ].some((field) => normalize(field).includes(query));
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
        if (app.code) {
            const codeBadge =
                app.verified === false
                    ? '<span class="ml-2 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 align-middle">Sin verificar</span>'
                    : '';

            return `
                <div class="flex items-center justify-between gap-2 mb-3 bg-darkbg/60 p-2.5 rounded-xl border border-darkborder">
                    <div class="min-w-0">
                        <span class="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Código Downloader:</span>
                        <span class="text-lg font-mono font-extrabold text-brand-400">${escapeHtml(app.code)}</span>${codeBadge}
                        ${app.format ? `<span class="text-[10px] text-gray-500 block mt-0.5" data-format="${escapeHtml(app.format)}">Formato: <span class="text-gray-300 font-semibold">${escapeHtml(app.format)}</span></span>` : ''}
                    </div>
                    <button type="button"
                            data-copy="${escapeHtml(app.code)}"
                            data-copy-label="Código"
                            class="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                            aria-label="Copiar código ${escapeHtml(app.code)} de ${escapeHtml(app.name)}">
                        <i class="fa-regular fa-copy" aria-hidden="true"></i> Copiar
                    </button>
                </div>
            `;
        }

        if (!app.directUrl) {
            return `
                <div class="flex items-center justify-between gap-2 mb-3 bg-darkbg/60 p-2.5 rounded-xl border border-darkborder">
                    <div class="min-w-0">
                        <span class="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Instalación:</span>
                        <span class="text-xs font-semibold text-gray-400">Enlace pendiente de confirmar</span>
                        ${app.format ? `<span class="text-[10px] text-gray-500 block mt-0.5" data-format="${escapeHtml(app.format)}">Formato: <span class="text-gray-300 font-semibold">${escapeHtml(app.format)}</span></span>` : ''}
                    </div>
                    <span class="px-3 py-1.5 rounded-lg bg-darkbg text-[11px] font-semibold text-gray-500 border border-darkborder shrink-0">
                        Próximamente
                    </span>
                </div>
            `;
        }

        return `
            <div class="flex items-center justify-between gap-2 mb-3 bg-darkbg/60 p-2.5 rounded-xl border border-darkborder">
                <div class="min-w-0">
                    <span class="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Instalación:</span>
                    <span class="text-xs font-semibold text-emerald-400">${escapeHtml(app.installLabel || 'Enlace oficial')}</span>
                    ${app.format ? `<span class="text-[10px] text-gray-500 block mt-0.5" data-format="${escapeHtml(app.format)}">Formato: <span class="text-gray-300 font-semibold">${escapeHtml(app.format)}</span></span>` : ''}
                </div>
                <a href="${escapeHtml(app.directUrl)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Abrir
                </a>
            </div>
        `;
    }

    function createCard(app) {
        const card = document.createElement('article');
        card.className = 'glass-card rounded-2xl p-5 flex flex-col justify-between relative group';
        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-3 mb-4">
                    <div class="relative w-12 h-12 rounded-xl bg-gradient-to-tr ${escapeHtml(app.bgColor)} flex items-center justify-center text-white text-xl shadow-md shrink-0" aria-hidden="true">
                        <i class="fa-solid ${escapeHtml(app.iconClass)}"></i>
                        ${app.iconImage ? `<img src="${escapeHtml(app.iconImage)}" alt="" class="absolute inset-0 m-auto w-8 h-8 object-contain drop-shadow" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ''}
                    </div>
                    <div class="flex flex-col items-end gap-1.5 min-w-0">
                        <span class="px-2.5 py-1 rounded-md bg-darkbg/80 text-gray-300 text-[11px] font-medium border border-darkborder text-right">
                            ${escapeHtml(app.tag)}
                        </span>
                        ${createPlatformBadges(app)}
                    </div>
                </div>

                <h3 class="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">${escapeHtml(app.name)}</h3>
                <p class="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">${escapeHtml(app.desc)}</p>
            </div>

            <div class="mt-5 pt-4 border-t border-darkborder/60">
                ${createInstallBlock(app)}

                <button type="button"
                        data-app-id="${escapeHtml(app.id)}"
                        class="w-full py-2 rounded-xl bg-darkcard hover:bg-gray-800 text-xs font-semibold text-gray-300 border border-darkborder hover:border-gray-600 transition-colors flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-circle-info text-brand-400" aria-hidden="true"></i> Ver Guía e Instalación
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
                ${app.iconImage ? `<img src="${escapeHtml(app.iconImage)}" alt="" class="absolute inset-0 m-auto ${selected.image} object-contain drop-shadow" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ''}
            </div>
        `;
    }

    function createDirectDownloadCard(app) {
        const card = document.createElement('article');
        card.className = 'glass-card rounded-2xl p-5 flex flex-col gap-4';
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

            <div class="space-y-2">
                ${(app.downloads || []).map((item) => `
                    <a href="${escapeHtml(item.url)}"
                       target="_blank"
                       rel="noopener noreferrer"
                       data-direct-download
                       data-download-format="${escapeHtml(item.format)}"
                       aria-label="Descargar ${escapeHtml(item.label)} de ${escapeHtml(app.name)} en formato ${escapeHtml(item.format)}"
                       class="flex items-center justify-between gap-3 p-3 rounded-xl bg-darkbg/70 border border-darkborder hover:border-emerald-500/50 hover:bg-darkbg transition-colors group/download">
                        <span class="min-w-0">
                            <span class="block text-xs font-bold text-white">${escapeHtml(item.label)}</span>
                            <span class="block text-[10px] text-gray-500 mt-0.5">
                                ${escapeHtml(item.variant)}${item.version ? ` · v${escapeHtml(item.version)}` : ''}${item.source ? ` · ${escapeHtml(item.source)}` : ''}
                            </span>
                        </span>
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600 group-hover/download:bg-emerald-500 text-[10px] font-bold text-white shrink-0">
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
            const isActive = button.dataset.platform === state.platform;
            button.setAttribute('aria-pressed', String(isActive));
            button.classList.toggle('bg-brand-600', isActive);
            button.classList.toggle('text-white', isActive);
            button.classList.toggle('border-brand-500', isActive);
            button.classList.toggle('bg-darkcard', !isActive);
            button.classList.toggle('text-gray-400', !isActive);
            button.classList.toggle('border-darkborder', !isActive);
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
                button.className =
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all';
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
            button.classList.toggle('bg-brand-600', isActive);
            button.classList.toggle('text-white', isActive);
            button.classList.toggle('bg-darkcard', !isActive);
            button.classList.toggle('text-gray-400', !isActive);

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

        els.modalDirectLinkLabel.textContent = hasCode
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
        if (els.privacyModal.hidden && (!els.adblockModal || els.adblockModal.hidden)) {
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
        if (els.modal.hidden && (!els.adblockModal || els.adblockModal.hidden)) {
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
       12c. Anti-Adblock y Detección de Brave Shields
       ====================================================================== */
    let isAdblockOpen = false;

    async function detectIsBrave() {
        try {
            if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
                return Boolean(await navigator.brave.isBrave());
            }
        } catch {
            /* Error en API de Brave */
        }
        return false;
    }

    function checkDomBait() {
        try {
            const bait = document.createElement('div');
            bait.className = 'ad-banner adsbox ad_unit ad-zone banner-ad pub_300x250 textads text-ad';
            bait.style.cssText =
                'position:absolute!important;top:-9999px!important;left:-9999px!important;width:100px!important;height:100px!important;pointer-events:none!important;';
            bait.setAttribute('aria-hidden', 'true');
            document.body.appendChild(bait);

            const computed = window.getComputedStyle(bait);
            const isBlocked =
                bait.offsetParent === null ||
                bait.offsetHeight === 0 ||
                bait.offsetWidth === 0 ||
                computed.display === 'none' ||
                computed.visibility === 'hidden';

            bait.remove();
            return isBlocked;
        } catch {
            return false;
        }
    }

    async function checkNetworkBait() {
        if (navigator.onLine === false) return false;
        try {
            // URL publicitaria de referencia que es bloqueada por EasyList, uBlock y Brave Shields
            const baitUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            await fetch(baitUrl, {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store',
            });
            return false;
        } catch {
            return true;
        }
    }

    function checkScriptError() {
        return Boolean(window.__adsterraBlocked);
    }

    async function verifyAdBlockActive() {
        const isDom = checkDomBait();
        const isScript = checkScriptError();
        const isNet = await checkNetworkBait();
        return isDom || isScript || isNet;
    }

    function showAdblockModal(isBrave) {
        if (!els.adblockModal) return;
        isAdblockOpen = true;
        els.adblockModal.hidden = false;
        document.body.classList.add('modal-open');

        if (els.braveDetectedBadge) {
            els.braveDetectedBadge.hidden = !isBrave;
        }

        if (isBrave && els.braveGuideBox) {
            els.braveGuideBox.classList.add('border-orange-500/60', 'bg-orange-500/10');
        }

        if (els.adblockCheckBtn) {
            els.adblockCheckBtn.focus();
        }
    }

    function hideAdblockModal() {
        if (!els.adblockModal || els.adblockModal.hidden) return;
        isAdblockOpen = false;
        els.adblockModal.hidden = true;

        if (els.modal.hidden && els.privacyModal.hidden) {
            document.body.classList.remove('modal-open');
        }

        if (els.adblockStatusMsg) {
            els.adblockStatusMsg.hidden = true;
            els.adblockStatusMsg.textContent = '';
        }
    }

    async function handleAdblockCheck() {
        if (!els.adblockCheckBtn) return;

        const originalHtml = els.adblockCheckBtn.innerHTML;
        els.adblockCheckBtn.disabled = true;
        els.adblockCheckBtn.innerHTML =
            '<i class="fa-solid fa-circle-notch fa-spin mr-2" aria-hidden="true"></i> Comprobando bloqueador...';

        await new Promise((resolve) => setTimeout(resolve, 500));

        const stillBlocked = await verifyAdBlockActive();

        els.adblockCheckBtn.disabled = false;
        els.adblockCheckBtn.innerHTML = originalHtml;

        if (stillBlocked) {
            if (els.adblockCard) {
                els.adblockCard.classList.remove('animate-shake');
                void els.adblockCard.offsetWidth; // reiniciar animación
                els.adblockCard.classList.add('animate-shake');
            }

            if (els.adblockStatusMsg) {
                els.adblockStatusMsg.hidden = false;
                els.adblockStatusMsg.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation mr-1.5" aria-hidden="true"></i> El bloqueador sigue activo. Recuerda apagar los <strong>Escudos de Brave (Shields DOWN)</strong> o pausar tu extensión y vuelve a pulsar aquí.';
            }
        } else {
            hideAdblockModal();
            showToast('¡Gracias por apoyar a RecompXtv! Ya puedes navegar.');
        }
    }

    async function initAdblockDetector() {
        // Breve espera para que los estilos y peticiones del navegador se inicialicen
        await new Promise((resolve) => setTimeout(resolve, 350));

        const isBrave = await detectIsBrave();
        const isBlocked = await verifyAdBlockActive();

        if (isBlocked) {
            showAdblockModal(isBrave);
        }
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

        // Botón de comprobación del Anti-Adblock
        if (els.adblockCheckBtn) {
            els.adblockCheckBtn.addEventListener('click', handleAdblockCheck);
        }

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
            const activeModal = !els.adblockModal?.hidden
                ? els.adblockModal
                : !els.privacyModal.hidden
                  ? els.privacyModal
                  : !els.modal.hidden
                    ? els.modal
                    : null;

            if (!activeModal) return;

            if (event.key === 'Escape') {
                if (activeModal === els.adblockModal) {
                    event.preventDefault();
                    return;
                }
                event.preventDefault();
                if (activeModal === els.privacyModal) closePrivacy();
                else closeModal();
                return;
            }

            trapFocus(event, activeModal);
        });

        // Cerrar modales al hacer clic en el fondo (el modal de adblock no se cierra con clic)
        els.modal.addEventListener('click', (event) => {
            if (event.target === els.modal) closeModal();
        });

        els.privacyModal.addEventListener('click', (event) => {
            if (event.target === els.privacyModal) closePrivacy();
        });

        // Comprobación automática al recuperar el foco de la ventana
        window.addEventListener('focus', async () => {
            if (isAdblockOpen) {
                const stillBlocked = await verifyAdBlockActive();
                if (!stillBlocked) {
                    hideAdblockModal();
                    showToast('¡Bloqueador desactivado! Bienvenido a RecompXtv.');
                }
            }
        });

        // Sincroniza el buscador si el usuario vuelve con el historial
        window.addEventListener('pageshow', () => {
            if (els.search.value) updateSearch();
        });
    }

    /* ======================================================================
       14. Inicialización
       ====================================================================== */
    function init() {
        cacheElements();
        if (!els.grid || !els.emptyState) return;

        bindEvents();
        renderDirectDownloads();
        setCategory('all');
        els.searchClear.hidden = true;
        initAdblockDetector();

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

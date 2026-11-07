/**
 * RecompXtv - Configuración, datos y lógica de la interfaz.
 *
 * Para añadir una app, agrega un objeto al array `apps`:
 *   id:           identificador único (sin espacios)
 *   categories:   ['smarttv' | 'mobile' | 'herramientas' | 'reproductores']
 *   platforms:    ['androidtv' | 'lg' | 'tizen' | 'roku' | 'mobile']
 *   code:         código de Downloader o null si se instala desde tienda/APK
 *   verified:     true si el código fue comprobado; false muestra "Sin verificar"
 *   installLabel: texto del botón cuando no hay código (ej. 'Google Play')
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
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-photo-film',
            bgColor: 'from-cyan-500 to-blue-700',
            desc: 'Cliente multimedia open source para organizar tu biblioteca, perfiles y progreso de reproducción en Android TV, Fire TV, LG webOS, Samsung Tizen y Android móvil.',
            guide: 'Descarga Nuvio desde nuvio.tv o desde sus releases oficiales de GitHub. En Android TV/Fire TV instala el APK; en LG webOS y Samsung Tizen requiere instalación manual (Developer Mode o TizenBrew). No hay versión oficial para Roku.',
            directUrl: 'https://nuvio.tv/',
        },
        {
            id: 'stremio',
            name: 'Stremio',
            categories: ['mobile', 'reproductores'],
            platforms: ['mobile'],
            tag: 'Android',
            code: null,
            installLabel: 'Google Play',
            iconClass: 'fa-clapperboard',
            bgColor: 'from-indigo-500 to-purple-600',
            desc: 'Reproductor y centro multimedia para Android con catálogo de películas y series, addons y sincronización de progreso.',
            guide: 'Instala Stremio desde Google Play o descarga el APK oficial en stremio.com/downloads. Abre la app, crea tu cuenta y añade los addons que quieras. No requiere código de Downloader.',
            directUrl: 'https://play.google.com/store/apps/details?id=com.stremio.one',
        },
        {
            id: 'xuper-tv',
            name: 'Xuper TV',
            categories: ['smarttv'],
            platforms: ['androidtv'],
            tag: 'Android TV / Firestick',
            code: '74829',
            verified: false,
            iconClass: 'fa-tv',
            bgColor: 'from-purple-600 to-indigo-600',
            desc: 'Aplicación optimizada para streaming en Smart TV y TV Boxes. Interfaz ligera diseñada específicamente para control remoto sin necesidad de mouse.',
            guide: 'Abre Downloader en tu Firestick o TV Box, ingresa el código que aparece en la tarjeta y pulsa Go. Permite la instalación de orígenes desconocidos si tu sistema lo solicita.',
            directUrl: null,
        },
        {
            id: 'downloader',
            name: 'Downloader (Official)',
            categories: ['smarttv', 'herramientas'],
            platforms: ['androidtv'],
            tag: 'Herramienta Clave',
            code: '11111',
            verified: false,
            iconClass: 'fa-download',
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
            code: '39201',
            verified: false,
            iconClass: 'fa-play',
            bgColor: 'from-orange-500 to-amber-600',
            desc: 'Reproductor multimedia libre y de código abierto compatible con todos los formatos de video, subtítulos y listas de reproducción externas.',
            guide: 'Excelente opción como reproductor secundario para aplicaciones que no tienen reproductor nativo integrado.',
            directUrl: 'https://www.videolan.org/',
        },
        {
            id: 'smart-iptv-helper',
            name: 'Smart IPTV Utility',
            categories: ['smarttv'],
            platforms: ['androidtv'],
            tag: 'Fire TV / Shield TV',
            code: '82043',
            verified: false,
            iconClass: 'fa-list-check',
            bgColor: 'from-blue-600 to-cyan-600',
            desc: 'Utilidad ligera para organizar enlaces de reproducciones y listas M3U en pantallas grandes sin lag.',
            guide: 'Descarga usando el código de la tarjeta, abre la app y conecta tu lista mediante la configuración de red rápida.',
            directUrl: null,
        },
        {
            id: 'send-files-tv',
            name: 'Send Files to TV',
            categories: ['smarttv', 'herramientas'],
            platforms: ['androidtv'],
            tag: 'Móvil & Smart TV',
            code: '50291',
            verified: false,
            iconClass: 'fa-share-nodes',
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
            code: '94012',
            verified: false,
            iconClass: 'fa-film',
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
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-film',
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
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-server',
            bgColor: 'from-indigo-600 to-blue-700',
            desc: 'Cliente libre para tu servidor multimedia. Disponible para Android TV, Roku y Android móvil.',
            guide: 'Instala el cliente desde Google Play o F-Droid en Android, desde el Channel Store en Roku o descarga el APK oficial. No requiere código de Downloader.',
            directUrl: 'https://jellyfin.org/downloads/',
        },
        {
            id: 'emby',
            name: 'Emby',
            categories: ['smarttv', 'mobile', 'reproductores'],
            platforms: ['androidtv', 'lg', 'tizen', 'roku', 'mobile'],
            tag: 'Multiplataforma',
            code: null,
            installLabel: 'Web oficial',
            iconClass: 'fa-photo-film',
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
            code: null,
            installLabel: 'APK oficial',
            iconClass: 'fa-play',
            bgColor: 'from-sky-600 to-blue-700',
            desc: 'Centro multimedia libre para Android TV y Android móvil. No está disponible para LG webOS, Tizen ni Roku.',
            guide: 'Descarga el APK oficial desde kodi.tv, habilita orígenes desconocidos e instálalo. No requiere código de Downloader.',
            directUrl: 'https://kodi.tv/download/android/',
        },
        {
            id: 'vlc-mobile',
            name: 'VLC for Android',
            categories: ['mobile', 'reproductores'],
            platforms: ['mobile'],
            tag: 'Android 5.0+',
            code: null,
            installLabel: 'APK oficial',
            iconClass: 'fa-play',
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
            code: null,
            installLabel: 'Google Play',
            iconClass: 'fa-film',
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
            code: null,
            installLabel: 'Google Play',
            iconClass: 'fa-share-nodes',
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

    let els = {};
    let searchTimer = null;
    let toastTimer = null;
    let lastFocusedElement = null;

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
                    <div>
                        <span class="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Código Downloader:</span>
                        <span class="text-lg font-mono font-extrabold text-brand-400">${escapeHtml(app.code)}</span>${codeBadge}
                    </div>
                    <button type="button"
                            data-copy="${escapeHtml(app.code)}"
                            data-copy-label="Código"
                            class="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5"
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
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${escapeHtml(app.bgColor)} flex items-center justify-center text-white text-xl shadow-md shrink-0" aria-hidden="true">
                        <i class="fa-solid ${escapeHtml(app.iconClass)}"></i>
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
        els.modalDesc.textContent = app.desc;
        els.modalGuide.textContent = app.guide;

        els.modalIcon.className = `w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.bgColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0`;
        els.modalIcon.replaceChildren();
        const icon = document.createElement('i');
        icon.className = `fa-solid ${app.iconClass}`;
        icon.setAttribute('aria-hidden', 'true');
        els.modalIcon.appendChild(icon);

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
            ? 'Enlace Directo APK'
            : 'Abrir enlace oficial';

        els.modal.hidden = false;
        document.body.classList.add('modal-open');
        els.modalCloseBtn.focus();
    }

    function closeModal() {
        if (els.modal.hidden) return;

        els.modal.hidden = true;
        if (els.privacyModal.hidden) document.body.classList.remove('modal-open');

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
        if (els.modal.hidden) document.body.classList.remove('modal-open');

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
    function init() {
        cacheElements();
        if (!els.grid || !els.emptyState) return;

        bindEvents();
        setCategory('all');
        els.searchClear.hidden = true;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

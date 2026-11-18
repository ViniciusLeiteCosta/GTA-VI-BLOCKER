(() => {
  if (window.__gta6BlockerLoaded) return;
  window.__gta6BlockerLoaded = true;

  const api = globalThis.browser || globalThis.chrome;
  const KEYWORD_VERSION = 2;
  const DEFAULT_KEYWORDS = [
    'gta 6', 'gta6', 'gta vi', 'grand theft auto vi', 'grand theft auto 6',
    'grandtheftauto6', 'grandtheftautovi', 'gta six', 'gta seis',
    'Jason Duval', 'Lucia Caminos', 'Cal Hampton', 'Brian Heder', 'Lori Heder',
    'Raul Bautista', 'Boobie Ike', "Dre'Quan Priest", 'Bae-Luxe', 'Roxy',
    'DWNPLY', 'Wyman', 'Macca the Gator', 'Mud Dog Mike', 'El Martillo',
    'La Gata', 'MW', 'Delta Dawne', 'Burna', 'Palmsy', 'DJ Kerry', 'DJ Tom',
    'Robyn', 'Alex', 'Trick', 'Trina'
  ];

  const COVER = 'gta6b-covered';
  const BADGE = 'gta6b-badge';
  let settings = { enabled: true, keywords: DEFAULT_KEYWORDS.slice() };
  let observer;
  const covered = new WeakSet();
  const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH', 'META', 'LINK', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION']);
  const cardSelector = [
    'ytd-rich-item-renderer', 'ytd-video-renderer', 'ytd-grid-video-renderer',
    'ytd-compact-video-renderer', 'ytd-playlist-video-renderer',
    'yt-lockup-view-model', 'ytd-reel-item-renderer',
    '[data-testid="video-item"]', '[data-testid="tweet"]',
    '[data-testid="cellInnerDiv"]', '[role="article"]', 'article',
    '[class*="video-card"]', '[class*="VideoCard"]', '[class*="thumbnail-container"]',
    '[class*="post-card"]', '[class*="PostCard"]'
  ].join(',');

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[\s._-]+/g, ' ')
      .replace(/[^\p{L}\p{N} ]/gu, ' ').replace(/\s+/g, ' ').trim();
  }

  function matches(value) {
    const haystack = ` ${normalize(value)} `;
    return settings.keywords.some(keyword => {
      const needle = normalize(keyword);
      return needle && haystack.includes(` ${needle} `);
    });
  }

  function installStyle() {
    if (document.getElementById('gta6b-style')) return;
    const style = document.createElement('style');
    style.id = 'gta6b-style';
    style.textContent = `
      .${COVER} {
        position: relative !important;
        isolation: isolate !important;
        overflow: hidden !important;
        background: #24102f !important;
        background-image: none !important;
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
        color: transparent !important;
        text-shadow: none !important;
      }
      .${COVER} > * { visibility: hidden !important; }
      .${COVER} img, .${COVER} video, .${COVER} iframe, .${COVER} picture,
      .${COVER} canvas { visibility: hidden !important; }
      .${BADGE} {
        position: absolute !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 5px !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 54px !important;
        padding: 12px !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        background: linear-gradient(120deg, #ec4899 0%, #a855f7 52%, #6d28d9 100%) !important;
        opacity: 1 !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border: 0 !important;
        border-radius: inherit !important;
        color: #fff !important;
        text-shadow: 0 1px 2px rgba(35, 8, 48, .45) !important;
        font: 700 13px/1.35 system-ui, sans-serif !important;
        text-align: center !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      .${BADGE} small {
        display: block !important;
        color: rgba(255,255,255,.88) !important;
        font: 500 11px/1.3 system-ui, sans-serif !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function getCardTarget(el) {
    // Prioriza cartões completos de vídeo/publicação, especialmente os do YouTube.
    const card = el.closest(cardSelector);
    if (card && card !== document.body && card !== document.documentElement) return card;

    // Links de thumbnail normalmente agrupam a imagem e o destino do vídeo.
    const link = el.closest('a[href]');
    if (link && link.querySelector('img, picture, video, [style*="background-image"]')) {
      const parentCard = link.parentElement && link.parentElement.closest(cardSelector);
      return parentCard || link;
    }

    // Evita esconder contêineres gigantes: sobe no máximo quatro níveis.
    let current = el;
    for (let i = 0; i < 4 && current.parentElement; i++) {
      const parent = current.parentElement;
      if (!parent || parent === document.body || parent === document.documentElement) break;
      const textLength = (parent.innerText || '').length;
      if (textLength > 900) break;
      current = parent;
      if (parent.matches('figure, li, [class*="thumbnail"], [class*="Thumbnail"], [class*="media"]')) break;
    }
    return current;
  }

  function cover(el) {
    if (!(el instanceof Element)) return;
    const target = getCardTarget(el);
    if (!target || target === document.body || target === document.documentElement || target.classList.contains(COVER)) return;
    if (covered.has(target)) return;

    installStyle();
    covered.add(target);
    target.classList.add(COVER);

    const badge = document.createElement('div');
    badge.className = BADGE;
    badge.setAttribute('role', 'note');
    badge.setAttribute('aria-label', 'Possível spoiler de GTA VI ocultado');
    const title = document.createElement('span');
    title.textContent = '🔒 Possível spoiler ocultado';
    const detail = document.createElement('small');
    detail.textContent = 'GTA VI BLOCKER';
    badge.append(title, detail);
    target.appendChild(badge);
  }

  function elementMetadata(el) {
    const attrs = ['alt', 'title', 'aria-label', 'data-tooltip-content', 'src', 'srcset',
      'href', 'data-src', 'data-original', 'data-lazy-src', 'poster', 'style'];
    return attrs.map(attr => el.getAttribute(attr) || '').join(' ');
  }

  function nearbyContext(el) {
    const chunks = [];
    let current = el;
    for (let i = 0; i < 5 && current && current !== document.body; i++, current = current.parentElement) {
      chunks.push(elementMetadata(current));
      if (i < 3 && current.childElementCount < 80) {
        const text = current.innerText || current.textContent || '';
        chunks.push(text.slice(0, 1800));
      }
      if (current.matches(cardSelector)) break;
    }
    return chunks.join(' ');
  }

  function scanElement(el) {
    if (!(el instanceof Element) || ignoredTags.has(el.tagName) || el.closest(`.${COVER}`)) return;

    const isMedia = el.matches('img, video, iframe, picture, source, a, [style*="background-image"]');
    const ownMetadata = elementMetadata(el);
    if (matches(ownMetadata)) return cover(el);

    if (isMedia && matches(nearbyContext(el))) return cover(el);

    // Texto visível do próprio cartão e rótulos acessíveis.
    if (el.matches(cardSelector)) {
      const text = (el.innerText || el.textContent || '').slice(0, 2500);
      if (matches(text)) return cover(el);
    }

    // Detecta imagens de fundo definidas por CSS, inclusive em elementos sem tag img.
    if (el.hasAttribute('style') && /background(?:-image)?\s*:/i.test(el.getAttribute('style') || '') && matches(nearbyContext(el))) {
      return cover(el);
    }

    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && matches(node.nodeValue)) {
        const parent = node.parentElement;
        if (parent) return cover(parent);
      }
    }
  }

  function scan(root = document) {
    if (!settings.enabled || !root) return;
    installStyle();
    if (root instanceof Element) scanElement(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) scanElement(node);
  }

  function removeCovers() {
    document.querySelectorAll(`.${COVER}`).forEach(el => {
      el.classList.remove(COVER);
      el.querySelectorAll(`:scope > .${BADGE}`).forEach(badge => badge.remove());
      covered.delete?.(el);
    });
  }

  function applySettings() {
    if (settings.enabled) scan(document);
    else removeCovers();
  }

  function startObserver() {
    if (observer || !document.documentElement) return;
    observer = new MutationObserver(records => {
      if (!settings.enabled) return;
      for (const record of records) {
        if (record.type === 'childList') {
          record.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) scan(node);
            else if (node.nodeType === Node.TEXT_NODE && matches(node.nodeValue) && node.parentElement) cover(node.parentElement);
          });
        } else if (record.type === 'characterData') {
          if (matches(record.target.nodeValue) && record.target.parentElement) cover(record.target.parentElement);
        } else if (record.type === 'attributes' && record.target instanceof Element) {
          scanElement(record.target);
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['src', 'srcset', 'alt', 'title', 'href', 'aria-label', 'style', 'data-src', 'data-original', 'data-lazy-src', 'poster']
    });
  }

  function loadSettings() {
    const fallback = { enabled: true, keywords: DEFAULT_KEYWORDS, keywordVersion: 0 };
    if (!api?.storage?.local) {
      settings = { enabled: true, keywords: DEFAULT_KEYWORDS.slice() };
      applySettings();
      startObserver();
      return;
    }
    api.storage.local.get(fallback, data => {
      const stored = Array.isArray(data.keywords) ? data.keywords : [];
      const keywords = Number(data.keywordVersion || 0) < KEYWORD_VERSION
        ? [...new Set([...DEFAULT_KEYWORDS, ...stored])]
        : stored;
      settings = { enabled: data.enabled !== false, keywords };
      if (Number(data.keywordVersion || 0) < KEYWORD_VERSION) {
        api.storage.local.set({ keywords, keywordVersion: KEYWORD_VERSION });
      }
      applySettings();
      startObserver();
    });
    api.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local') return;
      if (changes.enabled) settings.enabled = changes.enabled.newValue !== false;
      if (changes.keywords) settings.keywords = Array.isArray(changes.keywords.newValue) ? changes.keywords.newValue : DEFAULT_KEYWORDS;
      applySettings();
    });
  }

  loadSettings();
})();

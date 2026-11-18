const api = globalThis.browser || globalThis.chrome;
const KEYWORD_VERSION = 2;
const defaults = [
  'gta 6', 'gta6', 'gta vi', 'grand theft auto vi', 'grand theft auto 6',
  'grandtheftauto6', 'grandtheftautovi', 'gta six', 'gta seis',
  'Jason Duval', 'Lucia Caminos', 'Cal Hampton', 'Brian Heder', 'Lori Heder',
  'Raul Bautista', 'Boobie Ike', "Dre'Quan Priest", 'Bae-Luxe', 'Roxy',
  'DWNPLY', 'Wyman', 'Macca the Gator', 'Mud Dog Mike', 'El Martillo',
  'La Gata', 'MW', 'Delta Dawne', 'Burna', 'Palmsy', 'DJ Kerry', 'DJ Tom',
  'Robyn', 'Alex', 'Trick', 'Trina'
];
const area = document.getElementById('keywords');
const msg = document.getElementById('message');

api.storage.local.get({ keywords: defaults, keywordVersion: 0 }, data => {
  const stored = Array.isArray(data.keywords) ? data.keywords : [];
  const keywords = Number(data.keywordVersion || 0) < KEYWORD_VERSION
    ? [...new Set([...defaults, ...stored])]
    : stored;
  area.value = keywords.join('\n');
  if (Number(data.keywordVersion || 0) < KEYWORD_VERSION) {
    api.storage.local.set({ keywords, keywordVersion: KEYWORD_VERSION });
  }
});

document.getElementById('save').addEventListener('click', () => {
  const keywords = [...new Set(area.value.split('\n').map(value => value.trim()).filter(Boolean))];
  if (!keywords.length) {
    msg.textContent = 'Adicione pelo menos uma expressão.';
    return;
  }
  api.storage.local.set({ keywords, keywordVersion: KEYWORD_VERSION }, () => {
    msg.textContent = 'Configurações salvas.';
  });
});

document.getElementById('reset').addEventListener('click', () => {
  area.value = defaults.join('\n');
  api.storage.local.set({ keywords: defaults, keywordVersion: KEYWORD_VERSION }, () => {
    msg.textContent = 'Lista padrão restaurada.';
  });
});

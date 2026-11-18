const api = globalThis.browser || globalThis.chrome;
const toggle = document.getElementById('enabled');
const title = document.getElementById('statusTitle');
const detail = document.getElementById('statusText');

api.storage.local.get({ enabled: true }, data => {
  toggle.checked = data.enabled !== false;
  update();
});

function update() {
  title.textContent = toggle.checked ? 'Proteção ativada' : 'Proteção pausada';
  detail.textContent = toggle.checked
    ? 'Textos, imagens e prévias serão cobertos.'
    : 'A extensão não esconderá novos conteúdos.';
}

toggle.addEventListener('change', () => {
  api.storage.local.set({ enabled: toggle.checked }, update);
});

document.getElementById('options').addEventListener('click', () => api.runtime.openOptionsPage());

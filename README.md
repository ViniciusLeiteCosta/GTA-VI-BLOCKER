 <p align="center">
  <img src="assets/gta-6-blocker.png" alt="GTA 6 Blocker - GTA VI Spoiler Blocker" width="100%">
</p>

# GTA 6 BLOCKER

A browser AI vibe coded extension that hides content potentially related to GTA VI, including text, video/post cards, thumbnails, and images with matching textual context.

## Supported Browsers

- Chrome, Edge, Brave, Opera, and Vivaldi: use `manifest.chromium.json`.
- Firefox: use `manifest.firefox.json`.

## Test Installation — Chromium-based Browsers

1. Extract the ZIP file.
2. Rename `manifest.chromium.json` to `manifest.json` (or run `prepare-chromium.bat` on Windows).
3. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`, `opera://extensions`, or `vivaldi://extensions`).
4. Enable Developer Mode and click **Load unpacked**.
5. Select the project folder.

## Test Installation — Firefox

1. Rename `manifest.firefox.json` to `manifest.json` (or run `prepare-firefox.bat` on Windows).
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on** and select `manifest.json`.

The temporary Firefox extension may be removed when the browser restarts. For permanent distribution, the extension must be signed and/or published through Mozilla.

## Features

- Opaque pink and purple gradient overlay, with no red border or transparency.
- Hides entire video/post cards whenever they can be identified (including YouTube selectors).
- Contextual detection in images, links, media attributes, and inline background images.
- Monitors dynamic attributes and content, including images loaded later.
- Default list containing 35 expressions and names associated with the game; custom keywords remain saved.
- Dynamic content monitoring.
- Button to pause/resume the extension.
- Dedicated page for customizing keywords.
- Settings are stored locally; this version does not send data to any servers.

## Limitations

It is not possible to guarantee that absolutely all spoilers will be blocked in this first version. Images without text/metadata, videos whose content is not described in text, closed players, closed Shadow DOM, and internal/protected browser pages may bypass detection. The current version does not use OCR or visual analysis. Testing and adjusting selectors for each website is recommended before publishing to browser extension stores.

---

# Português



Extensão de navegador que oculta conteúdos possivelmente relacionados ao GTA VI, incluindo textos, cartões de vídeo/publicação, thumbnails e imagens com contexto textual correspondente.

## Navegadores compatíveis

- Chrome, Edge, Brave, Opera e Vivaldi: use `manifest.chromium.json`.
- Firefox: use `manifest.firefox.json`.

## Instalação de teste — navegadores Chromium

1. Extraia o ZIP.
2. Renomeie `manifest.chromium.json` para `manifest.json` (ou execute `prepare-chromium.bat` no Windows).
3. Abra `chrome://extensions` (ou `edge://extensions`, `brave://extensions`, `opera://extensions` ou `vivaldi://extensions`).
4. Ative o modo do desenvolvedor e clique em **Carregar sem compactação**.
5. Selecione a pasta do projeto.

## Instalação de teste — Firefox

1. Renomeie `manifest.firefox.json` para `manifest.json` (ou execute `prepare-firefox.bat` no Windows).
2. Abra `about:debugging#/runtime/this-firefox`.
3. Clique em **Carregar extensão temporária** e selecione `manifest.json`.

A extensão temporária do Firefox pode ser removida ao reiniciar o navegador. Para distribuição permanente, será necessário assinar/publicar pela Mozilla.

## Recursos

- Cobertura opaca com gradiente rosa e roxo, sem borda vermelha ou transparência.
- Ocultação de cartões inteiros de vídeo/publicação quando identificáveis (incluindo seletores do YouTube).
- Detecção contextual em imagens, links, atributos de mídia e imagens de fundo inline.
- Observação de atributos e conteúdo dinâmico, incluindo imagens carregadas posteriormente.
- Lista padrão com 35 expressões e nomes associados ao jogo; palavras personalizadas continuam salvas.
- Observação de conteúdo dinâmico.
- Botão para pausar/reativar.
- Página para personalizar palavras-chave.
- Configurações armazenadas localmente; esta versão não envia dados a servidores.

## Limitações

Não é possível prometer bloqueio de absolutamente tudo nesta primeira versão. Imagens sem texto/metadados, vídeos cujo conteúdo não esteja descrito em texto, players fechados, Shadow DOM fechado e páginas internas/protegidas do navegador podem escapar. A versão atual não usa OCR nem análise visual. O ideal é testar e ajustar seletores por site antes de publicar nas lojas.

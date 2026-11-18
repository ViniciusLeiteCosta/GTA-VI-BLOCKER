# GTA 6 BLOCKER

Extensão de navegador que oculta conteúdos possivelmente relacionados ao GTA VI, incluindo textos, cartões de vídeo/publicação, thumbnails e imagens com contexto textual correspondente.

## Navegadores
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

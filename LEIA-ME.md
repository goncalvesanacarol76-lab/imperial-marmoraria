# Site — Imperial Marmoraria

Site estático (HTML + CSS + JavaScript). Não precisa de servidor nem instalação: é só publicar a pasta.

## Onde editar cada coisa

| O que | Arquivo |
|---|---|
| WhatsApp, Instagram, endereço, horário, vídeo "Como nos encontrar" | `js/config.js` |
| Banners do carrossel | `js/banners.js` (imagens em `assets/banners/`) |
| Fotos do portfólio | `js/portfolio.js` (fotos em `assets/portfolio/`) |
| Depoimentos de clientes | `js/depoimentos.js` (fotos em `assets/depoimentos/`) |

Cada arquivo tem instruções no topo explicando como preencher.

## Antes de mostrar / publicar
1. **WhatsApp da Paula e da Tatiana** em `js/config.js` (55 + DDD + número).
2. **Confirme o endereço** em `js/config.js`. O que está lá (Av. Bandeirantes, 4730) foi encontrado
   num guia de empresas e precisa ser confirmado. O mapa, o botão "Como chegar" e o Waze usam esse endereço.
3. (Opcional) horário de atendimento, Instagram e Facebook.

## Vídeo "Como nos encontrar"
Em `js/config.js`, preencha `videoComoChegar` com:
- um link do YouTube (ex.: `https://www.youtube.com/watch?v=...`), **ou**
- um arquivo `.mp4` colocado em `assets/video/` (ex.: `assets/video/como-chegar.mp4`).
Dica: vídeos grandes deixam o site pesado; o YouTube é a opção mais leve.

## Banners
- Banner de imagem: arte pronta em **1600 × 500 px** (computador) e, se quiser, **900 × 700 px** (celular).
- Banner de texto: o site monta sozinho com textura de pedra (veja exemplos em `js/banners.js`).

## Publicar com link público (grátis)
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta inteira do site.
3. O link é gerado na hora. Crie uma conta grátis para manter o link e trocar o nome.
Para usar o domínio `marmoresimperial.com.br`, aponte o domínio nas configurações do Netlify.

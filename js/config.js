/* =====================================================================
   CONFIGURAÇÕES DO SITE — IMPERIAL MARMORARIA
   ---------------------------------------------------------------------
   Tudo o que muda com frequência fica aqui: contatos, endereço,
   horário e o vídeo "Como nos encontrar".
   ===================================================================== */

const CONFIG = {

  /* ---------- WhatsApp das consultoras ----------
     Só números: 55 + DDD + número. Ex.: "5512991234567" */
  consultoras: [
    { nome: "Paula",   cargo: "Consultora", whatsapp: "55129XXXXXXXX" },
    { nome: "Tatiana", cargo: "Consultora", whatsapp: "55129XXXXXXXX" },
  ],

  mensagemPadrao: "Olá! Vim pelo site da Imperial Marmoraria e gostaria de um orçamento.",

  /* ---------- Redes sociais (deixe "" para esconder) ---------- */
  instagram: "",   // ex.: "https://www.instagram.com/imperialmarmoraria"
  facebook:  "",   // ex.: "https://www.facebook.com/imperialmarmoraria"

  /* ---------- Endereço (usado no Google Maps) ----------
     ⚠ CONFIRA este endereço! Ele foi encontrado num guia de empresas
     e precisa ser validado com a marmoraria. */
  endereco: {
    linha1: "Av. Bandeirantes, 4730",
    linha2: "Taubaté — SP",
    // texto usado para localizar no mapa (pode ser o endereço completo ou
    // o nome exato da empresa como aparece no Google Maps)
    busca: "Av. Bandeirantes, 4730, Taubaté - SP",
  },

  /* ---------- Horário de atendimento (deixe "" para esconder) ---------- */
  horario: [
    // ex.: "Segunda a sexta · 8h às 18h",
    // ex.: "Sábado · 8h às 12h",
  ],

  /* ---------- Vídeo "Como nos encontrar" ----------
     Opção 1 — vídeo do YouTube: cole o link normal do vídeo
        ex.: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
     Opção 2 — arquivo de vídeo: coloque o .mp4 na pasta assets/video/
        ex.: "assets/video/como-chegar.mp4"
     Deixe "" para mostrar o espaço reservado. */
  videoComoChegar: "",

  /* Imagem de capa do vídeo (opcional, só para arquivo .mp4) */
  videoCapa: "",

  /* ---------- Link para avaliar no Google (opcional) ---------- */
  linkAvaliacaoGoogle: "",
};

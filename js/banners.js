/* =====================================================================
   BANNERS DO CARROSSEL (logo abaixo do topo do site)
   ---------------------------------------------------------------------
   Existem dois tipos de banner:

   1) BANNER DE IMAGEM — uma arte pronta (feita no Canva, por exemplo)
      {
        imagem: "assets/banners/promo-dezembro.jpg",        // 1600 x 500 px
        imagemMobile: "assets/banners/promo-dezembro-m.jpg", // 900 x 700 px (opcional)
        link: "#contato",                                    // opcional
        alt: "Descrição da arte",
      },

   2) BANNER DE TEXTO — o site monta o banner com textura de pedra
      {
        textura: "nero-marquina",   // calacatta-oro, crema-marfil, nero-marquina,
                                    // taj-mahal, sao-gabriel, onix-mel, ultracompacta
        etiqueta: "Destaque",
        titulo: "Título do banner",
        texto: "Uma frase curta.",
        botao: "Texto do botão",
        link: "#contato",
      },

   A ordem aqui é a ordem em que aparecem. Para remover, apague o bloco.
   ===================================================================== */

const BANNERS = [
  {
    textura: "nero-marquina",
    etiqueta: "Orçamento",
    titulo: "Orçamento sem compromisso",
    texto: "Envie as medidas ou uma foto do ambiente pelo WhatsApp.",
    botao: "Pedir orçamento",
    link: "#contato",
  },
  {
    textura: "calacatta-oro",
    etiqueta: "Materiais",
    titulo: "Classificação Extra",
    texto: "Mármores, granitos, quartzitos, quartzos e lâminas ultracompactas.",
    botao: "Ver materiais",
    link: "#pedras",
  },
  {
    textura: "onix-mel",
    etiqueta: "Atendimento",
    titulo: "Taubaté e região",
    texto: "Vale do Paraíba, Serra da Mantiqueira e Litoral Norte.",
    botao: "Onde estamos",
    link: "#localizacao",
  },
];

/* =====================================================================
   PORTFÓLIO DA IMPERIAL MARMORARIA
   ---------------------------------------------------------------------
   É AQUI que você adiciona, troca ou remove fotos do portfólio.

   COMO ADICIONAR UMA FOTO NOVA:
     1. Coloque a imagem na pasta  assets/portfolio/
        (de preferência .jpg, com nome sem espaços nem acentos,
         ex.: cozinha-quartzito-taj-mahal.jpg)
     2. Copie um bloco { ... } abaixo e preencha:
          imagem    → caminho do arquivo
          titulo    → nome do projeto
          categoria → uma das chaves de CATEGORIAS (ex.: "cozinhas")
          descricao → (opcional) uma frase sobre o projeto
          tamanho   → (opcional) "alto", "largo" ou "grande" para destacar
     3. Salve. Pronto — o filtro e a galeria se atualizam sozinhos.

   ESPAÇOS RESERVADOS:
     Os blocos com  imagem: ""  aparecem como cartões elegantes em
     textura de pedra ("Em breve"). Basta preencher o caminho da imagem
     para virar uma foto. Para esconder todos os espaços vazios do site,
     mude MOSTRAR_ESPACOS_RESERVADOS para false.
   ===================================================================== */

const MOSTRAR_ESPACOS_RESERVADOS = true;

/* Categorias que aparecem nos filtros (na ordem abaixo).
   Só aparecem as categorias que tiverem pelo menos um item. */
const CATEGORIAS = {
  cozinhas:       "Cozinhas",
  ilhas:          "Ilhas",
  banheiros:      "Banheiros",
  cubas:          "Cubas",
  gourmet:        "Áreas gourmet",
  bancadas:       "Bancadas",
  escadas:        "Escadas",
  pias:           "Pias",
  revestimentos:  "Revestimentos",
  pedras:         "Pedras & Mármores",
};

const PORTFOLIO = [
  /* ---------- OBRAS COM FOTO ---------- */
  {
    imagem: "assets/portfolio/cozinha-ilha-cascata-branca.jpg",
    titulo: "Ilha em cascata com veios contínuos",
    categoria: "ilhas",
    descricao: "Pedra branca com veios cinza e acabamento em meia-esquadria.",
    tamanho: "grande",
  },
  {
    imagem: "assets/portfolio/banheiro-cuba-esculpida-crema.jpg",
    titulo: "Lavatório com cuba esculpida",
    categoria: "cubas",
    descricao: "Mármore bege com cuba talhada na própria pedra e prateleira inferior.",
    tamanho: "alto",
  },
  {
    imagem: "assets/portfolio/area-gourmet-granito-preto.jpg",
    titulo: "Área gourmet em granito preto",
    categoria: "gourmet",
    descricao: "Balcão em L, bancada da pia e churrasqueira integradas.",
    tamanho: "largo",
  },
  {
    imagem: "assets/portfolio/escada-marmore-branco.jpg",
    titulo: "Escada em mármore branco",
    categoria: "escadas",
    descricao: "Degraus e espelhos com bordas polidas.",
    tamanho: "alto",
  },

  /* ---------- ESPAÇOS RESERVADOS (preencha 'imagem' quando tiver a foto) ---------- */
  { imagem: "", titulo: "Cozinha planejada", categoria: "cozinhas", descricao: "" },
  { imagem: "", titulo: "Banheiro em mármore", categoria: "banheiros", descricao: "" },
  { imagem: "", titulo: "Bancada sob medida", categoria: "bancadas", descricao: "" },
  { imagem: "", titulo: "Lavabo", categoria: "banheiros", descricao: "", tamanho: "alto" },
  { imagem: "", titulo: "Cozinha com ilha", categoria: "cozinhas", descricao: "", tamanho: "largo" },
  { imagem: "", titulo: "Pia de cozinha", categoria: "pias", descricao: "" },
  { imagem: "", titulo: "Painel em pedra", categoria: "revestimentos", descricao: "" },
  { imagem: "", titulo: "Chapa selecionada", categoria: "pedras", descricao: "" },
];

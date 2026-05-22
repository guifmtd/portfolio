export type Category =
  | "Cortes"
  | "Educacional"
  | "Comercial"
  | "Podcast"
  | "Mercado Financeiro";

export type Work = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: Category;
  role: string;
  duration: string;
  hue: number;
  vimeoId?: string;
  cover?: string;
  preview?: string;
  description: string;
  placeholder?: boolean;
};

export const categories: Category[] = [
  "Cortes",
  "Educacional",
  "Comercial",
  "Podcast",
  "Mercado Financeiro",
];

const PLACEHOLDER_COPY = {
  description:
    "Conteúdo em produção — case detalhado em breve. Esta é uma entrada provisória até a publicação do material final.",
};

export const works: Work[] = [
  {
    slug: "dani-frederico-compulsao-alimentar",
    title: "Compulsão Alimentar",
    client: "Dani Frederico",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "01:13",
    hue: 35,
    vimeoId: "1194549856",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "felipe-titto-minimalista",
    title: "Minimalista",
    client: "Felipe Titto",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "01:02",
    hue: 15,
    vimeoId: "1194549823",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "felipe-spritzer-blueberries",
    title: "Blueberries BRASIL ~ USA",
    client: "Felipe Spritzer",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "00:59",
    hue: 200,
    vimeoId: "1194549709",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "thiago-oliveira-valor-do-teste",
    title: "O valor do teste",
    client: "Thiago Oliveira",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "00:47",
    hue: 280,
    vimeoId: "1194549784",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "thiago-lisboa-negociacao-da-china",
    title: "Negociação da China",
    client: "Thiago Lisboa",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "00:44",
    hue: 140,
    vimeoId: "1194549710",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "rodrigo-schroder-direcao-do-conteudo",
    title: "Direção do conteúdo",
    client: "Rodrigo Schröder",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "00:28",
    hue: 60,
    vimeoId: "1194549707",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "roberto-pereira-importancia-do-investimento",
    title: "Importância do investimento",
    client: "Roberto Pereira",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "00:38",
    hue: 320,
    vimeoId: "1194549428",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "phelipe-max-fisico-funcional",
    title: "Valor de um físico funcional",
    client: "Phelipe Max",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "00:55",
    hue: 100,
    vimeoId: "1194557773",
    description: PLACEHOLDER_COPY.description,
  },
  {
    slug: "felipe-lucchesi-linha-de-peso",
    title: "Linha de peso no cabelo",
    client: "Felipe Lucchesi",
    year: 2026,
    category: "Cortes",
    role: "Edição",
    duration: "01:08",
    hue: 240,
    vimeoId: "1194557774",
    description: PLACEHOLDER_COPY.description,
  },
];

export const clients = [
  "Felipe Lucchesi",
  "Felipe Spritzer",
  "Felipe Titto",
  "Phelipe Max",
  "Thiago Lisboa",
];

export const testimonials = [
  {
    quote:
      "Espaço reservado para o depoimento. Os clientes do Gui vão preencher esta seção em breve.",
    author: "Em breve",
    role: "Depoimento de cliente",
  },
  {
    quote:
      "Espaço reservado para o depoimento. Os clientes do Gui vão preencher esta seção em breve.",
    author: "Em breve",
    role: "Depoimento de cliente",
  },
  {
    quote:
      "Espaço reservado para o depoimento. Os clientes do Gui vão preencher esta seção em breve.",
    author: "Em breve",
    role: "Depoimento de cliente",
  },
];

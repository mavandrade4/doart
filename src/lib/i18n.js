// Gallery / review categories. Each key is also the Cosmic object type
// that gets fetched (type: 'tattoos', 'illustrations', ...).
export const CATEGORIES = ['tattoos', 'illustrations', 'covers', 'cartoons'];

export const DEFAULT_LANG = 'en';
export const LANGS = ['en', 'pt'];

export const translations = {
  en: {
    headerText: "presents",
    nav: { about: 'About me', gallery: 'Gallery', reviews: 'Reviews' },
    categories: {
      tattoos: 'tattoos',
      illustrations: 'illustrations',
      covers: 'covers',
      cartoons: 'cartoons',
    },
    // Placeholder copy from the Figma - replace with the real bio.
    aboutText:
      "Duarte Nunes is a person lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    gallery: { title: 'Gallery', empty: 'Nothing here yet.', filterLabel: 'Filter gallery' },
    reviews: {
      title: 'Reviews',
      empty: 'No reviews here yet.',
      filterLabel: 'Filter reviews',
      add: 'leave a review',
    },
    feedback: {
      title: 'Share your review',
      name: 'Name (optional)',
      comment: 'Tell us about your experience...',
      cancel: 'Cancel',
      submit: 'Send review',
    },
    lightbox: { close: 'Close image' },
  },
  pt: {
    headerText: "apresenta",
    nav: { about: 'Sobre mim', gallery: 'Galeria', reviews: 'Avaliações' },
    categories: {
      tattoos: 'tatuagens',
      illustrations: 'ilustrações',
      covers: 'capas',
      cartoons: 'cartoons',
    },
    aboutText:
      "Duarte Nunes is a person lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    gallery: { title: 'Galeria', empty: 'Ainda não há trabalhos aqui.', filterLabel: 'Filtrar galeria' },
    reviews: {
      title: 'Avaliações',
      empty: 'Ainda não há avaliações aqui.',
      filterLabel: 'Filtrar avaliações',
      add: 'deixar uma avaliação',
    },
    feedback: {
      title: 'Partilha a tua avaliação',
      name: 'Nome (opcional)',
      comment: 'Conta-nos como foi a tua experiência...',
      cancel: 'Cancelar',
      submit: 'Enviar avaliação',
    },
    lightbox: { close: 'Fechar imagem' },
  },
};

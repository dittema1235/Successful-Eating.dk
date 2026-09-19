export const site = {
  name: 'Successful Eating',
  url: 'https://www.successfuleating.dk',
  person: 'Ditte Munch-Andersen',
  email: 'hello@successfuleating.com',
  // Confirmed in the detailed report, pages 18 and 44.
  phone: '+45 71 41 59 69',
  address: 'Hovedvagtsstræde 2C',
  city: '3000 Helsingør',
  cvr: '30642155',
  booking: 'https://calendar.app.google/BFPj4aAbpdadtkB28',
  // Local legacy URL preserved; external opt-in is configured on the landing page.
  guide: '/sulteneller',
  checkout: 'https://successfuleating.systeme.io/4b00a70d',
  treatmentPrice: 4499, // Visible checkout verified 2026-09-19; keep one shared source.
  treatmentPriceChecked: '2026-09-19',
  login: 'https://secure.simplero.com/login?account_id=797&site_id=6660',
  trustpilot: 'https://dk.trustpilot.com/review/successfuleating.dk',
};
export const services = [
  {
    slug: 'forloebet',
    eyebrow: 'FOR DIG, DER VIL BRYDE MØNSTRET',
    title: 'Successful Eating',
    intro:
      'Få hjælp til at forstå din overspisning og skabe et roligere forhold til mad. Med psykologiske redskaber, støtte og plads til dig.',
    features: [
      'Psykologisk behandling af overspisning',
      'Øvelser, du kan tage med ind i hverdagen',
      'Online – uanset hvor i landet du bor',
    ],
    tag: 'Overspisning & madstøj',
    icon: 'leaf',
    tone: 'sage',
  },
  {
    slug: 'kropsglaede',
    eyebrow: 'MERE OMSORG. MINDRE KROPSKRITIK.',
    title: 'Kropsaccept',
    intro:
      'Et individuelt behandlingsforløb til dig, der oplever, at skam, selvkritik og tanker om kroppen tager for meget plads.',
    features: [
      'Individuel klinisk forsamtale',
      'Personlige samtaler med Ditte',
      'Terapeutiske øvelser mellem samtalerne',
    ],
    tag: 'Kropsbillede & selvkritik',
    icon: 'heart',
    tone: 'peach',
  },
] as const;
export const faqs = [
  {
    question: 'Hvad er madro?',
    answer:
      'Madro er et hverdagsudtryk for, at mad, spisning og tanker om kroppen fylder mindre og føles mindre konfliktfyldte. Det er ikke en diagnose eller et bestemt tal på vægten. For nogle handler det om færre overspisninger; for andre om mere fleksibilitet og mindre skyld.',
  },
  {
    question: 'Er Successful Eating en slankekur?',
    answer:
      'Nej. Fokus er dit forhold til mad og de mønstre, der kan vedligeholde overspisning. Der er ikke et løfte om vægttab, en bestemt kropsstørrelse eller et garanteret resultat. Behandlingen tager udgangspunkt i din situation.',
  },
  {
    question: 'Kan jeg få hjælp, hvis jeg har ADHD?',
    answer:
      'Ja, udfordringer med struktur og impulser kan inddrages i vurderingen af dine behov. Der er ikke et separat ADHD-forløb. Vi afklarer, om behandling af overspisning passer til dig. Behandlingen erstatter ikke ADHD-udredning eller medicinsk behandling.',
  },
  {
    question: 'Kan forløbet foregå online?',
    answer:
      'Ja, du kan deltage online fra hele Danmark. Individuelle samtaler kan også foregå i klinikken på Hovedvagtsstræde 2C i Helsingør. Du har brug for en stabil internetforbindelse og et sted, hvor du kan tale uforstyrret.',
  },
  {
    question: 'Hvad koster et forløb?',
    answer:
      'Successful Eating har én samlet pris, som du finder på behandlingssiden og i checkout. Prisen for et individuelt kropsacceptforløb oplyses før aftale. Du får vilkårene, før du beslutter dig. Den indledende afklarende samtale på 15 minutter er gratis.',
  },
  {
    question: 'Hvad sker der i den gratis afklarende samtale?',
    answer:
      'Vi bruger 15 minutter på dine spørgsmål og på at afklare et muligt næste skridt. Samtalen er uforpligtende og er ikke en klinisk vurdering eller behandling. En eventuel klinisk forsamtale aftales særskilt med tydelige vilkår.',
  },
];

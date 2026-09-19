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
  // Local legacy URL preserved; external opt-in is configured on the landing page.
  guide: '/sulteneller',
  checkout: 'https://successfuleating.systeme.io/4b00a70d',
  treatmentPrice: 4499, // Confirmed by owner 2026-09-19; keep one shared source.
  consultationPrice: 645,
  consultationMinutes: 50,
  treatmentPriceChecked: '2026-09-19',
  login: 'https://secure.simplero.com/login?account_id=797&site_id=6660',
  trustpilot: 'https://dk.trustpilot.com/review/successfuleating.dk',
};
export const formatPrice = (amount: number) => `${amount.toLocaleString('da-DK')} kr.`;
const consultationUrl = import.meta.env.PUBLIC_CONSULTATION_BOOKING_URL?.trim();
if (consultationUrl) {
  const url = new URL(consultationUrl);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.hostname === new URL(site.url).hostname
  )
    throw new Error(
      'PUBLIC_CONSULTATION_BOOKING_URL must be a verified external HTTPS booking/payment URL.',
    );
}
export const consultation = {
  online: Boolean(consultationUrl),
  href:
    consultationUrl ||
    `mailto:${site.email}?subject=${encodeURIComponent(`Forespørgsel om forsamtale: ${site.consultationMinutes} minutter til ${formatPrice(site.consultationPrice)}`)}&body=${encodeURIComponent('Hej Ditte\n\nJeg vil gerne aftale en forsamtale. Vil du sende mig oplysninger om ledige tider og betaling?\n\nVenlig hilsen\n')}`,
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
    answer: `Successful Eating koster ${formatPrice(site.treatmentPrice)} inklusive en gratis individuel forsamtale. Vurderes forløbet ved forsamtalen at være et dårligt match, får du alle pengene tilbage. Prisen for et individuelt kropsacceptforløb oplyses før aftale.`,
  },
  {
    question: 'Kan jeg starte med en forsamtale?',
    answer: `Ja. Du kan købe en individuel forsamtale på ${site.consultationMinutes} minutter til ${formatPrice(site.consultationPrice)}. Her undersøger vi dine behov og vurderer, om Successful Eating passer til dig. Vælger du efterfølgende forløbet, modregnes hele beløbet i forløbsprisen. Du betaler derfor ${formatPrice(site.treatmentPrice - site.consultationPrice)} mere og ${formatPrice(site.treatmentPrice)} i alt.`,
  },
  {
    question: 'Hvad hvis forløbet ikke er det rette match?',
    answer: `Køber du hele forløbet til ${formatPrice(site.treatmentPrice)}, og vurderes det ved den inkluderede forsamtale at være et dårligt match, får du alle pengene tilbage. Køber du i stedet forsamtalen særskilt til ${formatPrice(site.consultationPrice)}, betaler du for samtalen; beløbet modregnes, hvis du efterfølgende vælger forløbet.`,
  },
];

export const site = {
  name: 'Successful Eating',
  productName: 'Successful Eating – online selvstudieforløb',
  purchaseCta: 'Start dit Successful Eating-forløb',
  url: 'https://www.successfuleating.dk',
  person: 'Ditte Munch-Andersen',
  email: 'psykolog@dittemunchandersen.dk',
  phone: '+45 71 41 59 69',
  address: 'Hovedvagtsstræde 2C',
  city: '3000 Helsingør',
  cvr: '30642155',
  guide: '/gratis-guide/',
  checkout: 'https://successfuleating.systeme.io/onlineforloeb',
  productPrice: 3499,
  productDays: 58,
  consultationPrice: 1295,
  consultationMinutes: 50,
  login: 'https://successfuleating.systeme.io/school/course/successful_eating',
  legacyLogin: 'https://secure.simplero.com/login?account_id=797&site_id=6660',
  trustpilot: 'https://dk.trustpilot.com/review/successfuleating.dk',
};

export const formatPrice = (amount: number) => amount.toLocaleString('da-DK') + ' kr.';

// Draft from the brief and previous course outline. Replace with the owner's final sales copy.
// The linked Systeme.io course must contain all eight parts before release.
export const selfStudyModules = [
  {
    title: 'Fundamentet: sult og mæthed',
    description:
      'Du begynder med at lægge mærke til sult, mæthed og de situationer, hvor du spiser uden fysisk sult.',
  },
  {
    title: 'Afhængig spisning',
    description:
      'Du undersøger de impulser og vaner, der kan få dig til at spise videre, selvom du gerne vil stoppe.',
  },
  {
    title: 'Redskaberne',
    description:
      'Du får konkrete øvelser til at arbejde med spisningen i din egen hverdag.',
  },
  {
    title: 'Perspektivskifte',
    description:
      'Du ser på madregler, slankekure og tanker, der kan holde overspisningen i gang.',
  },
  {
    title: 'Følelser og følelsesregulering',
    description:
      'Du arbejder med sammenhængen mellem følelser, mental belastning og spisning.',
  },
  {
    title: 'Førstehjælp ved overspisninger',
    description:
      'Du øver dig i at komme videre efter en svær episode uden at starte en ny spiral af selvkritik.',
  },
  {
    title: 'Fra kropslede til kropsaccept',
    description:
      'Du undersøger forholdet til din krop og finder måder at mindske den plads, kropskritik tager.',
  },
  {
    title: 'Sådan holder du fast i dine nye vaner',
    description:
      'Du lægger en plan for at bruge det, du har lært, også efter de 58 dage.',
  },
] as const;

export const consultation = {
  online: true,
  href: 'https://dittemunchandersen.dk/kontakt/',
};

export const services = [
  {
    slug: 'forloebet',
    eyebrow: 'FOR DIG, DER VIL ARBEJDE SELVSTÆNDIGT',
    title: 'Successful Eating',
    intro:
      'Et online selvstudieforløb over 58 dage med et fundament og syv moduler. Du arbejder på egen hånd og har livslang adgang til materialet.',
    features: [
      'Videoer og øvelser, du arbejder med selv',
      '58 dage med et fundament og syv moduler',
      'Livslang adgang til onlineforløbets materiale',
    ],
    tag: 'Online selvstudieforløb',
    icon: 'leaf',
    tone: 'sage',
  },
  {
    slug: 'kropsglaede',
    eyebrow: 'SÆRSKILT INDIVIDUEL BEHANDLING',
    title: 'Kropsaccept',
    intro:
      'Individuelle samtaler med Ditte om kropskritik og selvbillede. Det er et separat tilbud og er ikke inkluderet i Successful Eating.',
    features: [
      'Personlige samtaler med Ditte',
      'I Helsingør eller online',
      'Pris og rammer aftales særskilt',
    ],
    tag: 'Individuelle samtaler',
    icon: 'heart',
    tone: 'peach',
  },
] as const;

export const faqs = [
  {
    question: 'Hvad er Successful Eating?',
    answer:
      'Successful Eating er et online selvstudieforløb. Du arbejder selvstændigt med videoer og øvelser over 58 dage, fra fundamentet gennem syv moduler. Der er ingen live gruppeterapi eller individuelle samtaler i prisen.',
  },
  {
    question: 'Hvor længe har jeg adgang?',
    answer:
      'Du har livslang adgang til onlineforløbets materiale. De 58 dage beskriver forløbets opbygning, ikke en udløbsdato for din adgang.',
  },
  {
    question: 'Er individuelle samtaler med Ditte inkluderet?',
    answer:
      'Nej. Du gennemfører onlineforløbet på egen hånd. Hvis du ønsker individuelle samtaler med Ditte Munch-Andersen, kan du købe dem separat. De indgår ikke i prisen for Successful Eating.',
  },
  {
    question: 'Hvad koster onlineforløbet?',
    answer:
      'Successful Eating koster ' + formatPrice(site.productPrice) + ' inkl. moms. Den aktuelle betalingsform og det samlede beløb skal fremgå af købssiden, før du beslutter dig.',
  },
  {
    question: 'Er det en slankekur?',
    answer:
      'Nej. Du arbejder med de mønstre, der kan holde overspisning og madstøj i gang. Der gives ikke en kostplan eller garanti for vægttab. Resultater fra tidligere deltagere kan ikke forudsige dit resultat.',
  },
  {
    question: 'Er selvstudiet relevant ved BED eller andre spiseforstyrrelser?',
    answer:
      'Tvangsoverspisning (BED) er en diagnose, som kræver faglig vurdering. Selvstudiet indeholder ikke en individuel vurdering eller behandling. Hvis du fremkalder opkastning, spiser meget restriktivt, har symptomer på anoreksi eller er bekymret for dit helbred, bør du kontakte din egen læge. Du kan også vælge en særskilt individuel samtale for at tale om, hvilken hjælp der passer til dig.',
  },
  {
    question: 'Kan jeg købe en samtale senere?',
    answer:
      'Ja. Individuelle samtaler med Ditte er et separat tilbud, som kan aftales uafhængigt af onlineforløbet. Se siden om individuelle samtaler for pris og booking.',
  },
];

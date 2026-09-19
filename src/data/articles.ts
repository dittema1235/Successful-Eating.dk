import consolidated from './consolidated-articles.json';
export interface Article {
  slug: string;
  title: string;
  category: string;
  description: string;
  word: string;
  tone: string;
  readTime: string;
  sections: { heading: string; text: string }[];
  sources: { label: string; url: string }[];
  sourceNote?: string;
  service: string;
  serviceLabel: string;
  topic?: string;
  published?: string;
  updated?: string;
  related?: string[];
}
export const articles: Article[] = [
  {
    slug: 'hvad-er-madro',
    title: 'Hvad er madro – og hvordan finder du den?',
    category: 'Madro & madstøj',
    description:
      'Når tanker om mad tager mindre plads. En introduktion til et mere fleksibelt forhold til spisning.',
    word: 'madro.',
    tone: 'sage',
    readTime: '4 min.',
    sections: [
      {
        heading: 'Det korte svar',
        text: 'Madro er et hverdagsudtryk for et mere roligt og fleksibelt forhold til mad. Det kan betyde færre konflikter omkring spisning, mindre skyld og mere plads til andre ting i livet. Madro er ikke en diagnose, og det kræver ikke en bestemt vægt.',
      },
      {
        heading: 'Hvad betyder madstøj?',
        text: 'Madstøj bruges ofte om tilbagevendende tanker om, hvad, hvornår og hvor meget man skal spise. Begrebet har ikke én fast klinisk definition. Tankerne kan hænge sammen med blandt andet sult, restriktioner, bekymringer, vaner eller belastning. Derfor er det vigtigt at undersøge din konkrete situation frem for at antage én forklaring.',
      },
      {
        heading: 'Begynd med at lægge mærke til mønstret',
        text: 'Prøv at være nysgerrig på, hvornår madtankerne fylder. Har du fået tilstrækkelig mad? Er der bestemte situationer eller følelser, der går igen? Formålet er at forstå sammenhænge, ikke at overvåge dig selv eller skabe flere regler. Hvis registrering gør dig mere optaget af mad, er det bedre at tale med en fagperson om en anden tilgang.',
      },
      {
        heading: 'Madro er ikke det samme som vægttab',
        text: 'Et mere roligt forhold til mad kan være et meningsfuldt mål i sig selv. Det kan ikke oversættes til et bestemt vægttab, og behandlingsresultater varierer fra person til person. Ved tilbagevendende overspisning bør støtten tage udgangspunkt i en individuel vurdering.',
      },
      {
        heading: 'Hvornår er det relevant at få hjælp?',
        text: 'Søg faglig hjælp, hvis spisning, skyldfølelse eller tanker om kroppen påvirker din trivsel. Det gælder især ved gentagne episoder med kontroltab, opkastning, faste eller andre forsøg på at kompensere. Din egen læge kan hjælpe med at vurdere behovet for udredning og behandling.',
      },
    ],
    sources: [
      {
        label: 'NICE: Eating disorders – recognition and treatment (NG69)',
        url: 'https://www.nice.org.uk/guidance/ng69',
      },
    ],
    service: '/forloebet',
    serviceLabel: 'Psykologisk behandling af overspisning',
  },
  {
    slug: 'adhd-og-overspisning',
    title: 'ADHD og overspisning: når hverdagen spiller med',
    category: 'ADHD & spisning',
    description:
      'Om struktur, impulser og regelmæssige måltider – og hvorfor der ikke findes én forklaring på overspisning.',
    word: 'din rytme.',
    tone: 'peach',
    readTime: '5 min.',
    sections: [
      {
        heading: 'Det korte svar',
        text: 'ADHD kan gøre det vanskeligere at organisere måltider, skifte mellem aktiviteter og håndtere impulser. Nogle oplever også overspisning. Det betyder ikke, at alle med ADHD overspiser, eller at dopamin alene forklarer problemet. Det er relevant at se på både ADHD, spisning og den konkrete hverdag.',
      },
      {
        heading: 'Når planlægning af mad kræver meget',
        text: 'Indkøb, madlavning og pauser kræver overblik. Hvis du mister tidsfornemmelsen eller bliver opslugt af en opgave, kan måltider blive udskudt. Senere kan stor sult gøre situationen sværere. Enkle rutiner, synlige påmindelser eller nem adgang til mad kan være værd at afprøve med udgangspunkt i dine behov.',
      },
      {
        heading: 'Impulser og følelser kan have betydning',
        text: 'ADHD er forskelligt fra person til person. For nogle spiller impulsivitet og følelsesmæssige belastninger ind i spisningen. For andre er det især måltidsrytme, restriktioner eller andre forhold. Undgå forklaringer, der reducerer hele mønstret til mangel på viljestyrke eller ét signalstof.',
      },
      {
        heading: 'Hvis du tager medicin',
        text: 'Nogle former for ADHD-medicin kan påvirke appetitten. Hvis du oplever ændret appetit, vægt eller spisemønster, så tal med den læge, der står for behandlingen. Ændr ikke selv din medicin. Psykologisk hjælp til spisemønstre erstatter ikke medicinsk opfølgning.',
      },
      {
        heading: 'Hjælp, der passer ind i din hverdag',
        text: 'Et relevant forløb begynder med at forstå din situation. Støtten kan blandt andet handle om realistiske aftaler, overskuelige øvelser og at tilpasse rammerne til de udfordringer, du møder. Hvis overspisningen indebærer kontroltab og belastning, bør behovet for særskilt behandling af en spiseforstyrrelse også vurderes.',
      },
    ],
    sources: [
      {
        label: 'NICE: Attention deficit hyperactivity disorder – diagnosis and management (NG87)',
        url: 'https://www.nice.org.uk/guidance/ng87',
      },
      {
        label: 'NICE: Eating disorders – recognition and treatment (NG69)',
        url: 'https://www.nice.org.uk/guidance/ng69',
      },
    ],
    service: '/forloebet',
    serviceLabel: 'Læs om behandling af overspisning',
  },
  ...consolidated,
];

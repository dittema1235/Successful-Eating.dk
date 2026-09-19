import { readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
const entries = [
  {
    slug: 'når-mad-er-hjernens-pauseknap',
    title: 'Når mad føles som en pauseknap',
    topic: 'sukkertrang',
    description:
      'Hvorfor kan mad føles som en pause? Om belønning, følelser og spisemønstre – med plads til de forskelle, der gør din situation til din egen.',
    sections: [
      [
        'Det korte svar',
        'Mad kan forbindes med nydelse, afledning og en pause fra svære følelser. Det betyder ikke, at hjernen tvinger dig til at spise, eller at én biologisk forklaring dækker alle overspisninger. Det er relevant at se på både sult, vaner, tanker og den situation, du står i.',
      ],
      [
        'En metafor, ikke en diagnose',
        'At kalde mad en pauseknap er en måde at beskrive en oplevelse på. Det er ikke en diagnose og dokumenterer ikke en afhængighed. Spørgsmålet er, hvad spisningen gør for dig i øjeblikket, og hvad den betyder bagefter.',
      ],
      [
        'Hvad sker der lige inden?',
        'Prøv at lægge mærke til en konkret situation: Havde du spist nok? Var du træt, presset eller alene med noget svært? Hvad håbede du, at maden ville ændre? Du behøver ikke registrere alt; én nysgerrig observation kan være nok at begynde med.',
      ],
      [
        'Hvad kan du give plads til?',
        'Hvis du er sulten, er mad et relevant behov. Hvis du også har brug for hvile, kontakt eller hjælp med en belastning, må de behov gerne få plads ved siden af maden. Målet er ikke at gøre al spisning til et problem, der skal kontrolleres.',
      ],
      [
        'Når mønstret er svært at ændre',
        'Tilbagevendende episoder med kontroltab og betydelig belastning bør vurderes fagligt. Psykologisk behandling tager udgangspunkt i det, der vedligeholder mønstret hos den enkelte. En generel artikel kan ikke afgøre, hvilken hjælp der passer til dig.',
      ],
    ],
  },
  {
    slug: 'hvorfor-jeg-ved-godt-hvad-jeg-burde-ikke-er-nok',
    title: 'Hvorfor viden om mad ikke altid ændrer din spisning',
    topic: 'overspisning',
    description:
      'Du kan godt vide meget om mad og stadig opleve overspisning. Læs om forskellen mellem at kende et råd og at kunne bruge det i en presset hverdag.',
    sections: [
      [
        'Det korte svar',
        'Viden er ikke altid nok til at ændre et spisemønster. Sult, vaner, følelser og de praktiske rammer kan påvirke det, du gør i øjeblikket. Hjælpen skal derfor handle om din konkrete hverdag og ikke alene om flere råd.',
      ],
      [
        'Du er mere end dine beslutninger',
        'Måske har du fået mange forslag til, hvad du burde gøre. Det kan skabe selvkritik, når et velkendt mønster alligevel gentager sig. I stedet for at bruge situationen som et bevis på manglende viljestyrke kan du undersøge, hvilke betingelser der gjorde den svær.',
      ],
      [
        'Det mentale batteri er et billede',
        'Man kan opleve sig mentalt tømt efter en lang dag. At beskrive viljestyrke som et batteri kan være en pædagogisk metafor, men det er ikke en sikker biologisk forklaring. Forskningen om ego depletion er omdiskuteret; derfor bruger vi ikke teorien som en fastslået årsag til overspisning.',
      ],
      [
        'Gør næste skridt konkret',
        'Vælg en tilbagevendende situation, og spørg: Har jeg brug for at spise tidligere? Skal mad være lettere tilgængelig? Er der en opgave, jeg har brug for hjælp til? En praktisk ændring kan være mere relevant end en ny regel om, hvad du ikke må.',
      ],
      [
        'Fra indsigt til støtte',
        'Ved vedvarende vanskeligheder kan en faglig vurdering hjælpe med at forstå mønstret og vælge passende behandling. Der findes ikke et enkelt råd, som passer til alle.',
      ],
    ],
  },
  {
    slug: 'mental-load-og-elastik-armen-hvad-overspisning-egentlig-regulerer',
    title: 'Mental load og overspisning: når hverdagen fylder',
    topic: 'madstoej',
    description:
      'Et stort mentalt ansvar kan opleves belastende. Læs om at undersøge sammenhængen mellem din hverdag, dine behov og de situationer, hvor du spiser.',
    sections: [
      [
        'Det korte svar',
        'Mental load beskriver ofte det usynlige arbejde med at huske, planlægge og tage ansvar i hverdagen. For nogle falder belastende perioder sammen med ændringer i spisningen. Det er ikke en universel forklaring på overspisning, men en mulig del af din situation.',
      ],
      [
        'Se på hverdagen, ikke kun på tallerkenen',
        'Hvis du står med mange opgaver, kan pauser og måltider blive udskudt. Om aftenen kan du være både sulten og træt. Det er derfor relevant at se på dagens rammer, når du forsøger at forstå et tilbagevendende spisemønster.',
      ],
      [
        'Hvilke behov bliver udskudt?',
        'Overvej en almindelig dag. Hvornår får du mad, hvile og mulighed for at være uforstyrret? Hvilke opgaver bærer du alene? Formålet er at finde de belastninger, der kan ændres, og at se, hvor du kunne have brug for støtte.',
      ],
      [
        'En konkret samtale kan være et skridt',
        'Hvis du deler hverdag med andre, kan det hjælpe at tale om en bestemt opgave frem for at bede om hjælp generelt. For eksempel hvem der planlægger et måltid eller har ansvaret for en aftale. Det er et praktisk forslag, ikke en behandling af overspisning.',
      ],
      [
        'Når mad fylder for meget',
        'Ved tilbagevendende kontroltab eller stor belastning omkring mad er det relevant at søge faglig hjælp. En individuel vurdering kan afklare, om der er behov for behandling, og hvilke forhold der skal indgå.',
      ],
    ],
  },
  {
    slug: 'madro-boern-overspisning-usynlig-arv',
    title: 'Forholdet til mad i familien: plads til mindre skyld',
    topic: 'kropsbillede',
    description:
      'Et barns forhold til mad formes af mange forhold. Læs om at møde familiens madvaner med nysgerrighed og finde støtte uden at placere skyld.',
    sections: [
      [
        'Det korte svar',
        'Børns forhold til mad og krop udvikler sig i et samspil mellem mange forhold. Det giver ikke mening at placere hele ansvaret hos én forælder. Hvis du selv har det svært med mad, er det relevant at få støtte til din egen trivsel – uden at kræve, at du skal være et perfekt forbillede.',
      ],
      [
        'Arv er ikke skæbne',
        'Forskning peger på, at genetiske forhold kan bidrage til sårbarhed for spiseforstyrrelser. Det kan ikke bruges til at forudsige et enkelt barns udvikling. Tal om arvelighed beskriver variation i undersøgte grupper, ikke hvor stor en del af en bestemt persons vanskeligheder der skyldes gener.',
      ],
      [
        'Plads til en anden samtale',
        'Læg eventuelt mærke til, hvordan I taler om mad og krop i familien. Er der meget skyld og vurdering? Du kan prøve at bruge et mere neutralt sprog uden at gøre hver samtale til en ny regel. Det er også i orden at sige, at du selv øver dig.',
      ],
      [
        'Din egen støtte har værdi',
        'Du må gerne søge hjælp for din egen skyld. En forælders behandling er ikke en garanti for, at et barns vanskeligheder ændres. Hvis barnet selv viser tegn på en spiseforstyrrelse eller mistrivsel, skal barnet have en selvstændig faglig vurdering.',
      ],
      [
        'Når du er bekymret',
        'Kontakt egen læge, hvis et barn begrænser sin spisning, har tydelig angst omkring mad, ændrer vægt markant eller er belastet af tanker om kroppen. Denne artikel kan ikke bruges til at diagnosticere eller behandle et barn.',
      ],
    ],
  },
  {
    slug: 'regler-gør-det-sværere-ikke-lettere-her-er-grunden',
    title: 'Når madregler gør spisningen sværere',
    topic: 'madstoej',
    description:
      'Stramme madregler kan blive en del af en svær cirkel. Læs om alt-eller-intet-tanker, regelmæssig spisning og mere fleksibilitet i forholdet til mad.',
    sections: [
      [
        'Det korte svar',
        'Rigide regler og restriktiv spisning kan for nogle indgå i et mønster af overspisning og selvkritik. Det betyder ikke, at al struktur er skadelig. Der er forskel på hjælpsomme rammer og regler, som gør et enkelt valg til et spørgsmål om at lykkes eller fejle.',
      ],
      [
        'Når et valg bliver alt eller intet',
        'Måske kender du tanken om, at dagen er ødelagt, fordi du har spist noget bestemt. Den tanke kan være vigtig at undersøge. Et måltid eller en snack behøver ikke være en dom over resten af dagen.',
      ],
      [
        'Regelmæssighed kan være en støtte',
        'NICE anbefaler blandt andet arbejde med regelmæssig spisning i relevant behandling af binge eating disorder. Det er ikke det samme som en universel kostplan. De konkrete rammer bør passe til dine behov og indgå i en individuel vurdering.',
      ],
      [
        'Et spørgsmål at afprøve',
        'Når du opdager en hård regel, kan du spørge: Hvad ville jeg sige til en person, jeg holder af, i den samme situation? Brug spørgsmålet til at skabe en lille pause i selvkritikken. Du behøver ikke kunne ændre følelsen med det samme.',
      ],
      [
        'Mere hjælp, hvis du har brug for den',
        'Hvis forbud, faste eller kompensation er en fast del af dit forhold til mad, kan det være svært at ændre alene. Tal med egen læge eller en psykolog om en faglig vurdering og den rette støtte.',
      ],
    ],
  },
  {
    slug: 'det-falske-valg-skal-du-sulte-dig-tynd-eller-træne-dig-stærk',
    title: 'Mad og krop i overgangsalderen: undgå det falske valg',
    topic: 'kropsbillede',
    description:
      'Overgangsalderen behøver ikke blive endnu en kamp med kroppen. En nuanceret introduktion til trivsel, spisning og behovet for individuel rådgivning.',
    sections: [
      [
        'Det korte svar',
        'Overgangsalderen kan medføre forandringer, som påvirker trivsel og oplevelsen af kroppen. Det betyder ikke, at du skal vælge mellem at sulte dig eller træne hårdt. Ved symptomer og bekymringer er individuel sundhedsfaglig rådgivning mere relevant end generelle løfter om en bestemt krop.',
      ],
      [
        'Forandringer kan vække selvkritik',
        'Hvis kroppen føles anderledes, kan det vække uro eller et ønske om mere kontrol. Prøv at skelne mellem, hvad der belaster dig fysisk, og hvilke tanker du har om, hvordan kroppen burde se ud. Begge dele kan have brug for opmærksomhed, men ikke nødvendigvis den samme hjælp.',
      ],
      [
        'Mad og bevægelse behøver ikke være en straf',
        'Du må gerne spise tilstrækkeligt og finde bevægelse, der passer til dine muligheder. En generel artikel kan ikke afgøre, hvilken kost eller træning der er relevant for dig. Ved sygdom, medicin eller fysiske begrænsninger skal rådene tilpasses af en relevant fagperson.',
      ],
      [
        'Tal om de konkrete symptomer',
        'Hvis du oplever søvnproblemer, ændringer i humør eller andre symptomer, kan din læge hjælpe med at vurdere dem. Psykologisk støtte kan være relevant, hvis kropskritik eller spisemønstre påvirker din trivsel.',
      ],
      [
        'Et mål med plads til livet',
        'At arbejde med kropsaccept eller overspisning behøver ikke have vægttab som mål. Mere ro, mindre belastning og større frihed i hverdagen kan være værdifulde mål i sig selv. Behandlingsbehov afklares individuelt.',
      ],
    ],
  },
];
const original = [];
const output = [];
for (const entry of entries) {
  const file = await readFile(`.research/${entry.slug}.html`, 'utf8');
  const $ = load(file);
  original.push({
    slug: entry.slug,
    source: `https://www.successfuleating.dk/${entry.slug}`,
    title: $('.custom-article-container h1').text(),
    body: $('.custom-article-container').html(),
  });
  const extra = entry.slug.startsWith('det-falske')
    ? '<li><a href="https://www.nice.org.uk/guidance/ng23">NICE: Menopause – identification and management (NG23)</a></li>'
    : '';
  const body =
    entry.sections.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join('') +
    `<h2>Kilder og videre læsning</h2><ul><li><a href="https://www.nice.org.uk/guidance/ng69">NICE: Eating disorders – recognition and treatment (NG69)</a></li>${extra}</ul><p>Generel information. Teksten erstatter ikke en individuel faglig vurdering.</p>`;
  output.push({
    ...entry,
    body,
    published: null,
    modified: '2026-09-19',
    editorialUpdated: '2026-09-19',
    editorialAuthor: true,
    salesCta: true,
    category: entry.topic,
    categoryPath: null,
    source: `https://www.successfuleating.dk/${entry.slug}`,
  });
}
await writeFile('src/data/library-pages.json', JSON.stringify(output));
await writeFile('docs/library-source-snapshots.json', JSON.stringify(original));
console.log('Prepared six revised library articles at their original URLs.');

import { site, formatPrice, selfStudyModules } from '../data/site';
import consolidated from '../data/consolidated-articles.json';

export function GET() {
  return new Response(
    `# Successful Eating

> Dansksproget viden om overspisning og madro fra klinisk psykolog Ditte Munch-Andersen, uddannet fra Københavns Universitet i 2004. Online selvstudie og særskilte individuelle samtaler. Klinik på Hovedvagtsstræde 2C, 3000 Helsingør. CVR ${site.cvr}.

## Aktuelt tilbud
- [Successful Eating – online selvstudieforløb](${site.url}/forloebet/): Et selvstudie over ${site.productDays} dage med et fundament og syv moduler, videoer og øvelser. ${formatPrice(site.productPrice)} inkl. moms og livslang adgang til materialet. Du arbejder på egen hånd; individuel vurdering, sparring, gruppeterapi og samtaler er ikke inkluderet.
- [Individuelle samtaler](${site.url}/individuelt-forloeb/): Et separat tilbud hos Ditte Munch-Andersen, i Helsingør eller online. En samtale på ${site.consultationMinutes} minutter koster ${formatPrice(site.consultationPrice)}. Samtaler er ikke en del af onlineforløbets pris.
- [Kropsaccept](${site.url}/kropsglaede/): Særskilte individuelle samtaler med fokus på kropskritik.
- [Resultater og deltagererfaringer](${site.url}/resultater/): Brugerundersøgelsen fra 2024 og udtalelser fra tidligere deltagere. Resultaterne er målt umiddelbart efter tidligere forløb og kan ikke forudsige udfaldet af det aktuelle selvstudie.
- [Gratis guide](${site.url}/gratis-guide/): Sulten – eller bare mentalt træt?
- [Kontakt](${site.url}/kontakt/): ${site.email}. Telefon ${site.phone}.
- [Om Ditte Munch-Andersen](${site.url}/om-ditte/): Faglig baggrund og tilbud.

## Onlineforløbets opbygning
${selfStudyModules.map((module, index) => `- ${index === 0 ? 'Fundament' : `Modul ${index}`}: ${module.title} – ${module.description}`).join('\n')}

## Viden
- [Madro-biblioteket](https://www.successfuleating.dk/madro-biblioteket)
- [Hvad er madro?](https://www.successfuleating.dk/madro-biblioteket/hvad-er-madro)
- [Overspisning om aftenen](https://www.successfuleating.dk/blog/101752-saadan-stopper-du-med-at-overspise-om)
- [ADHD og overspisning](https://www.successfuleating.dk/madro-biblioteket/adhd-og-overspisning)
${consolidated.map((a) => `- [${a.title}](${site.url}/madro-biblioteket/${a.slug})`).join('\n')}
- [Artikelarkiv](${site.url}/blog/): Historiske artikler med oprindelige datoer. Ældre tilbud er ikke aktuelle.

Indholdet er generel information, ikke en individuel vurdering. Resultater og vægttab garanteres ikke. llms.txt er en indholdsoversigt, ikke dokumentation for synlighed i AI-tjenester.
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}

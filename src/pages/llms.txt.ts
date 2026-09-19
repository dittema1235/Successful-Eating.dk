import { site, formatPrice } from '../data/site';
import consolidated from '../data/consolidated-articles.json';

export function GET() {
  return new Response(
    `# Successful Eating

> Dansksproget viden om overspisning og madro samt psykologiske forløb hos klinisk psykolog Ditte Munch-Andersen, cand.psych. fra Københavns Universitet (2004). Online i Danmark og klinik på Hovedvagtsstræde 2C, 3000 Helsingør. CVR 30642155.

## Tilbud
- [Behandling af overspisning](https://www.successfuleating.dk/forloebet): Successful Eating. ${formatPrice(site.treatmentPrice)} inklusive en gratis individuel forsamtale. Vurderes forløbet ved forsamtalen at være et dårligt match, tilbagebetales hele det indbetalte beløb. Alternativt kan en forsamtale på ${site.consultationMinutes} minutter købes for ${formatPrice(site.consultationPrice)}; beløbet modregnes, hvis man efterfølgende vælger forløbet (restbeløb ${formatPrice(site.treatmentPrice - site.consultationPrice)}).
- [Kropsaccept](https://www.successfuleating.dk/kropsglaede): Individuel psykologisk behandling med fokus på kropskritik.
- ADHD er et videnstema og ikke et separat forløb.
- [Kontakt](https://www.successfuleating.dk/kontakt): hello@successfuleating.com. Telefon +45 71 41 59 69.
- [Om Ditte Munch-Andersen](https://www.successfuleating.dk/om-ditte): Faglig baggrund og behandlingsmetode.

## Viden
- [Madro-biblioteket](https://www.successfuleating.dk/madro-biblioteket)
- [Hvad er madro?](https://www.successfuleating.dk/madro-biblioteket/hvad-er-madro)
- [Overspisning om aftenen](https://www.successfuleating.dk/blog/101752-saadan-stopper-du-med-at-overspise-om)
- [ADHD og overspisning](https://www.successfuleating.dk/madro-biblioteket/adhd-og-overspisning)
${consolidated.map((a) => `- [${a.title}](${site.url}/madro-biblioteket/${a.slug})`).join('\n')}
- [Artikelarkiv](https://www.successfuleating.dk/blog): Historiske artikler med oprindelige datoer. Ældre tilbud er ikke nødvendigvis aktuelle.

Indholdet er generel information, ikke en individuel vurdering. Behandlingsresultater og vægttab garanteres ikke. llms.txt er en indholdsoversigt, ikke dokumentation for synlighed i AI-tjenester.
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}

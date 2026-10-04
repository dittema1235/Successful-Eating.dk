import { site, formatPrice, treatmentModules, pageUrl } from '../data/site';
import consolidated from '../data/consolidated-articles.json';

export function GET() {
  return new Response(
    `# Successful Eating

> Dansksproget viden om overspisning og madro samt psykologiske forløb hos klinisk psykolog Ditte Munch-Andersen, uddannet fra Københavns Universitet i 2004. Online i Danmark og klinik på Hovedvagtsstræde 2C, 3000 Helsingør. CVR 30642155.

## Tilbud
- [Behandling af overspisning](${pageUrl('/forloebet')}): Successful Eating. ${formatPrice(site.treatmentPrice)} inklusive en individuel forsamtale. Vurderes forløbet ved forsamtalen at være et dårligt match, tilbagebetales hele det indbetalte beløb. Alternativt kan en forsamtale på ${site.consultationMinutes} minutter købes for ${formatPrice(site.consultationPrice)}; beløbet modregnes, hvis man efterfølgende vælger forløbet (restbeløb ${formatPrice(site.treatmentPrice - site.consultationPrice)}).
- [Kropsaccept](${pageUrl('/kropsglaede')}): Individuel psykologisk behandling med fokus på kropskritik.
- ADHD/ADD er indtænkt i Successful Eatings opbygning og struktur på baggrund af mange års klinisk erfaring med kvinder med ADHD/ADD. Det er behandling af overspisning og erstatter ikke ADHD-udredning eller medicinsk behandling.
- [Resultater og deltagererfaringer](${pageUrl('/resultater')}): Resultater fra en brugerundersøgelse før og efter Successful Eating i 2024 samt udtalelser indsamlet direkte fra tidligere deltagere siden 2014.
- [Anmeldelser på Trustpilot](${site.trustpilot}).
- [Kontakt](${pageUrl('/kontakt')}): ${site.email}. Telefon ${site.phone}.
- [Om Ditte Munch-Andersen](${pageUrl('/om-ditte')}): Faglig baggrund og behandlingsmetode.

## Successful Eatings 8 faser
${treatmentModules.map((module, index) => `- ${index + 1}. ${module.title}: ${module.description}`).join('\n')}

## Viden
- [Madro-biblioteket](${pageUrl('/madro-biblioteket')})
- [Hvad er madro?](${pageUrl('/madro-biblioteket/hvad-er-madro')})
- [Overspisning om aftenen](${pageUrl('/blog/101752-saadan-stopper-du-med-at-overspise-om')})
- [ADHD og overspisning](${pageUrl('/madro-biblioteket/adhd-og-overspisning')})
${consolidated.map((a) => `- [${a.title}](${pageUrl(`/madro-biblioteket/${a.slug}`)})`).join('\n')}
- [Artikelarkiv](${pageUrl('/blog')}): Historiske artikler med oprindelige datoer. Ældre tilbud er ikke nødvendigvis aktuelle.

Indholdet er generel information, ikke en individuel vurdering. Behandlingsresultater og vægttab garanteres ikke. llms.txt er en indholdsoversigt, ikke dokumentation for synlighed i AI-tjenester.
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
